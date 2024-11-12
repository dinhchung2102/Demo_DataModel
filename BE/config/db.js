const mongoose = require('mongoose');
require('dotenv').config();  // Đảm bảo bạn đã sử dụng dotenv để đọc từ .env

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;  // Kết nối với MongoDB Atlas qua URI trong .env
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected to sample_analytics');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);  // Dừng ứng dụng nếu kết nối thất bại
  }
};

module.exports = connectDB;
