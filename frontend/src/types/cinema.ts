export interface CinemaSystem {
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string | null;
  cumRap?: CinemaCluster[];
}

export interface CinemaCluster {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  maHeThongRap: string;
  rap?: Cinema[];
  lichChieuPhim?: Showtime[];
}

export interface Cinema {
  maRap: string;
  tenRap: string;
  maCumRap: string;
}

export interface Showtime {
  maLichChieu: number;
  maPhim: number;
  maRap: string;
  ngayChieuGioChieu: string;
  giaVe: number;
  rap?: Cinema;
}
