const express = require('express');
const router = express.Router();
const { User, Transaction, UsageLog } = require('../models');

// 簡單的 Token 認證（生產環境建議使用更安全的認證）
const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: '未授權訪問' });
  }
  next();
};

// 儀表板數據
router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTransactions = await Transaction.countDocuments({ payment_status: 'completed' });
    const totalRevenue = await Transaction.aggregate([
      { $match: { payment_status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount_hkd' } } }
    ]);
    const totalHoursSold = await Transaction.aggregate([
      { $match: { payment_status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$hours_added' } } }
    ]);
    
    res.json({
      total_users: totalUsers,
      total_transactions: totalTransactions,
      total_revenue: totalRevenue[0]?.total || 0,
      total_hours_sold: totalHoursSold[0]?.total || 0
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 查看所有用戶
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ updated_at: -1 })
      .limit(100);
    
    res.json(users);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 查看所有交易
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ created_at: -1 })
      .limit(100);
    
    res.json(transactions);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 手動添加餘額（用於 FPS 付款確認）
router.post('/add-balance', adminAuth, async (req, res) => {
  const { telegram_id, hours, amount, reference, notes } = req.body;
  
  if (!telegram_id || !hours) {
    return res.status(400).json({ error: '缺少必要參數' });
  }
  
  try {
    // 添加餘額
    await User.findOneAndUpdate(
      { telegram_id },
      { 
        $inc: { 
          balance_hours: hours,
          total_purchased: hours
        },
        updated_at: new Date()
      },
      { upsert: true }
    );
    
    // 記錄交易
    const transaction = await Transaction.create({
      telegram_id,
      package: 'manual',
      amount_hkd: amount || 0,
      hours_added: hours,
      payment_method: 'fps',
      payment_status: 'completed',
      fps_reference: reference || '',
      notes: notes || '管理員手動添加',
      completed_at: new Date()
    });
    
    res.json({
      success: true,
      message: `已為用戶 ${telegram_id} 添加 ${hours} 小時`,
      transaction_id: transaction._id
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 查看特定用戶詳情
router.get('/user/:telegram_id', adminAuth, async (req, res) => {
  try {
    const user = await User.findOne({ telegram_id: req.params.telegram_id });
    const transactions = await Transaction.find({ telegram_id: req.params.telegram_id })
      .sort({ created_at: -1 });
    const usageHistory = await UsageLog.find({ telegram_id: req.params.telegram_id })
      .sort({ created_at: -1 })
      .limit(20);
    
    if (!user) {
      return res.status(404).json({ error: '找不到用戶' });
    }
    
    res.json({
      user,
      transactions,
      usage_history: usageHistory
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
