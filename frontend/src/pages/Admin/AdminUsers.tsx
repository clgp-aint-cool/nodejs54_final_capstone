import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { userApi } from '../../api/userApi';
import { Button, Input } from '../../components/ui';
import { Trash2, Edit2, Plus, X, Loader2 as Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import type { User } from '../../types/auth';

export const AdminUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    taiKhoan: '',
    matKhau: '',
    hoTen: '',
    email: '',
    soDt: '',
    maLoaiNguoiDung: 'KH'
  });

  const { data: users, isLoading, refetch } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: () => userApi.getUsers()
  });

  const addMutation = useMutation({
    mutationFn: userApi.addUser,
    onSuccess: () => {
      toast.success('Thêm người dùng thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi thêm người dùng')
  });

  const updateMutation = useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: () => {
      toast.success('Cập nhật thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi cập nhật')
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      toast.success('Xóa thành công');
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi xóa người dùng')
  });

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        taiKhoan: user.taiKhoan,
        matKhau: '',
        hoTen: user.hoTen,
        email: user.email || '',
        soDt: user.soDt || '',
        maLoaiNguoiDung: user.maLoaiNguoiDung
      });
    } else {
      setEditingUser(null);
      setFormData({
        taiKhoan: '', matKhau: '', hoTen: '', email: '', soDt: '', maLoaiNguoiDung: 'KH'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateMutation.mutate(formData);
    } else {
      addMutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary" /></div>;

  return (
    <div className="animate-in fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Quản lý Người Dùng</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" /> Thêm Người Dùng
        </Button>
      </div>

      <div className="bg-dark-card rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/80">
                <th className="p-4 font-medium">STT</th>
                <th className="p-4 font-medium">Tài Khoản</th>
                <th className="p-4 font-medium">Họ Tên</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Loại</th>
                <th className="p-4 font-medium text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user.taiKhoan} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white/70">{index + 1}</td>
                  <td className="p-4 font-bold text-white">{user.taiKhoan}</td>
                  <td className="p-4 text-white/90">{user.hoTen}</td>
                  <td className="p-4 text-white/70">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.maLoaiNguoiDung === 'QT' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/70'}`}>
                      {user.loaiNguoiDung?.tenLoai || user.maLoaiNguoiDung}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <button 
                      onClick={() => handleOpenModal(user)}
                      className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
                          deleteMutation.mutate(user.taiKhoan);
                        }
                      }}
                      className="w-8 h-8 rounded bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-dark-card border border-white/10 rounded-xl p-6 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng Mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Tài khoản" 
                  name="taiKhoan" 
                  value={formData.taiKhoan}
                  onChange={(e: any) => setFormData({...formData, taiKhoan: e.target.value})}
                  disabled={!!editingUser}
                />
                <Input 
                  label="Mật khẩu" 
                  name="matKhau" 
                  type="password"
                  placeholder={editingUser ? 'Để trống nếu không đổi' : ''}
                  value={formData.matKhau}
                  onChange={(e: any) => setFormData({...formData, matKhau: e.target.value})}
                />
              </div>
              <Input 
                label="Họ tên" 
                name="hoTen" 
                value={formData.hoTen}
                onChange={(e: any) => setFormData({...formData, hoTen: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Email" 
                  name="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                />
                <Input 
                  label="Số điện thoại" 
                  name="soDt" 
                  value={formData.soDt}
                  onChange={(e: any) => setFormData({...formData, soDt: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/80">Loại người dùng</label>
                <select 
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  value={formData.maLoaiNguoiDung}
                  onChange={(e: any) => setFormData({...formData, maLoaiNguoiDung: e.target.value})}
                >
                  <option value="KH">Khách Hàng</option>
                  <option value="QT">Quản Trị</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">Hủy</Button>
                <Button variant="primary" type="submit" isLoading={addMutation.isPending || updateMutation.isPending}>
                  {editingUser ? 'Cập Nhật' : 'Thêm Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
