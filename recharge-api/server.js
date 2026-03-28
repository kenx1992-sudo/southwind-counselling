require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

// 中間件
app.use(cors());
app.use(express.json());

// 連接 MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB 連接成功'))
  .catch(err => console.error('❌ MongoDB 連接失敗:', err));

// 路由
app.use('/api/payment', paymentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// 健康檢查
app.get('/health', (req, res) => res.json({ 
  status: 'ok', 
  timestamp: new Date().toISOString(),
  service: 'Southwind Recharge API'
}));

// 錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 服務器運行在端口 ${PORT}`);
  console.log(`📊 健康檢查: http://localhost:${PORT}/health`);
});
