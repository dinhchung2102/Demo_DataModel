const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Kết nối MongoDB từ tệp db.js
const customerRoutes = require('./routes/customers');  // Định nghĩa route cho customers

const app = express();
const port = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors());  // Cho phép CORS
app.use(express.json());  // Parse JSON body

// API Routes
app.use('/api/customers', customerRoutes);  // Định nghĩa route cho customers

// Lắng nghe server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
