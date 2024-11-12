const express = require('express');
const Customer = require('../models/Customer');  // Import model Customer
const router = express.Router();

// Route GET để lấy danh sách tên khách hàng
router.get('/names', async (req, res) => {
  try {
    // Tìm tất cả khách hàng và chỉ lấy trường "name"
    const customers = await Customer.find({}, 'name');  // Chỉ lấy trường "name"
    res.json(customers);  // Trả về danh sách tên khách hàng
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn dữ liệu.' });
  }
});

module.exports = router;
