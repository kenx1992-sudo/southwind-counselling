const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  telegram_id: { 
    type: String, 
    required: true,
    index: true 
  },
  session_id: { 
    type: String, 
    required: true 
  },
  conversation_id: String,
  session_start: { 
    type: Date, 
    required: true 
  },
  session_end: Date,
  duration_minutes: Number,
  hours_deducted: {
    type: Number,
    default: 0
  },
  message_count: {
    type: Number,
    default: 0
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('UsageLog', usageLogSchema);
