const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/accountModel');

// Tạo tài khoản mới
const createAccount = async (req, res) => {
  const { phone, password, role } = req.body;

  try {
    // Kiểm tra số điện thoại đã tồn tại chưa
    const existingAccount = await Account.findOne({ phone });
    if (existingAccount) {
      return res.status(400).json({ message: 'Số điện thoại đã tồn tại.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo tài khoản mới
    const newAccount = new Account({
      phone,
      password: hashedPassword,
      role,
    });

    await newAccount.save();
    res.status(201).json({ message: 'Tài khoản đã được tạo thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};

// Đăng nhập
const loginAccount = async (req, res) => {
  const { phone, password } = req.body;

  try {
    console.log("Received login request", { phone, password }); // Log nhận yêu cầu

    // Tìm tài khoản theo số điện thoại
    const account = await Account.findOne({ phone });
    if (!account) {
      console.log("Account not found");
      return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(400).json({ message: 'Mật khẩu sai.' });
    }

    // Tạo token
    const token = jwt.sign({ accountId: account._id, role: account.role }, 'secret_key', { expiresIn: '1h' });

    console.log("Login successful, returning token");

    // Trả về thông tin tài khoản và token
    return res.status(200).json({
      message: 'Đăng nhập thành công.',
      token,
      account: {
        phone: account.phone,
        role: account.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};


// Lấy thông tin tài khoản
const getAccountInfo = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    }
    
    res.status(200).json({
      phone: account.phone,
      role: account.role,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};

// Cập nhật thông tin tài khoản
const updateAccount = async (req, res) => {
  const { accountId } = req.params;
  const { phone, password, role } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    }

    // Cập nhật các trường
    if (phone) account.phone = phone;
    if (password) account.password = await bcrypt.hash(password, 10);
    if (role) account.role = role;

    await account.save();
    res.status(200).json({ message: 'Cập nhật thông tin tài khoản thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};

// Xóa tài khoản
const deleteAccount = async (req, res) => {
  const { accountId } = req.params;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    }

    await account.remove();
    res.status(200).json({ message: 'Xóa tài khoản thành công.' });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};


const findAccountByPhone = async (req, res) => {
  const { phone } = req.params;

  try {
    // Tìm tài khoản theo số điện thoại
    const account = await Account.findOne({ phone });
    if (!account) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
    }

    res.status(200).json({
      phone: account.phone,
      role: account.role,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Đã có lỗi xảy ra.', error });
  }
};

module.exports = {
  createAccount,
  loginAccount,
  getAccountInfo,
  updateAccount,
  deleteAccount,
  findAccountByPhone
};
