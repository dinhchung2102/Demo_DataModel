// /models/reviewModel.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: { type: String, required: true, unique: true },
  product_id: { type: String, required: true },
  user_id: { type: String, required: true },
  like: { type: Boolean, default: false },
  comment: { type: String, required: true },
  number_of_star: { type: Number, required: true, min: 1, max: 5 },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
