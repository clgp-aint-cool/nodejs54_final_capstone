import { axiosInstance } from './axios';
import type { CinemaCluster, CinemaSystem } from '../types/cinema';

export const cinemaApi = {
  getHeThongRap: async (): Promise<CinemaSystem[]> => {
    const { data } = await axiosInstance.get('/api/QuanLyRap/LayThongTinHeThongRap');
    return data;
  },

  getCumRapTheoHeThong: async (maHeThongRap: string): Promise<CinemaCluster[]> => {
    const { data } = await axiosInstance.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong`, {
      params: { maHeThongRap }
    });
    return data;
  },

  getLichChieuHeThongRap: async (maHeThongRap: string, maNhom: string = 'GP01'): Promise<CinemaSystem[]> => {
    const { data } = await axiosInstance.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`, {
      params: { maHeThongRap, maNhom }
    });
    return data;
  },

  getLichChieuPhim: async (maPhim: number): Promise<any> => {
    // This API returns the showtimes structured by CinemaSystem for a specific movie
    const { data } = await axiosInstance.get(`/api/QuanLyRap/LayThongTinLichChieuPhim`, {
      params: { MaPhim: maPhim }
    });
    return data;
  },

  createShowtime: async (params: { maPhim: number; ngayChieuGioChieu: string; maRap: string; giaVe: number }): Promise<any> => {
    const { data } = await axiosInstance.post('/api/QuanLyLichChieu/TaoLichChieu', params);
    return data;
  }
};
