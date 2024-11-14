// routes/analystRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAnalysts, getAnalystById, createAnalyst, updateAnalyst, deleteAnalyst } = require('../controllers/analystController');

// Lấy tất cả Analysts
router.get('/', getAllAnalysts);

// Lấy một Analyst theo analyst_id
router.get('/:id', getAnalystById);

// Tạo mới Analyst
router.post('/', createAnalyst);

// Cập nhật Analyst theo analyst_id
router.put('/:id', updateAnalyst);

// Xóa Analyst theo analyst_id
router.delete('/:id', deleteAnalyst);

module.exports = router;
