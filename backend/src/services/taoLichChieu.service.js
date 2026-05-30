const prisma = require('../config/db');

const taoLichChieuService = {
  async taoLichChieu(data) {
    const { maPhim, ngayChieuGioChieu, maRap, giaVe } = data;
    const phim = await prisma.phim.findUnique({ where: { maPhim: Number(maPhim) } });
    if (!phim) throw new Error('Phim không tồn tại');
    const rap = await prisma.rap.findUnique({ where: { maRap } });
    if (!rap) throw new Error('Rạp không tồn tại');
    const lichChieu = await prisma.lichChieu.create({
      data: { maPhim: Number(maPhim), maRap, ngayChieuGioChieu: new Date(ngayChieuGioChieu), giaVe: Number(giaVe) },
    });
    return { maLichChieu: lichChieu.maLichChieu };
  },
};

module.exports = taoLichChieuService;
