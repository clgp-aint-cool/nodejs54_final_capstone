export interface Seat {
  maGhe: number;
  tenGhe: string;
  loaiGhe: string;
  maRap: string;
  giaVe: number;
  daDat?: boolean;
  taiKhoanNguoiDat?: string | null;
}

export interface TicketRoom {
  maLichChieu: number;
  danhSachGhe: Seat[];
}

export interface TicketBookingRequest {
  maLichChieu: number;
  danhSachVe: {
    maGhe: number;
    giaVe: number;
  }[];
}
