const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const prisma = require('../config/db');

const nguoiDungService = {
  async layDanhSachLoaiNguoiDung() {
    return prisma.loaiNguoiDung.findMany();
  },

  async dangNhap({ taiKhoan, matKhau }) {
    const nguoiDung = await prisma.nguoiDung.findUnique({
      where: { taiKhoan },
      include: { loaiNguoiDung: true },
    });
    if (!nguoiDung) throw new Error('Tài khoản không tồn tại');
    const isValid = bcrypt.compareSync(matKhau, nguoiDung.matKhau);
    if (!isValid) throw new Error('Mật khẩu không đúng');
    const token = jwt.sign({ taiKhoan: nguoiDung.taiKhoan, maLoaiNguoiDung: nguoiDung.maLoaiNguoiDung }, config.jwtSecret, { expiresIn: '8h' });
    return { token, loaiNguoiDung: { maLoaiNguoiDung: nguoiDung.loaiNguoiDung.maLoaiNguoiDung, tenLoai: nguoiDung.loaiNguoiDung.tenLoai } };
  },

  async dangKy({ taiKhoan, matKhau, email, soDt, maNhom, hoTen }) {
    const existing = await prisma.nguoiDung.findUnique({ where: { taiKhoan } });
    if (existing) throw new Error('Tài khoản đã tồn tại');
    const loai = await prisma.loaiNguoiDung.findFirst();
    if (!loai) throw new Error('Chưa có loại người dùng');
    const hashed = bcrypt.hashSync(matKhau, 10);
    return prisma.nguoiDung.create({
      data: { taiKhoan, matKhau: hashed, hoTen, email, soDt, maLoaiNguoiDung: loai.maLoaiNguoiDung, maNhom: maNhom || 'GP01' },
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async layDanhSachNguoiDung({ maNhom, tuKhoa }) {
    const where = {
      ...(maNhom ? { maNhom } : {}),
      ...(tuKhoa ? { OR: [{ hoTen: { contains: tuKhoa } }, { taiKhoan: { contains: tuKhoa } }] } : {}),
    };
    return prisma.nguoiDung.findMany({
      where,
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async layDanhSachNguoiDungPhanTrang({ maNhom, tuKhoa, soTrang = 1, soPhanTuTrenTrang = 20 }) {
    const where = {
      ...(maNhom ? { maNhom } : {}),
      ...(tuKhoa ? { OR: [{ hoTen: { contains: tuKhoa } }, { taiKhoan: { contains: tuKhoa } }] } : {}),
    };
    const skip = (soTrang - 1) * soPhanTuTrenTrang;
    const [items, total] = await Promise.all([
      prisma.nguoiDung.findMany({ where, select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } }, skip, take: soPhanTuTrenTrang }),
      prisma.nguoiDung.count({ where }),
    ]);
    return { items, total, soTrang, soPhanTuTrenTrang };
  },

  async timKiemNguoiDung({ maNhom, tuKhoa }) {
    const where = {
      ...(maNhom ? { maNhom } : {}),
      ...(tuKhoa ? { OR: [{ hoTen: { contains: tuKhoa } }, { taiKhoan: { contains: tuKhoa } }] } : {}),
    };
    return prisma.nguoiDung.findMany({
      where,
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async timKiemNguoiDungPhanTrang({ maNhom, tuKhoa, soTrang = 1, soPhanTuTrenTrang = 1 }) {
    const where = {
      ...(maNhom ? { maNhom } : {}),
      ...(tuKhoa ? { OR: [{ hoTen: { contains: tuKhoa } }, { taiKhoan: { contains: tuKhoa } }] } : {}),
    };
    const skip = (soTrang - 1) * soPhanTuTrenTrang;
    const [items, total] = await Promise.all([
      prisma.nguoiDung.findMany({ where, select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } }, skip, take: soPhanTuTrenTrang }),
      prisma.nguoiDung.count({ where }),
    ]);
    return { items, total, soTrang, soPhanTuTrenTrang };
  },

  async thongTinTaiKhoan(taiKhoan) {
    const user = await prisma.nguoiDung.findUnique({
      where: { taiKhoan },
      select: { 
        taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } },
        datVe: {
          select: {
            maVe: true,
            ngayDat: true,
            giaVe: true,
            ghe: {
              select: { 
                tenGhe: true, 
                rap: { 
                  select: { 
                    tenRap: true, 
                    cumRap: { select: { tenCumRap: true, heThongRap: { select: { tenHeThongRap: true } } } } 
                  } 
                } 
              }
            },
            lichChieu: {
              select: { ngayChieuGioChieu: true, phim: { select: { tenPhim: true, hinhAnh: true } } }
            }
          }
        }
      },
    });
    
    if (user) {
      user.thongTinDatVe = user.datVe;
      delete user.datVe;
    }
    return user;
  },

  async layThongTinNguoiDung(taiKhoan) {
    return prisma.nguoiDung.findUnique({
      where: { taiKhoan },
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async themNguoiDung(data) {
    const loai = await prisma.loaiNguoiDung.findFirst();
    if (!loai) throw new Error('Chưa có loại người dùng');
    const hashed = bcrypt.hashSync(data.matKhau || '123456', 10);
    return prisma.nguoiDung.create({
      data: { ...data, matKhau: hashed, maLoaiNguoiDung: data.maLoaiNguoiDung || loai.maLoaiNguoiDung, maNhom: data.maNhom || 'GP01' },
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async capNhatThongTinNguoiDung(taiKhoan, data) {
    const { matKhau, ...rest } = data;
    if (matKhau) {
      rest.matKhau = bcrypt.hashSync(matKhau, 10);
    }
    return prisma.nguoiDung.update({
      where: { taiKhoan },
      data: rest,
      select: { taiKhoan: true, hoTen: true, email: true, soDt: true, maNhom: true, maLoaiNguoiDung: true, loaiNguoiDung: { select: { tenLoai: true } } },
    });
  },

  async xoaNguoiDung(taiKhoan) {
    await prisma.datVe.deleteMany({ where: { taiKhoanNguoiDung: taiKhoan } });
    await prisma.nguoiDung.delete({ where: { taiKhoan } });
    return { message: 'Xóa người dùng thành công' };
  },
};

module.exports = nguoiDungService;
