const mongoose = require('mongoose');

// Mô hình Review
const reviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true },
  product_id: { type: String, required: true },
  like: { type: Boolean, required: true },
  comment: { type: String, required: true },
  number_of_star: { type: Number, required: true }
});

// Mô hình Search
const searchSchema = new mongoose.Schema({
  search_id: { type: String, required: true },
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  keyWord: { type: String, required: true },
  time: { type: Date, default: Date.now },
  search_type: { type: String, required: true },
  results_count: { type: Number, required: true }
});

// Mô hình View
const viewSchema = new mongoose.Schema({
  view_id: { type: String, required: true },
  user_id: { type: String, required: true },
  product_id: { type: String, required: true },
  time: { type: Date, default: Date.now },
  device: { type: String, required: true },
  ip_address: { type: String, required: true }
});

// Mô hình User
const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  recent_Reviews: [reviewSchema],
  recent_Searchs: [searchSchema],
  recent_Views: [viewSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
