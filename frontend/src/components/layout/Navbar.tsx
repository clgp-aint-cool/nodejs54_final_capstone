import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, User, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="text-primary w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold text-white tracking-wider">
              CLGP's <span className="text-primary">Theater</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors font-medium">Lịch Chiếu</Link>
            <Link to="/cinemas" className="text-white/80 hover:text-white transition-colors font-medium">Cụm Rạp</Link>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 group relative">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
                      <User size={20} />
                    </div>
                    <div className="hidden md:flex flex-col">
                      <Link to="/profile" className="text-white font-medium group-hover:text-primary transition-colors">
                        Xin chào, {user.hoTen}
                      </Link>
                      {user.maLoaiNguoiDung === 'QT' && (
                        <Link to="/admin" className="text-xs font-bold text-primary hover:text-white transition-colors">
                          Quản lý Admin
                        </Link>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10"
                  >
                    <LogOut size={18} />
                    <span className="hidden md:block">Đăng xuất</span>
                  </button>
                </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => navigate('/login')}>Đăng nhập</Button>
                <Button variant="primary" onClick={() => navigate('/register')}>Đăng ký</Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-card border-t border-white/10 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-white/80 hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>Lịch Chiếu</Link>
            <Link to="/cinemas" className="text-white/80 hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>Cụm Rạp</Link>
            
            <div className="h-px bg-white/10 my-2" />
            
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-white p-2">
                    <User size={20} className="text-primary" />
                    <span>{user.hoTen}</span>
                  </div>
                  {user.maLoaiNguoiDung === 'QT' && (
                    <Link to="/admin" className="text-primary text-sm font-bold pl-8 pb-2" onClick={() => setIsMobileMenuOpen(false)}>
                      ➜ Vào trang Quản lý Admin
                    </Link>
                  )}
                </div>
                <Button variant="secondary" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" /> Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}>Đăng nhập</Button>
                <Button variant="primary" className="w-full justify-start" onClick={() => { navigate('/register'); setIsMobileMenuOpen(false); }}>Đăng ký</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
