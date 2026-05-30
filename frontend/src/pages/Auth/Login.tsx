import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/authApi';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Film } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: ''
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      // Once logged in, fetch user profile to get full details
      // Or if the backend returns it, just set it. 
      // Based on spec, it returns token and loaiNguoiDung. We can fetch full profile.
      try {
        // Temporarily set token so getProfile works
        useAuthStore.setState({ token: data.token });
        const profile = await authApi.getProfile();
        setAuth(data.token, profile);
        toast.success('Đăng nhập thành công!');
        navigate('/');
      } catch (error) {
        toast.error('Không thể lấy thông tin người dùng.');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.taiKhoan || !formData.matKhau) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/movie-poster-background-15h2e6h8d116vj3r.jpg')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-dark/90 backdrop-blur-sm" />

      {/* Form Container */}
      <div className="relative w-full max-w-md glass-card p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <Film className="text-primary w-10 h-10" />
            <span className="text-3xl font-bold text-white tracking-wider">
              CYBER<span className="text-primary">CINEMA</span>
            </span>
          </Link>
          <p className="text-white/60">Đăng nhập để trải nghiệm tốt nhất</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input 
            label="Tài khoản" 
            name="taiKhoan"
            placeholder="Nhập tài khoản của bạn"
            value={formData.taiKhoan}
            onChange={handleChange}
          />
          <Input 
            label="Mật khẩu" 
            name="matKhau"
            type="password"
            placeholder="Nhập mật khẩu"
            value={formData.matKhau}
            onChange={handleChange}
          />

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-4 h-12 text-lg"
            isLoading={loginMutation.isPending}
          >
            Đăng Nhập
          </Button>
        </form>

        <div className="mt-8 text-center text-white/60">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-primary hover:underline font-medium transition-all">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
