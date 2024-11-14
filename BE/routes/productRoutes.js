const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Lấy tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Lấy một sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Thêm một sản phẩm mới
router.post('/', productController.createProduct);

// Cập nhật một sản phẩm theo ID
router.put('/:id', productController.updateProduct);

// Xóa một sản phẩm theo ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
