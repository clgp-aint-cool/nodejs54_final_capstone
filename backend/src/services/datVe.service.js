const prisma = require('../config/db');

const datVeService = {
  async layDanhSachPhongVe(MaLichChieu) {
    const lichChieu = await prisma.lichChieu.findUnique({
      where: { maLichChieu: Number(MaLichChieu) },
      include: {
        rap: { 
          include: { 
            cumRap: { select: { maCumRap: true, tenCumRap: true, diaChi: true } },
            ghe: { select: { maGhe: true, tenGhe: true, loaiGhe: true } }
          } 
        },
        phim: { select: { tenPhim: true, hinhAnh: true } },
        datVe: { select: { maGhe: true, taiKhoanNguoiDung: true } },
      },
    });
    if (!lichChieu) throw new Error('Không tìm thấy lịch chiếu');

    const danhSachGhe = lichChieu.rap.ghe.map(g => {
      const veDat = lichChieu.datVe.find(v => v.maGhe === g.maGhe);
      return {
        maGhe: g.maGhe,
        tenGhe: g.tenGhe,
        maRap: lichChieu.rap.maRap,
        loaiGhe: g.loaiGhe,
        stt: g.tenGhe,
        giaVe: lichChieu.giaVe,
        daDat: !!veDat,
        taiKhoanNguoiDat: veDat ? veDat.taiKhoanNguoiDung : null
      };
    });

    return {
      thongTinPhim: {
        maLichChieu: lichChieu.maLichChieu,
        tenCumRap: lichChieu.rap.cumRap.tenCumRap,
        tenRap: lichChieu.rap.tenRap,
        diaChi: lichChieu.rap.cumRap.diaChi,
        tenPhim: lichChieu.phim.tenPhim,
        hinhAnh: lichChieu.phim.hinhAnh,
        ngayChieu: lichChieu.ngayChieuGioChieu,
        gioChieu: lichChieu.ngayChieuGioChieu
      },
      danhSachGhe
    };
  },

  async datVe({ maLichChieu, danhSachVe, taiKhoanNguoiDung }) {
    const lichChieu = await prisma.lichChieu.findUnique({
      where: { maLichChieu: Number(maLichChieu) },
    });
    if (!lichChieu) throw new Error('Lịch chiếu không tồn tại');

    const danhSachMaGhe = danhSachVe.map((v) => v.maGhe);
    const existingVe = await prisma.datVe.findMany({
      where: {
        maLichChieu: Number(maLichChieu),
        maGhe: { in: danhSachMaGhe },
      },
    });
    if (existingVe.length > 0) {
      const occupied = existingVe.map((v) => v.maGhe);
      throw new Error(`Ghế đã có người đặt: ${occupied.join(', ')}`);
    }

    const ves = await prisma.datVe.createMany({
      data: danhSachVe.map((v) => ({
        maGhe: v.maGhe,
        maLichChieu: Number(maLichChieu),
        giaVe: v.giaVe,
        taiKhoanNguoiDung,
      })),
    });
    return { count: ves.count };
  },
};

module.exports = datVeService;
