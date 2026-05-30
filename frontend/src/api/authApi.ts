import { axiosInstance } from './axios';
import type { AuthResponse, LoginParams, RegisterParams, User } from '../types/auth';

export const authApi = {
  login: async (params: LoginParams): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post('/api/QuanLyNguoiDung/DangNhap', params);
    return data;
  },
  
  register: async (params: RegisterParams): Promise<User> => {
    const { data } = await axiosInstance.post('/api/QuanLyNguoiDung/DangKy', params);
    return data;
  },

  getProfile: async (): Promise<User> => {
    const { data } = await axiosInstance.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    return data;
  }
};
