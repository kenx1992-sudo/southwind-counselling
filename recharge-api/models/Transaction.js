const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user_id: { 
    type: String, 
    required: true,
    index: true 
  },
  telegram_id: { 
    type: String, 
    required: true,
    index: true 
  },
  package: { 
    type: String, 
    required: true,
    enum: ['5h', '10h', '20h', '50h', 'manual']
  },
  amount_hkd: { 
    type: Number, 
    required: true 
  },
  hours_added: { 
    type: Number, 
    required: true 
  },
  payment_method: { 
    type: String, 
    required: true,
    enum: ['stripe', 'fps', 'alipay', 'wechat']
  },
  payment_status: { 
    type: String, 
    required: true,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  stripe_session_id: String,
  fps_reference: String,
  notes: String,
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  completed_at: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
