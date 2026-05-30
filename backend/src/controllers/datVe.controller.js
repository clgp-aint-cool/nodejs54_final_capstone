const datVeService = require('../services/datVe.service');

const datVeController = {
  layDanhSachPhongVe: async (req, res) => {
    try {
      const { MaLichChieu } = req.query;
      const data = await datVeService.layDanhSachPhongVe(MaLichChieu);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  datVe: async (req, res) => {
    try {
      const { maLichChieu, danhSachVe } = req.body;
      const taiKhoanNguoiDung = req.user?.taiKhoan;
      const result = await datVeService.datVe({ maLichChieu, danhSachVe, taiKhoanNguoiDung });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = datVeController;
