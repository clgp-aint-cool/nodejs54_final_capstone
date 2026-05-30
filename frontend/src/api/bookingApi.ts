import { axiosInstance } from './axios';
import type { TicketBookingRequest, TicketRoom } from '../types/booking';

export const bookingApi = {
  getDanhSachPhongVe: async (maLichChieu: number): Promise<TicketRoom> => {
    const { data } = await axiosInstance.get(`/api/QuanLyDatVe/LayDanhSachPhongVe`, {
      params: { MaLichChieu: maLichChieu }
    });
    return data;
  },

  datVe: async (params: TicketBookingRequest): Promise<any> => {
    const { data } = await axiosInstance.post(`/api/QuanLyDatVe/DatVe`, params);
    return data;
  }
};
