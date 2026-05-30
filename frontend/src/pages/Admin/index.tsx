import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Film, Image as ImageIcon, Calendar, LogOut, Home } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { AdminUsers } from './AdminUsers';
import { AdminMovies } from './AdminMovies';
import { AdminBanners } from './AdminBanners';
import { AdminShowtimes } from './AdminShowtimes';

export const Admin = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const menuItems = [
    { path: '/admin', icon: Users, label: 'Người Dùng' },
    { path: '/admin/movies', icon: Film, label: 'Phim' },
    { path: '/admin/banners', icon: ImageIcon, label: 'Banner' },
    { path: '/admin/showtimes', icon: Calendar, label: 'Lịch Chiếu' },
  ];

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-dark-card border-r border-white/10 flex flex-col">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Film className="text-primary w-8 h-8" />
            <span className="text-xl font-bold text-white tracking-wider">
              CYBER<span className="text-primary">ADMIN</span>
            </span>
          </Link>
          <div className="text-sm text-white/50 mb-6">Xin chào, <span className="font-bold text-white">{user?.hoTen}</span></div>
          
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-6 flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-all">
            <Home size={20} />
            <span className="font-medium">Trang Khách</span>
          </Link>
          <button 
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-all w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-dark p-8 custom-scrollbar">
        <Routes>
          <Route index element={<AdminUsers />} />
          <Route path="movies" element={<AdminMovies />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="showtimes" element={<AdminShowtimes />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
