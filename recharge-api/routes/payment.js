const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const { Transaction, User } = require('../models');

// 套餐配置（價格以港仙為單位，即 HKD * 100）
const PACKAGES = {
  '5h': { 
    name: '5小時套餐', 
    price: 35000,      // HK$350.00
    hours: 5,
    description: 'AI心理輔導5小時，平均HK$70/小時'
  },
  '10h': { 
    name: '10小時套餐', 
    price: 65000,      // HK$650.00
    hours: 10,
    description: 'AI心理輔導10小時，平均HK$65/小時 ⭐推薦'
  },
  '20h': { 
    name: '20小時套餐', 
    price: 120000,     // HK$1,200.00
    hours: 20,
    description: 'AI心理輔導20小時，平均HK$60/小時'
  },
  '50h': { 
    name: '50小時套餐', 
    price: 275000,     // HK$2,750.00
    hours: 50,
    description: 'AI心理輔導50小時，平均HK$55/小時'
  }
};

// 獲取套餐列表
router.get('/packages', (req, res) => {
  res.json({
    packages: Object.entries(PACKAGES).map(([id, pkg]) => ({
      id,
      ...pkg,
      price_hkd: pkg.price / 100
    }))
  });
});

// 創建 Stripe 支付會話
router.post('/create-session', async (req, res) => {
  const { telegram_id, package_id, username, first_name } = req.body;
  
  if (!telegram_id || !package_id) {
    return res.status(400).json({ error: '缺少必要參數' });
  }
  
  const pkg = PACKAGES[package_id];
  if (!pkg) {
    return res.status(400).json({ error: '無效的套餐' });
  }
  
  try {
    // 創建 Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'hkd',
          product_data: {
            name: pkg.name,
            description: pkg.description
          },
          unit_amount: pkg.price
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
      metadata: {
        telegram_id,
        package_id,
        hours: pkg.hours,
        username: username || '',
        first_name: first_name || ''
      }
    });
    
    // 記錄交易
    await Transaction.create({
      user_id: telegram_id,
      telegram_id,
      package: package_id,
      amount_hkd: pkg.price / 100,
      hours_added: pkg.hours,
      payment_method: 'stripe',
      payment_status: 'pending',
      stripe_session_id: session.id
    });
    
    // 確保用戶存在
    await User.findOneAndUpdate(
      { telegram_id },
      { 
        username,
        first_name,
        updated_at: new Date()
      },
      { upsert: true }
    );
    
    res.json({ 
      success: true,
      session_url: session.url,
      session_id: session.id
    });
    
  } catch (error) {
    console.error('創建支付會話失敗:', error);
    res.status(500).json({ error: '創建支付失敗', message: error.message });
  }
});

// Stripe Webhook（支付成功回調）
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    console.log('收到 Stripe Webhook:', event.type);
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { telegram_id, package_id, hours } = session.metadata;
      
      console.log('支付成功:', { telegram_id, package_id, hours });
      
      // 更新交易狀態
      await Transaction.findOneAndUpdate(
        { stripe_session_id: session.id },
        { 
          payment_status: 'completed',
          completed_at: new Date()
        }
      );
      
      // 添加餘額到用戶
      await User.findOneAndUpdate(
        { telegram_id },
        { 
          $inc: { 
            balance_hours: parseInt(hours),
            total_purchased: parseInt(hours)
          },
          updated_at: new Date()
        },
        { upsert: true }
      );
      
      console.log(`✅ 已為用戶 ${telegram_id} 添加 ${hours} 小時`);
    }
    
    res.json({ received: true });
    
  } catch (error) {
    console.error('Webhook 處理失敗:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// 查詢支付狀態
router.get('/status/:session_id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ 
      stripe_session_id: req.params.session_id 
    });
    
    if (!transaction) {
      return res.status(404).json({ error: '找不到交易' });
    }
    
    res.json({
      status: transaction.payment_status,
      package: transaction.package,
      hours_added: transaction.hours_added,
      amount: transaction.amount_hkd,
      completed_at: transaction.completed_at
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
