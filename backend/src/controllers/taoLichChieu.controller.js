const taoLichChieuService = require('../services/taoLichChieu.service');

const taoLichChieuController = {
  taoLichChieu: async (req, res) => {
    try {
      const { maPhim, ngayChieuGioChieu, maRap, giaVe } = req.body;
      const result = await taoLichChieuService.taoLichChieu({ maPhim, ngayChieuGioChieu, maRap, giaVe });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = taoLichChieuController;
