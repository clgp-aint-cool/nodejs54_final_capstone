const rapService = require('../services/rap.service');

const rapController = {
  layThongTinHeThongRap: async (req, res) => {
    try {
      const { maHeThongRap } = req.query;
      const data = await rapService.layThongTinHeThongRap(maHeThongRap);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layThongTinCumRapTheoHeThong: async (req, res) => {
    try {
      const { maHeThongRap } = req.query;
      const data = await rapService.layThongTinCumRapTheoHeThong(maHeThongRap);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layThongTinLichChieuHeThongRap: async (req, res) => {
    try {
      const { maHeThongRap, maNhom } = req.query;
      const data = await rapService.layThongTinLichChieuHeThongRap({ maHeThongRap, maNhom });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layThongTinLichChieuPhim: async (req, res) => {
    try {
      const { MaPhim } = req.query;
      const data = await rapService.layThongTinLichChieuPhim(MaPhim);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = rapController;
