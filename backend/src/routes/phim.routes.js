const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const phimController = require('../controllers/phim.controller');
const upload = require('../middlewares/upload');

router.get('/LayDanhSachBanner', phimController.layDanhSachBanner);
router.post('/ThemBannerUploadHinh', upload.single('file'), phimController.themBannerUploadHinh);
router.post('/CapNhatBannerUploadHinh', upload.single('file'), phimController.capNhatBannerUploadHinh);
router.delete('/XoaBanner', phimController.xoaBanner);
router.get('/LayDanhSachPhim', phimController.layDanhSachPhim);
router.get('/LayDanhSachPhimPhanTrang', phimController.layDanhSachPhimPhanTrang);
router.get('/LayDanhSachPhimTheoNgay', phimController.layDanhSachPhimTheoNgay);
router.get('/LayThongTinPhim', phimController.layThongTinPhim);
router.post('/ThemPhimUploadHinh', upload.single('file'), phimController.themPhimUploadHinh);
router.post('/CapNhatPhimUpload', upload.single('file'), phimController.capNhatPhimUpload);
router.post('/UploadHinhAnh', upload.single('file'), phimController.uploadHinhAnh);
router.delete('/XP', phimController.xoaPhim);
router.delete('/XoaPhim', phimController.xoaPhim);

module.exports = router;
