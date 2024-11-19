const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,  
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'analyst'],
    default: 'user', 
  },
}, { timestamps: true });

// Tạo model Account
const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
