// /controllers/reviewController.js
const Review = require('../models/reviewModel');
const User = require('../models/userModel');


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

    // Lấy tất cả các review cho product_id
    const reviews = await Review.find({ product_id });

    // Nếu không có review nào
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    // Lấy tất cả user_id trong reviews
    const userIds = reviews.map(review => review.user_id);

    // Truy vấn tất cả người dùng dựa trên user_id
    const users = await User.find({ user_id: { $in: userIds } });

    // Tạo một map từ user_id sang username
    const userMap = users.reduce((map, user) => {
      map[user.user_id] = user.name;
      return map;
    }, {});

    // Duyệt qua các review và thay thế user_id bằng username từ userMap
    const reviewsWithUsernames = reviews.map(review => ({
      review_id: review.review_id,
      product_id: review.product_id,
      like: review.like,
      comment: review.comment,
      number_of_star: review.number_of_star,
      // Thay vì trả về user_id, trả về username
      name: userMap[review.user_id] || 'Anonymous',
    }));

    return res.json(reviewsWithUsernames);
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
