import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/authApi';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Film } from 'lucide-react';
import toast from 'react-hot-toast';

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDt: '',
    maNhom: 'GP01'
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Đăng ký thất bại.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.taiKhoan || !formData.matKhau || !formData.email || !formData.hoTen || !formData.soDt) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    // Email basic regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ');
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4 py-10">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-[url('https://wallpapers.com/images/hd/movie-poster-background-15h2e6h8d116vj3r.jpg')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-dark/95 backdrop-blur-md" />

      {/* Form Container */}
      <div className="relative w-full max-w-lg glass-card p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-2">
            <Film className="text-primary w-10 h-10" />
            <span className="text-3xl font-bold text-white tracking-wider">
              CYBER<span className="text-primary">CINEMA</span>
            </span>
          </Link>
          <p className="text-white/60">Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Tài khoản" 
              name="taiKhoan"
              placeholder="VD: nguyenvana"
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
          </div>
          
          <Input 
            label="Họ và tên" 
            name="hoTen"
            placeholder="VD: Nguyễn Văn A"
            value={formData.hoTen}
            onChange={handleChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Email" 
              name="email"
              type="email"
              placeholder="VD: email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <Input 
              label="Số điện thoại" 
              name="soDt"
              placeholder="VD: 0909123456"
              value={formData.soDt}
              onChange={handleChange}
            />
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-6 h-12 text-lg"
            isLoading={registerMutation.isPending}
          >
            Đăng Ký
          </Button>
        </form>

        <div className="mt-8 text-center text-white/60">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium transition-all">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
