const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegram_id: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  username: String,
  first_name: String,
  last_name: String,
  balance_hours: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  total_purchased: { 
    type: Number, 
    default: 0 
  },
  total_used: { 
    type: Number, 
    default: 0 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

// 更新時自動更新 updated_at
userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
