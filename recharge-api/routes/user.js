const express = require('express');
const router = express.Router();
const { User, UsageLog } = require('../models');

// 查詢用戶餘額
router.get('/balance/:telegram_id', async (req, res) => {
  try {
    const user = await User.findOne({ telegram_id: req.params.telegram_id });
    
    if (!user) {
      return res.json({ 
        balance_hours: 0,
        total_purchased: 0,
        total_used: 0,
        is_new: true
      });
    }
    
    res.json({
      balance_hours: user.balance_hours,
      total_purchased: user.total_purchased,
      total_used: user.total_used,
      username: user.username,
      first_name: user.first_name,
      created_at: user.created_at
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 開始對話計時
router.post('/session/start', async (req, res) => {
  const { telegram_id, conversation_id } = req.body;
  
  try {
    // 檢查餘額
    const user = await User.findOne({ telegram_id });
    
    if (!user || user.balance_hours <= 0) {
      return res.status(403).json({
        error: 'Insufficient balance',
        balance_hours: user ? user.balance_hours : 0,
        can_start: false
      });
    }
    
    // 創建使用記錄
    const sessionId = `sess_${Date.now()}_${telegram_id}`;
    const usageLog = await UsageLog.create({
      telegram_id,
      session_id: sessionId,
      conversation_id: conversation_id || sessionId,
      session_start: new Date()
    });
    
    res.json({
      can_start: true,
      session_id: sessionId,
      balance_hours: user.balance_hours,
      message: `💚 你的餘額還有 ${user.balance_hours} 小時，開始輔導吧！`
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 結束對話並扣時長
router.post('/session/end', async (req, res) => {
  const { telegram_id, session_id, message_count } = req.body;
  
  try {
    // 找到使用記錄
    const usageLog = await UsageLog.findOne({ session_id, telegram_id });
    
    if (!usageLog) {
      return res.status(404).json({ error: '找不到會話記錄' });
    }
    
    // 計算使用時間
    const sessionEnd = new Date();
    const durationMs = sessionEnd - usageLog.session_start;
    const durationMinutes = Math.ceil(durationMs / 60000);
    
    // 最少扣 5 分鐘（避免太短的對話）
    const actualMinutes = Math.max(durationMinutes, 5);
    
    // 轉換為小時（保留2位小數）
    const hoursUsed = Math.ceil(actualMinutes / 60 * 100) / 100;
    
    // 檢查餘額
    const user = await User.findOne({ telegram_id });
    if (!user || user.balance_hours < hoursUsed) {
      // 餘額不足，扣除全部剩餘
      const deductHours = user ? user.balance_hours : 0;
      
      await User.findOneAndUpdate(
        { telegram_id },
        { 
          $inc: { 
            balance_hours: -deductHours,
            total_used: deductHours
          }
        }
      );
      
      await UsageLog.findOneAndUpdate(
        { session_id },
        {
          session_end: sessionEnd,
          duration_minutes: actualMinutes,
          hours_deducted: deductHours,
          message_count: message_count || 0
        }
      );
      
      return res.json({
        success: true,
        hours_deducted: deductHours,
        duration_minutes: actualMinutes,
        remaining_hours: 0,
        message: '⚠️ 餘額已用完，請充值後繼續使用'
      });
    }
    
    // 正常扣除
    await User.findOneAndUpdate(
      { telegram_id },
      { 
        $inc: { 
          balance_hours: -hoursUsed,
          total_used: hoursUsed
        }
      }
    );
    
    await UsageLog.findOneAndUpdate(
      { session_id },
      {
        session_end: sessionEnd,
        duration_minutes: actualMinutes,
        hours_deducted: hoursUsed,
        message_count: message_count || 0
      }
    );
    
    const remaining = user.balance_hours - hoursUsed;
    
    res.json({
      success: true,
      hours_deducted: hoursUsed,
      duration_minutes: actualMinutes,
      remaining_hours: remaining,
      message: `💚 本次使用 ${hoursUsed} 小時，剩餘 ${remaining.toFixed(2)} 小時`
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 獲取用戶使用歷史
router.get('/history/:telegram_id', async (req, res) => {
  try {
    const history = await UsageLog.find({ telegram_id })
      .sort({ created_at: -1 })
      .limit(50);
    
    res.json(history);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
