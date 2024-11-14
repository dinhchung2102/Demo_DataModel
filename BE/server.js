// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const analystRoutes = require('./routes/analystRoutes');  // Thêm route cho Analyst

dotenv.config();

const app = express();

// Kết nối tới MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Định nghĩa routes
app.use('/api/products', productRoutes);
app.use('/api/analysts', analystRoutes);  

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
