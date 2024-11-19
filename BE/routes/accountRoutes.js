const express = require('express');
const router = express.Router();
const {
  createAccount,
  loginAccount,
  getAccountInfo,
  updateAccount,
  deleteAccount,
  findAccountByPhone
} = require('../controllers/accountController');

// Đăng ký tài khoản mới
router.post('/register', createAccount);

// Đăng nhập
router.post('/login', loginAccount);

// Lấy thông tin tài khoản
router.get('/info/:accountId', getAccountInfo);

// Cập nhật thông tin tài khoản
router.put('/update/:accountId', updateAccount);

// Xóa tài khoản
router.delete('/delete/:accountId', deleteAccount);

router.get('/info/:phone', findAccountByPhone)

module.exports = router;
