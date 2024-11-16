// /controllers/reviewController.js
const Review = require('../models/reviewModel');


const getAllReviews = async (req, res) => {
  try {
    // Lấy tất cả các reviews
    const reviews = await Review.find();

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found.' });
    }

    // Trả về dữ liệu review
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error); // Log lỗi nếu có
    res.status(500).json({ message: 'Server error' });
  }
};

// Lấy tất cả các review theo product_id
const getReviewsByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const reviews = await Review.find({ product_id });
    if (!reviews) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Tạo mới một review
const createReview = async (req, res) => {
  try {
    const { review_id, product_id, user_id, like, comment, number_of_star } = req.body;
    
    // Kiểm tra xem review_id có trùng không
    const existingReview = await Review.findOne({ review_id });
    if (existingReview) {
      return res.status(400).json({ message: 'Review ID already exists' });
    }

    const newReview = new Review({
      review_id,
      product_id,
      user_id,
      like,
      comment,
      number_of_star,
    });

    await newReview.save();
    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Cập nhật thông tin review
const updateReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const { like, comment, number_of_star } = req.body;

    const review = await Review.findOneAndUpdate(
      { review_id },
      { like, comment, number_of_star },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Xóa review
const deleteReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const deletedReview = await Review.findOneAndDelete({ review_id });

    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getReviewsByProductId,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews
};
