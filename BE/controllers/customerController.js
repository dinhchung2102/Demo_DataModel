const Customer = require('../models/Customer');

// Hàm lấy danh sách tên khách hàng
const getCustomerNames = async (req, res) => {
  try {
    const customers = await Customer.find({}, 'name');
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Có lỗi xảy ra khi truy vấn dữ liệu.' });
  }
};
module.exports = { getCustomerNames };
