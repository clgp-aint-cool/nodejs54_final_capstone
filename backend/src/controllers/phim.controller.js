const phimService = require('../services/phim.service');

const phimController = {
  layDanhSachBanner: async (req, res) => {
    try {
      const data = await phimService.layDanhSachBanner();
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  themBannerUploadHinh: async (req, res) => {
    try {
      const { maPhim } = req.body;
      if (!maPhim) {
        return res.status(400).json({ message: 'Vui lòng cung cấp mã phim (maPhim)' });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: 'Vui lòng upload hình ảnh (file)' });
      }

      // Convert local path to a URL accessible path
      const hinhAnhUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
      
      const result = await phimService.themBanner(maPhim, hinhAnhUrl);
      res.status(200).json({ message: 'Thêm banner thành công', data: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  capNhatBannerUploadHinh: async (req, res) => {
    try {
      const maBanner = req.params.maBanner || req.query.maBanner || req.body.maBanner;
      const { maPhim } = req.body;
      
      if (!maBanner) return res.status(400).json({ message: 'Vui lòng cung cấp mã banner' });
      if (!maPhim) return res.status(400).json({ message: 'Vui lòng cung cấp mã phim' });

      let hinhAnhUrl = null;
      if (req.file) {
        hinhAnhUrl = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
      }
      
      const result = await phimService.capNhatBanner(maBanner, maPhim, hinhAnhUrl);
      res.status(200).json({ message: 'Cập nhật banner thành công', data: result });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  xoaBanner: async (req, res) => {
    try {
      const { maBanner } = req.query;
      if (!maBanner) return res.status(400).json({ message: 'Vui lòng cung cấp mã banner' });
      const result = await phimService.xoaBanner(maBanner);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layDanhSachPhim: async (req, res) => {
    try {
      const { maNhom, tenPhim } = req.query;
      const data = await phimService.layDanhSachPhim({ maNhom, tenPhim });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layDanhSachPhimPhanTrang: async (req, res) => {
    try {
      const { maNhom, tenPhim, soTrang, soPhanTuTrenTrang } = req.query;
      const data = await phimService.layDanhSachPhimPhanTrang({ maNhom, tenPhim, soTrang: Number(soTrang), soPhanTuTrenTrang: Number(soPhanTuTrenTrang) });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layDanhSachPhimTheoNgay: async (req, res) => {
    try {
      const { maNhom, tenPhim, tuNgay, denNgay, soTrang, soPhanTuTrenTrang } = req.query;
      const data = await phimService.layDanhSachPhimTheoNgay({ maNhom, tenPhim, tuNgay, denNgay, soTrang: Number(soTrang), soPhanTuTrenTrang: Number(soPhanTuTrenTrang) });
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  layThongTinPhim: async (req, res) => {
    try {
      const { MaPhim } = req.query;
      const data = await phimService.layThongTinPhim(Number(MaPhim));
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  themPhimUploadHinh: async (req, res) => {
    try {
      const data = req.body;
      if (req.file) {
        data.hinhAnh = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
      }
      
      // Convert boolean string values if sent from form-data
      if (data.hot === 'true') data.hot = true;
      if (data.hot === 'false') data.hot = false;
      if (data.dangChieu === 'true') data.dangChieu = true;
      if (data.dangChieu === 'false') data.dangChieu = false;
      if (data.sapChieu === 'true') data.sapChieu = true;
      if (data.sapChieu === 'false') data.sapChieu = false;
      if (data.danhGia) data.danhGia = Number(data.danhGia);
      if (data.ngayKhoiChieu) data.ngayKhoiChieu = new Date(data.ngayKhoiChieu);

      if (data.maNhom) delete data.maNhom;

      const result = await phimService.themPhim(data);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  capNhatPhimUpload: async (req, res) => {
    try {
      const maPhim = req.params.maPhim || req.query.maPhim || req.body.maPhim;
      const data = req.body;
      
      if (req.file) {
        data.hinhAnh = `${req.protocol}://${req.get('host')}/public/uploads/${req.file.filename}`;
      }
      
      // Convert boolean string values if sent from form-data
      if (data.hot === 'true') data.hot = true;
      if (data.hot === 'false') data.hot = false;
      if (data.dangChieu === 'true') data.dangChieu = true;
      if (data.dangChieu === 'false') data.dangChieu = false;
      if (data.sapChieu === 'true') data.sapChieu = true;
      if (data.sapChieu === 'false') data.sapChieu = false;
      if (data.danhGia) data.danhGia = Number(data.danhGia);
      if (data.ngayKhoiChieu) data.ngayKhoiChieu = new Date(data.ngayKhoiChieu);

      // Remove maPhim from data object if it exists so Prisma doesn't try to update the ID
      if (data.maPhim) delete data.maPhim;
      if (data.maNhom) delete data.maNhom;

      const result = await phimService.capNhatPhim(Number(maPhim), data);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  uploadHinhAnh: async (req, res) => {
    res.status(200).json({ url: req.file ? `/uploads/${req.file.filename}` : '' });
  },

  xoaPhim: async (req, res) => {
    try {
      const { MaPhim } = req.query;
      const result = await phimService.xoaPhim(Number(MaPhim));
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = phimController;
