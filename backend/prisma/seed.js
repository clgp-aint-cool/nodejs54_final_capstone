const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  await prisma.banner.deleteMany();
  await prisma.datVe.deleteMany();
  await prisma.lichChieu.deleteMany();
  await prisma.ghe.deleteMany();
  await prisma.rap.deleteMany();
  await prisma.cumRap.deleteMany();
  await prisma.heThongRap.deleteMany();
  await prisma.phim.deleteMany();
  await prisma.nguoiDung.deleteMany();
  await prisma.loaiNguoiDung.deleteMany();

  const loaiKhachHang = await prisma.loaiNguoiDung.create({
    data: { maLoaiNguoiDung: 'KH', tenLoai: 'Khách hàng' },
  });
  const loaiQuanTri = await prisma.loaiNguoiDung.create({
    data: { maLoaiNguoiDung: 'QT', tenLoai: 'Quản trị viên' },
  });

  const hashedPassword = bcrypt.hashSync('123456', 10);
  await prisma.nguoiDung.create({
    data: {
      taiKhoan: 'nguyenvana', matKhau: hashedPassword, hoTen: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com', soDt: '0909123456', maNhom: 'GP01',
      maLoaiNguoiDung: loaiKhachHang.maLoaiNguoiDung,
    },
  });
  await prisma.nguoiDung.create({
    data: {
      taiKhoan: 'admin', matKhau: hashedPassword, hoTen: 'Administrator',
      email: 'admin@cinema.com', soDt: '0900000000', maNhom: 'GP01',
      maLoaiNguoiDung: loaiQuanTri.maLoaiNguoiDung,
    },
  });

  const htrBHDStar = await prisma.heThongRap.create({ data: { maHeThongRap: 'BHDStar', tenHeThongRap: 'BHD Star Cineplex', logo: 'bhdstar.png' } });
  const htrCGV     = await prisma.heThongRap.create({ data: { maHeThongRap: 'CGV',     tenHeThongRap: 'CGV Cinemas', logo: 'cgv.png' } });
  const htrGalaxy  = await prisma.heThongRap.create({ data: { maHeThongRap: 'Galaxy',  tenHeThongRap: 'Galaxy Cinema', logo: 'galaxy.png' } });
  const htrLotte   = await prisma.heThongRap.create({ data: { maHeThongRap: 'Lotte',   tenHeThongRap: 'Lotte Cinema', logo: 'lotte.png' } });
  const htrMegaGS  = await prisma.heThongRap.create({ data: { maHeThongRap: 'MegaGS',  tenHeThongRap: 'Mega GS Cinema', logo: 'megags.png' } });

  const cr1 = await prisma.cumRap.create({ data: { maCumRap: 'cr1', tenCumRap: 'BHD Star Bitexco', diaChi: 'Bitexco, Q.1', maHeThongRap: htrBHDStar.maHeThongRap } });
  const cr2 = await prisma.cumRap.create({ data: { maCumRap: 'cr2', tenCumRap: 'CGV Vincom', diaChi: 'Vincom, Q.1', maHeThongRap: htrCGV.maHeThongRap } });
  const cr3 = await prisma.cumRap.create({ data: { maCumRap: 'cr3', tenCumRap: 'Galaxy Nguyễn Du', diaChi: 'Nguyễn Du, Q.1', maHeThongRap: htrGalaxy.maHeThongRap } });
  const cr4 = await prisma.cumRap.create({ data: { maCumRap: 'cr4', tenCumRap: 'Lotte Center', diaChi: 'Lotte Center, Q.1', maHeThongRap: htrLotte.maHeThongRap } });
  const cr5 = await prisma.cumRap.create({ data: { maCumRap: 'cr5', tenCumRap: 'MegaGS Cao Thắng', diaChi: 'Cao Thắng, Q.10', maHeThongRap: htrMegaGS.maHeThongRap } });

  const rap1 = await prisma.rap.create({ data: { maRap: 'rap1', tenRap: 'Rạp 1', maCumRap: cr1.maCumRap } });
  const rap2 = await prisma.rap.create({ data: { maRap: 'rap2', tenRap: 'Rạp 2', maCumRap: cr2.maCumRap } });
  const rap3 = await prisma.rap.create({ data: { maRap: 'rap3', tenRap: 'Rạp 3', maCumRap: cr3.maCumRap } });
  const rap4 = await prisma.rap.create({ data: { maRap: 'rap4', tenRap: 'Rạp 4', maCumRap: cr4.maCumRap } });
  const rap5 = await prisma.rap.create({ data: { maRap: 'rap5', tenRap: 'Rạp 5', maCumRap: cr5.maCumRap } });

  const phim1 = await prisma.phim.create({
    data: { tenPhim: 'Avengers: Endgame', biDanh: 'avengers-endgame', trailer: 'https://youtube.com/watch?v=abc', hinhAnh: 'avengers.jpg', moTa: 'Siêu anh hùng Marvel', ngayKhoiChieu: new Date('2025-01-15'), danhGia: 9, hot: true, dangChieu: true },
  });
  const phim2 = await prisma.phim.create({
    data: { tenPhim: 'Frozen 2', biDanh: 'frozen-2', trailer: 'https://youtube.com/watch?v=def', hinhAnh: 'frozen2.jpg', moTa: 'Nữ hoàng băng giá', ngayKhoiChieu: new Date('2025-02-20'), danhGia: 8, sapChieu: true },
  });
  const phim3 = await prisma.phim.create({
    data: { tenPhim: 'Joker', biDanh: 'joker', trailer: 'https://youtube.com/watch?v=ghi', hinhAnh: 'joker.jpg', moTa: 'Tội phạm tâm lý', ngayKhoiChieu: new Date('2024-12-10'), danhGia: 9, dangChieu: true },
  });

  await prisma.banner.create({ data: { hinhAnh: 'banner_avengers.jpg', maPhim: phim1.maPhim } });
  await prisma.banner.create({ data: { hinhAnh: 'banner_joker.jpg', maPhim: phim3.maPhim } });

  const lc1 = await prisma.lichChieu.create({ data: { maPhim: phim1.maPhim, maRap: rap1.maRap, ngayChieuGioChieu: new Date('2025-06-15T10:00:00'), giaVe: 100000 } });
  const lc2 = await prisma.lichChieu.create({ data: { maPhim: phim1.maPhim, maRap: rap2.maRap, ngayChieuGioChieu: new Date('2025-06-15T14:00:00'), giaVe: 120000 } });
  const lc3 = await prisma.lichChieu.create({ data: { maPhim: phim2.maPhim, maRap: rap3.maRap, ngayChieuGioChieu: new Date('2025-06-16T10:00:00'), giaVe: 90000 } });
  const lc4 = await prisma.lichChieu.create({ data: { maPhim: phim3.maPhim, maRap: rap4.maRap, ngayChieuGioChieu: new Date('2025-06-16T18:00:00'), giaVe: 110000 } });
  const lc5 = await prisma.lichChieu.create({ data: { maPhim: phim1.maPhim, maRap: rap5.maRap, ngayChieuGioChieu: new Date('2025-06-17T09:00:00'), giaVe: 100000 } });

  const gheTypes = ['Thuong', 'VIP', 'Couple'];
  for (let i = 1; i <= 5; i++) {
    const loai = i <= 2 ? gheTypes[0] : i <= 4 ? gheTypes[1] : gheTypes[2];
    await prisma.ghe.create({ data: { tenGhe: `A${i}`, loaiGhe: loai, maRap: rap1.maRap } });
    await prisma.ghe.create({ data: { tenGhe: `B${i}`, loaiGhe: loai, maRap: rap2.maRap } });
    await prisma.ghe.create({ data: { tenGhe: `C${i}`, loaiGhe: loai, maRap: rap3.maRap } });
  }

  console.log('Seed thanh cong!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
