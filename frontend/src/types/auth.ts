export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  loaiNguoiDung?: {
    tenLoai: string;
  };
  thongTinDatVe?: any[];
}

export interface AuthResponse {
  token: string;
  loaiNguoiDung: {
    maLoaiNguoiDung: string;
    tenLoai: string;
  };
}

export interface LoginParams {
  taiKhoan: string;
  matKhau: string;
}

export interface RegisterParams {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDt: string;
  maNhom?: string;
}
