export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string | null;
  hinhAnh: string;
  moTa: string | null;
  ngayKhoiChieu: string | null;
  danhGia: number | null;
  hot: boolean | null;
  sapChieu: boolean | null;
  dangChieu: boolean | null;
}

export interface Banner {
  maBanner: number;
  hinhAnh: string;
  maPhim: number;
  phim?: Movie;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  soTrang: number;
  soPhanTuTrenTrang: number;
}
