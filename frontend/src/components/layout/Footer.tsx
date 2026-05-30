
import { Film } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-white/10 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Film className="text-primary w-8 h-8" />
              <span className="text-2xl font-bold text-white tracking-wider">
                CYBER<span className="text-primary">CINEMA</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Hệ thống đặt vé xem phim trực tuyến hàng đầu. Trải nghiệm điện ảnh tuyệt vời nhất với hàng ngàn bộ phim bom tấn cập nhật mỗi ngày.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                IN
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors text-sm font-bold">
                YT
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Chính Sách</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Điều khoản chung</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Chính sách thanh toán</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Đối Tác</h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Partner Logos place-holders */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-white/50">P{i}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Chăm Sóc Khách Hàng</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li>Hotline: <span className="text-primary font-bold">1900 1234</span></li>
              <li>Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm Lễ Tết)</li>
              <li>Email hỗ trợ: <a href="mailto:support@cybercinema.vn" className="hover:text-primary transition-colors">support@cybercinema.vn</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} CyberCinema. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
