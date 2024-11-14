// models/analystModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho Analyst
const AnalystSchema = new Schema({
  analyst_id: { type: String, required: true, unique: true }, // Mã của analyst
  name: { type: String, required: true }, // Tên của analyst
  email: { type: String, required: true, unique: true }, // Email của analyst
  phone: { type: String, required: true }, // Số điện thoại
  address: { type: String, required: true }, // Địa chỉ
});

// Tạo model từ schema
const Analyst = mongoose.model("Analyst", AnalystSchema);

module.exports = Analyst;
