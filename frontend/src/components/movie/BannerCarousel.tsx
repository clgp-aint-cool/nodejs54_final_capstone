import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Banner } from '../../types/movie';
import { Button } from '../ui/Button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-[600px] bg-dark-lighter flex items-center justify-center">
        <span className="text-white/50">Không có banner nào</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh] md:h-[70vh] lg:h-[85vh] relative group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white/50 w-3 h-3 mx-1 rounded-full inline-block transition-all duration-300',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary w-8'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.maBanner}>
            <div className="relative w-full h-full">
              <img 
                src={banner.hinhAnh} 
                alt={`Banner ${banner.maBanner}`} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1920x1080?text=Banner';
                }}
              />
              {/* Overlays for dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/30 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="max-w-2xl animate-in slide-in-from-bottom-8 duration-700 fade-in zoom-in-95">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider mb-4">
                      PHIM MỚI
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                      {banner.phim?.tenPhim || 'Siêu Phẩm Điện Ảnh'}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-8 line-clamp-3">
                      {banner.phim?.moTa || 'Cùng khám phá những bộ phim bom tấn mới nhất tại CyberCinema với chất lượng tuyệt đỉnh.'}
                    </p>
                    <div className="flex items-center gap-4">
                      <Link to={`/movie/${banner.maPhim}`}>
                        <Button variant="primary" size="lg" className="gap-2">
                          Đặt vé ngay
                        </Button>
                      </Link>
                      {banner.phim?.trailer && (
                        <a href={banner.phim.trailer} target="_blank" rel="noreferrer">
                          <Button variant="outline" size="lg" className="gap-2">
                            <Play size={20} /> Xem Trailer
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
