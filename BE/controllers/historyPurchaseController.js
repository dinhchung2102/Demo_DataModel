// controllers/historyPurchaseController.js
const HistoryPurchase = require('../models/historyPurchaseModel');

// Lấy tất cả các lịch sử mua hàng
const getAllHistoryPurchases = async (req, res) => {
  try {
    const historyPurchases = await HistoryPurchase.find();
    return res.json(historyPurchases);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Lấy lịch sử mua hàng theo user_id
const getHistoryByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const historyPurchases = await HistoryPurchase.find({ user_id });

    if (historyPurchases.length === 0) {
      return res.status(404).json({ message: 'No purchases found for this user' });
    }

    return res.json(historyPurchases);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Lấy số lượng sản phẩm theo product_id trong toàn bộ lịch sử mua hàng
const getProductQuantityInHistory = async (req, res) => {
  try {
    const { product_id } = req.params;

    // Sử dụng aggregation để tính số lượng sản phẩm trong toàn bộ lịch sử mua hàng
    const result = await HistoryPurchase.aggregate([
      { $unwind: '$item' },
      { $match: { 'item.product_id': product_id } },
      {
        $group: {
          _id: '$item.product_id',
          totalQuantity: { $sum: '$item.quantity' },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found in purchase history' });
    }

    return res.json({
      product_id: result[0]._id,
      total_quantity: result[0].totalQuantity,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Thêm một lịch sử mua hàng mới
const createHistoryPurchase = async (req, res) => {
  try {
    const { historyPurchase_id, user_id, time, total_amount, status, item } = req.body;

    const newHistoryPurchase = new HistoryPurchase({
      historyPurchase_id,
      user_id,
      time,
      total_amount,
      status,
      item,
    });

    await newHistoryPurchase.save();
    return res.status(201).json({ message: 'Purchase history created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllHistoryPurchases,
  getHistoryByUserId,
  getProductQuantityInHistory,
  createHistoryPurchase,
};
