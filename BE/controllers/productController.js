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
const getProductByProductId = async (req, res) => {
  const { product_id } = req.params;  // Lấy product_id từ tham số URL

  try {
    // Tìm sản phẩm theo product_id
    const product = await Product.findOne({ product_id: product_id });

    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tìm thấy' });
    }

    res.json(product);  // Trả về sản phẩm nếu tìm thấy
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi truy vấn sản phẩm', error: err.message });
  }
};


// Tìm kiếm sản phẩm theo từ khóa 
const searchProductsByKeyword = async (req, res) => {
  let { keyword } = req.params;  

  
  keyword = keyword.replace(/\s+/g, '\\s+'); 

  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' }  
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'Không có sản phẩm nào phù hợp với từ khóa' });
    }

    res.json(products);  
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi truy vấn sản phẩm', error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductByProductId,
  searchProductsByKeyword
};
