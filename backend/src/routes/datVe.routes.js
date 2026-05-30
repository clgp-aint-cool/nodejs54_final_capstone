const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const datVeController = require('../controllers/datVe.controller');

router.get('/LayDanhSachPhongVe', datVeController.layDanhSachPhongVe);
router.post('/DatVe', authMiddleware, datVeController.datVe);

module.exports = router;
