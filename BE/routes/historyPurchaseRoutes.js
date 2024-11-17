// routes/historyPurchaseRoutes.js
const express = require('express');
const router = express.Router();
const historyPurchaseController = require('../controllers/historyPurchaseController');

// Lấy tất cả lịch sử mua hàng
router.get('/', historyPurchaseController.getAllHistoryPurchases);

// Lấy lịch sử mua hàng theo user_id
router.get('/user/:user_id', historyPurchaseController.getHistoryByUserId);

// Lấy số lượng sản phẩm trong lịch sử mua hàng theo product_id
router.get('/product/quantity/:product_id', historyPurchaseController.getProductQuantityInHistory);

// Thêm lịch sử mua hàng mới
router.post('/', historyPurchaseController.createHistoryPurchase);

module.exports = router;
