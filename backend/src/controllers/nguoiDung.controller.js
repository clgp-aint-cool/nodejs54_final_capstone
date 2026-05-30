const nguoiDungService = require('../services/nguoiDung.service');

const nguoiDungController = {
  layDanhSachLoaiNguoiDung: async (req, res) => {
    try {
      const data = await nguoiDungService.layDanhSachLoaiNguoiDung();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  dangNhap: async (req, res) => {
    try {
      const { taiKhoan, matKhau } = req.body;
      const result = await nguoiDungService.dangNhap({ taiKhoan, matKhau });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  dangKy: async (req, res) => {
    try {
      const { taiKhoan, matKhau, email, soDt, maNhom, hoTen } = req.body;
      const result = await nguoiDungService.dangKy({ taiKhoan, matKhau, email, soDt, maNhom, hoTen });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layDanhSachNguoiDung: async (req, res) => {
    try {
      const { MaNhom, tuKhoa } = req.query;
      const data = await nguoiDungService.layDanhSachNguoiDung({ maNhom: MaNhom, tuKhoa });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layDanhSachNguoiDungPhanTrang: async (req, res) => {
    try {
      const { MaNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
      const data = await nguoiDungService.layDanhSachNguoiDungPhanTrang({ maNhom: MaNhom, tuKhoa, soTrang: Number(soTrang), soPhanTuTrenTrang: Number(soPhanTuTrenTrang) });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  timKiemNguoiDung: async (req, res) => {
    try {
      const { MaNhom, tuKhoa } = req.query;
      const data = await nguoiDungService.timKiemNguoiDung({ maNhom: MaNhom, tuKhoa });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  timKiemNguoiDungPhanTrang: async (req, res) => {
    try {
      const { MaNhom, tuKhoa, soTrang, soPhanTuTrenTrang } = req.query;
      const data = await nguoiDungService.timKiemNguoiDungPhanTrang({ maNhom: MaNhom, tuKhoa, soTrang: Number(soTrang), soPhanTuTrenTrang: Number(soPhanTuTrenTrang) });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  thongTinTaiKhoan: async (req, res) => {
    try {
      const taiKhoan = req.user?.taiKhoan;
      const data = await nguoiDungService.thongTinTaiKhoan(taiKhoan);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layThongTinNguoiDung: async (req, res) => {
    try {
      const { taiKhoan } = req.query;
      const data = await nguoiDungService.layThongTinNguoiDung(taiKhoan);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  themNguoiDung: async (req, res) => {
    try {
      const data = req.body;
      const result = await nguoiDungService.themNguoiDung(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  capNhatThongTinNguoiDung: async (req, res) => {
    try {
      const { taiKhoan } = req.query;
      const data = req.body;
      const result = await nguoiDungService.capNhatThongTinNguoiDung(taiKhoan, data);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  xoaNguoiDung: async (req, res) => {
    try {
      const { TaiKhoan } = req.query;
      const result = await nguoiDungService.xoaNguoiDung(TaiKhoan);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = nguoiDungController;
