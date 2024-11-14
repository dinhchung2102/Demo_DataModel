const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho Atribute
const AtributeSchema = new Schema({
  K: { type: String, required: true },  // Key
  V: { type: String, required: true }   // Value
});

// Định nghĩa schema cho Statistical
const StatisticalSchema = new Schema({
  average_rating: { type: Number, required: true },
  total_reviews: { type: Number, required: true },
  total_views: { type: Number, required: true },
  total_searchs: { type: Number, required: true }
});

// Định nghĩa schema cho Product
const ProductSchema = new Schema({
  product_id: { type: String, required: true, unique: true },
  analyst_id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  atribute: [AtributeSchema],  // Mảng các thuộc tính của sản phẩm
  statistical: StatisticalSchema  // Thông tin thống kê sản phẩm
});

// Tạo model từ schema
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
