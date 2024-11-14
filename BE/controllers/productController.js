const Product = require('../models/productModel');

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();  // Truy vấn tất cả sản phẩm
    res.json(products);  // Trả về dữ liệu dưới dạng JSON
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi nếu có
  }
};

// Lấy một sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Truy vấn sản phẩm theo ID
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }
    res.json(product);  // Trả về dữ liệu sản phẩm dưới dạng JSON
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi nếu có
  }
};

// Thêm một sản phẩm mới
const createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  // Kiểm tra xem các trường bắt buộc có được gửi đầy đủ không
  if (!name || !price) {
    return res.status(400).json({ message: 'Tên sản phẩm và giá là bắt buộc' });
  }

  try {
    const newProduct = new Product({
      name,
      price,
      description
    });

    // Lưu sản phẩm mới vào cơ sở dữ liệu
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);  // Trả về sản phẩm đã lưu
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi nếu có
  }
};

// Cập nhật thông tin một sản phẩm
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Tìm sản phẩm theo ID

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    // Cập nhật các trường của sản phẩm
    const { name, price, description } = req.body;
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    // Lưu thay đổi vào cơ sở dữ liệu
    const updatedProduct = await product.save();
    res.json(updatedProduct);  // Trả về sản phẩm đã được cập nhật
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi nếu có
  }
};

// Xóa một sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Tìm sản phẩm theo ID

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    // Xóa sản phẩm
    await product.remove();
    res.json({ message: 'Sản phẩm đã bị xóa' });  // Trả về thông báo xóa thành công
  } catch (err) {
    res.status(500).json({ message: err.message });  // Xử lý lỗi nếu có
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
