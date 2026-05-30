import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';
const cleanBaseUrl = BASE_URL.replace(/\/$/, ''); // Xóa dấu gạch chéo ở cuối nếu có

// Hàm đệ quy để tự động gắn link Backend vào các ảnh có dạng /public/uploads/...
const fixImageUrls = (obj: any) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key].startsWith('/public/uploads/')) {
      obj[key] = cleanBaseUrl + obj[key];
    } else if (typeof obj[key] === 'object') {
      fixImageUrls(obj[key]);
    }
  }
};

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Tự động sửa toàn bộ link ảnh trong data trả về
    if (response.data) {
      fixImageUrls(response.data);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
