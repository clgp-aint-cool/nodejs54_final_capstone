const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rapController = require('../controllers/rap.controller');

router.get('/LayThongTinHeThongRap', rapController.layThongTinHeThongRap);
router.get('/LayThongTinCumRapTheoHeThong', rapController.layThongTinCumRapTheoHeThong);
router.get('/LayThongTinLichChieuHeThongRap', rapController.layThongTinLichChieuHeThongRap);
router.get('/LayThongTinLichChieuPhim', rapController.layThongTinLichChieuPhim);

module.exports = router;
