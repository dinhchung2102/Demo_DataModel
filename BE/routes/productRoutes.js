const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Lấy một sản phẩm theo ID
router.get('/:product_id', productController.getProductByProductId);

//Search\
router.get('/search/:keyword', productController.searchProductsByKeyword);

module.exports = router;
