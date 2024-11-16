// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const analystRoutes = require('./routes/analystRoutes');  
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

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
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
