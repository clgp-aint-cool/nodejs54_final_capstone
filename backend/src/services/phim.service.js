const prisma = require('../config/db');

const phimService = {
  async layDanhSachBanner() {
    return prisma.banner.findMany({
      include: { phim: { select: { maPhim: true, tenPhim: true, hinhAnh: true, biDanh: true } } },
    });
  },

  async themBanner(maPhim, hinhAnhUrl) {
    // Check if phim exists first
    const phim = await prisma.phim.findUnique({ where: { maPhim: Number(maPhim) } });
    if (!phim) throw new Error('Không tìm thấy phim');

    return prisma.banner.create({
      data: {
        maPhim: Number(maPhim),
        hinhAnh: hinhAnhUrl
      }
    });
  },

  async capNhatBanner(maBanner, maPhim, hinhAnhUrl) {
    const phim = await prisma.phim.findUnique({ where: { maPhim: Number(maPhim) } });
    if (!phim) throw new Error('Không tìm thấy phim');

    const data = { maPhim: Number(maPhim) };
    if (hinhAnhUrl) data.hinhAnh = hinhAnhUrl;

    return prisma.banner.update({
      where: { maBanner: Number(maBanner) },
      data
    });
  },

  async xoaBanner(maBanner) {
    await prisma.banner.delete({ where: { maBanner: Number(maBanner) } });
    return { message: 'Xóa banner thành công' };
  },

  async layDanhSachPhim({ maNhom, tenPhim }) {
    return prisma.phim.findMany({
      where: {
        ...(tenPhim ? { tenPhim: { contains: tenPhim } } : {}),
      },
      select: {
        maPhim: true,
        tenPhim: true,
        biDanh: true,
        hinhAnh: true,
        trailer: true,
        moTa: true,
        ngayKhoiChieu: true,
        danhGia: true,
        hot: true,
        sapChieu: true,
        dangChieu: true,
      },
    });
  },

  async layDanhSachPhimPhanTrang({ maNhom, tenPhim, soTrang = 1, soPhanTuTrenTrang = 10 }) {
    const where = {
      ...(tenPhim ? { tenPhim: { contains: tenPhim } } : {}),
    };
    const skip = (soTrang - 1) * soPhanTuTrenTrang;
    const [items, total] = await Promise.all([
      prisma.phim.findMany({
        where,
        select: {
          maPhim: true,
          tenPhim: true,
          biDanh: true,
          hinhAnh: true,
          trailer: true,
          moTa: true,
          ngayKhoiChieu: true,
          danhGia: true,
          hot: true,
          sapChieu: true,
          dangChieu: true,
        },
        skip,
        take: soPhanTuTrenTrang,
      }),
      prisma.phim.count({ where }),
    ]);
    return { items, total, soTrang, soPhanTuTrenTrang };
  },

  async layDanhSachPhimTheoNgay({ maNhom, tenPhim, tuNgay, denNgay, soTrang = 1, soPhanTuTrenTrang = 10 }) {
    const where = {
      ...(tenPhim ? { tenPhim: { contains: tenPhim } } : {}),
      ...(tuNgay && denNgay
        ? { ngayKhoiChieu: { gte: new Date(tuNgay), lte: new Date(denNgay) } }
        : {}),
    };
    const skip = (soTrang - 1) * soPhanTuTrenTrang;
    const [items, total] = await Promise.all([
      prisma.phim.findMany({
        where,
        select: {
          maPhim: true,
          tenPhim: true,
          biDanh: true,
          hinhAnh: true,
          trailer: true,
          moTa: true,
          ngayKhoiChieu: true,
          danhGia: true,
          hot: true,
          sapChieu: true,
          dangChieu: true,
        },
        skip,
        take: soPhanTuTrenTrang,
      }),
      prisma.phim.count({ where }),
    ]);
    return { items, total, soTrang, soPhanTuTrenTrang };
  },

  async layThongTinPhim(maPhim) {
    return prisma.phim.findUnique({ where: { maPhim } });
  },

  async themPhim(data) {
    return prisma.phim.create({ data });
  },

  async capNhatPhim(maPhim, data) {
    return prisma.phim.update({ where: { maPhim }, data });
  },

  async xoaPhim(maPhim) {
    // Find all lichChieu for this movie
    const lichChieus = await prisma.lichChieu.findMany({
      where: { maPhim },
      select: { maLichChieu: true }
    });
    
    const maLichChieuList = lichChieus.map(lc => lc.maLichChieu);

    // Delete DatVe first
    if (maLichChieuList.length > 0) {
      await prisma.datVe.deleteMany({
        where: { maLichChieu: { in: maLichChieuList } }
      });
    }

    // Delete LichChieu
    await prisma.lichChieu.deleteMany({ where: { maPhim } });
    
    // Delete Banner
    await prisma.banner.deleteMany({ where: { maPhim } });
    
    // Finally delete Phim
    await prisma.phim.delete({ where: { maPhim } });
    return { message: 'Xóa phim thành công' };
  },
};

module.exports = phimService;
