import { axiosInstance } from './axios';
import type { User } from '../types/auth';

export const userApi = {
  getUsers: async (tuKhoa: string = ''): Promise<User[]> => {
    const { data } = await axiosInstance.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung', {
      params: { tuKhoa, maNhom: 'GP01' }
    });
    return data;
  },

  addUser: async (user: any): Promise<User> => {
    const { data } = await axiosInstance.post('/api/QuanLyNguoiDung/ThemNguoiDung', { ...user, maNhom: 'GP01' });
    return data;
  },

  updateUser: async (user: any): Promise<User> => {
    const { data } = await axiosInstance.post('/api/QuanLyNguoiDung/CapNhat', { ...user, maNhom: 'GP01' });
    return data;
  },

  updateProfile: async (user: any): Promise<User> => {
    const { data } = await axiosInstance.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', { ...user, maNhom: 'GP01' });
    return data;
  },

  deleteUser: async (taiKhoan: string): Promise<any> => {
    const { data } = await axiosInstance.delete('/api/QuanLyNguoiDung/XoaNguoiDung', {
      params: { taiKhoan }
    });
    return data;
  }
};
