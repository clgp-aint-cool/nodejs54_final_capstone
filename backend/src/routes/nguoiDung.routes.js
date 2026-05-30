const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const nguoiDungController = require('../controllers/nguoiDung.controller');

router.get('/LayDanhSachLoaiNguoiDung', nguoiDungController.layDanhSachLoaiNguoiDung);
router.post('/DangNhap', nguoiDungController.dangNhap);
router.post('/DangKy', nguoiDungController.dangKy);
router.get('/LayDanhSachNguoiDung', nguoiDungController.layDanhSachNguoiDung);
router.get('/LayDanhSachNguoiDungPhanTrang', nguoiDungController.layDanhSachNguoiDungPhanTrang);
router.get('/TimKiemNguoiDung', nguoiDungController.timKiemNguoiDung);
router.get('/TimKiemNguoiDungPhanTrang', nguoiDungController.timKiemNguoiDungPhanTrang);
router.post('/ThongTinTaiKhoan', authMiddleware, nguoiDungController.thongTinTaiKhoan);
router.post('/LayThongTinNguoiDung', nguoiDungController.layThongTinNguoiDung);
router.post('/ThemNguoiDung', authMiddleware, nguoiDungController.themNguoiDung);
router.put('/CapNhatThongTinNguoiDung', authMiddleware, nguoiDungController.capNhatThongTinNguoiDung);
router.post('/CapNhat', authMiddleware, nguoiDungController.capNhatThongTinNguoiDung);
router.delete('/XoaNguoiDung', authMiddleware, nguoiDungController.xoaNguoiDung);

module.exports = router;
