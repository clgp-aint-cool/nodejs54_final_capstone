import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { authApi } from '../../api/authApi';
import { userApi } from '../../api/userApi';
import { Button, Input } from '../../components/ui';
import { Loader2 as Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user: authUser, setAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');
  const [formData, setFormData] = useState({
    hoTen: authUser?.hoTen || '',
    soDt: authUser?.soDt || '',
    email: authUser?.email || '',
    matKhau: ''
  });

  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: authApi.getProfile
  });

  const updateMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      toast.success('Cập nhật thông tin thành công!');
      // Update store user
      const token = useAuthStore.getState().token;
      if (token) setAuth(token, data);
      refetch();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Lỗi cập nhật thông tin');
    }
  });

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary" /></div>;
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      taiKhoan: authUser?.taiKhoan,
      ...formData,
      // only send matKhau if it's not empty
      ...(formData.matKhau ? { matKhau: formData.matKhau } : {})
    });
  };

  const bookingHistory = profile?.thongTinDatVe || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Xin chào, {profile?.hoTen}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="glass-card p-4 flex flex-col gap-2">
            <button
              onClick={() => setActiveTab('info')}
              className={`p-3 text-left rounded-md transition-colors font-medium ${
                activeTab === 'info' ? 'bg-primary text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`p-3 text-left rounded-md transition-colors font-medium ${
                activeTab === 'history' ? 'bg-primary text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              Lịch sử đặt vé
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          {activeTab === 'info' && (
            <div className="glass-card p-6 md:p-8 animate-in fade-in">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-white/10 pb-4">Thông tin cá nhân</h2>
              
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input 
                    label="Tài khoản (Không thể đổi)" 
                    name="taiKhoan" 
                    value={profile?.taiKhoan || ''} 
                    disabled 
                  />
                </div>
                <Input 
                  label="Họ tên" 
                  name="hoTen" 
                  value={formData.hoTen}
                  onChange={(e: any) => setFormData({...formData, hoTen: e.target.value})}
                />
                <Input 
                  label="Số điện thoại" 
                  name="soDt" 
                  value={formData.soDt}
                  onChange={(e: any) => setFormData({...formData, soDt: e.target.value})}
                />
                <Input 
                  label="Email" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                />
                <Input 
                  label="Đổi mật khẩu (Bỏ trống nếu không đổi)" 
                  name="matKhau" 
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={formData.matKhau}
                  onChange={(e: any) => setFormData({...formData, matKhau: e.target.value})}
                />

                <div className="md:col-span-2 mt-4 flex justify-end">
                  <Button type="submit" variant="primary" isLoading={updateMutation.isPending}>
                    Cập nhật thông tin
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="glass-card p-6 md:p-8 animate-in fade-in">
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-white/10 pb-4">Lịch sử đặt vé</h2>
              
              {bookingHistory.length === 0 ? (
                <div className="text-center py-10 text-white/50">
                  Bạn chưa đặt vé nào.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {bookingHistory.map((ve: any) => (
                    <div key={ve.maVe} className="bg-dark-lighter/50 p-4 rounded-lg border border-white/10 flex flex-col md:flex-row gap-6">
                      <img 
                        src={ve.lichChieu?.phim?.hinhAnh} 
                        alt={ve.lichChieu?.phim?.tenPhim}
                        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-md"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">{ve.lichChieu?.phim?.tenPhim}</h3>
                        <p className="text-white/70 text-sm mb-1">
                          Ngày đặt: {format(new Date(ve.ngayDat), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </p>
                        <p className="text-white/70 text-sm mb-1">
                          Suất chiếu: <span className="font-bold text-primary">{format(new Date(ve.lichChieu?.ngayChieuGioChieu), 'dd/MM/yyyy HH:mm')}</span>
                        </p>
                        <p className="text-white/70 text-sm mb-2">
                          Rạp: <span className="font-bold text-white">{ve.ghe?.rap?.cumRap?.tenCumRap} - {ve.ghe?.rap?.tenRap}</span>
                        </p>
                        <div className="flex gap-2 items-center">
                          <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-sm text-sm font-bold tracking-wider">
                            GHẾ: {ve.ghe?.tenGhe}
                          </span>
                          <span className="text-white/50 font-bold ml-auto">{ve.giaVe?.toLocaleString()}đ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
