import { axiosInstance } from './axios';
import type { Banner, Movie } from '../types/movie';

export const movieApi = {
  getBanners: async (): Promise<Banner[]> => {
    const { data } = await axiosInstance.get('/api/QuanLyPhim/LayDanhSachBanner');
    return data;
  },

  getMovies: async (maNhom: string = 'GP01', tenPhim: string = ''): Promise<Movie[]> => {
    const { data } = await axiosInstance.get(`/api/QuanLyPhim/LayDanhSachPhim`, {
      params: { maNhom, tenPhim }
    });
    return data;
  },

  getMovieDetail: async (maPhim: number): Promise<Movie> => {
    const { data } = await axiosInstance.get(`/api/QuanLyPhim/LayThongTinPhim`, {
      params: { MaPhim: maPhim }
    });
    return data;
  },

  addMovieUploadImage: async (formData: FormData): Promise<any> => {
    const { data } = await axiosInstance.post('/api/QuanLyPhim/ThemPhimUploadHinh', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  updateMovieUploadImage: async (formData: FormData): Promise<any> => {
    const { data } = await axiosInstance.post('/api/QuanLyPhim/CapNhatPhimUpload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },

  deleteMovie: async (maPhim: number): Promise<any> => {
    const { data } = await axiosInstance.delete('/api/QuanLyPhim/XoaPhim', {
      params: { MaPhim: maPhim }
    });
    return data;
  },

  addBannerUploadImage: async (formData: FormData): Promise<any> => {
    const { data } = await axiosInstance.post(`/api/QuanLyPhim/ThemBannerUploadHinh`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  updateBannerUploadImage: async (formData: FormData): Promise<any> => {
    const { data } = await axiosInstance.post(`/api/QuanLyPhim/CapNhatBannerUploadHinh`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  },
  deleteBanner: async (maBanner: number): Promise<any> => {
    const { data } = await axiosInstance.delete(`/api/QuanLyPhim/XoaBanner?maBanner=${maBanner}`);
    return data;
  },
};
