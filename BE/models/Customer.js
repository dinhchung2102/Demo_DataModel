const mongoose = require('mongoose');

// Định nghĩa schema cho collection "customers"
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: String,
  birthdate: Date,
  email: String,
  accounts: [Number],
  tier_and_details: Object,
});

// Tạo model từ schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
