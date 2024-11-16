// /routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/', reviewController.getAllReviews);

// Lấy reviews theo product_id
router.get('/product/:product_id', reviewController.getReviewsByProductId);

// Tạo mới review
router.post('/reviews', reviewController.createReview);

// Cập nhật review theo review_id
router.put('/reviews/:review_id', reviewController.updateReview);

// Xóa review theo review_id
router.delete('/reviews/:review_id', reviewController.deleteReview);

module.exports = router;
