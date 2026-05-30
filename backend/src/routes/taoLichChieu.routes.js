const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const taoLichChieuController = require('../controllers/taoLichChieu.controller');

router.post('/TaoLichChieu', authMiddleware, taoLichChieuController.taoLichChieu);

module.exports = router;
