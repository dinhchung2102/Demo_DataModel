const express = require('express');
const { createUser, getUserById, getUserByPhone,  updateUser, addReview, addSearch, addView } = require('../controllers/userController');
const { get } = require('mongoose');
const router = express.Router();

// Tạo mới người dùng
router.post('/create', createUser);

// Lấy thông tin người dùng theo user_id
router.get('/:user_id', getUserById);

//Laasy thong tin nguoi dung theo phone:

router.get('/by-phone/:phone', getUserByPhone);

// Cập nhật thông tin người dùng
router.put('/:user_id', updateUser);

// Thêm review vào user
router.post('/:user_id/reviews', addReview);

// Thêm search vào user
router.post('/:user_id/searchs', addSearch);

// Thêm view vào user
router.post('/:user_id/views', addView);

module.exports = router;
