// controllers/analystController.js
const Analyst = require('../models/analystModel');

// Lấy tất cả Analyst
const getAllAnalysts = async (req, res) => {
  try {
    const analysts = await Analyst.find();  
    console.log(analysts);
    res.json(analysts); 
  } catch (err) {
    res.status(500).json({ message: err.message });  
  }
};

// Lấy một Analyst theo ID
const getAnalystById = async (req, res) => {
  try {
    const analyst = await Analyst.findOne({ analyst_id: req.params.id });  
    if (!analyst) {
      return res.status(404).json({ message: 'Analyst not found' });
    }
    res.json(analyst); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới Analyst
const createAnalyst = async (req, res) => {
  const { analyst_id, name, email, phone, address } = req.body;

  const existingAnalyst = await Analyst.findOne({ analyst_id });
  if (existingAnalyst) {
    return res.status(400).json({ message: 'Analyst ID already exists' });
  }

  // Tạo một Analyst mới
  const newAnalyst = new Analyst({
    analyst_id,
    name,
    email,
    phone,
    address,
  });

  try {
    const savedAnalyst = await newAnalyst.save(); 
    res.status(201).json(savedAnalyst);  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật thông tin Analyst
const updateAnalyst = async (req, res) => {
  try {
    const updatedAnalyst = await Analyst.findOneAndUpdate(
      { analyst_id: req.params.id },  // Tìm theo `analyst_id`
      req.body,  // Cập nhật với dữ liệu từ request body
      { new: true }  // Trả về bản cập nhật sau khi thay đổi
    );

    if (!updatedAnalyst) {
      return res.status(404).json({ message: 'Analyst not found' });
    }

    res.json(updatedAnalyst);  // Trả về thông tin analyst đã được cập nhật
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa Analyst
const deleteAnalyst = async (req, res) => {
  try {
    const deletedAnalyst = await Analyst.findOneAndDelete({ analyst_id: req.params.id });
    if (!deletedAnalyst) {
      return res.status(404).json({ message: 'Analyst not found' });
    }
    res.json({ message: 'Analyst deleted successfully' });  // Trả về thông báo xóa thành công
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllAnalysts, getAnalystById, createAnalyst, updateAnalyst, deleteAnalyst };
