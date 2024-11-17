
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  product_id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const historyPurchaseSchema = new mongoose.Schema({
  historyPurchase_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  time: { type: Date, required: true },
  total_amount: { type: Number, required: true },
  status: { type: String, required: true },
  item: [itemSchema],
});

const HistoryPurchase = mongoose.model('HistoryPurchase', historyPurchaseSchema);

module.exports = HistoryPurchase;
