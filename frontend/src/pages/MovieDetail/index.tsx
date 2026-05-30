import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/movieApi';
import { cinemaApi } from '../../api/cinemaApi';
import { Loader } from '../../components/ui/Button';
import { Calendar, Star, Play } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CinemaTree } from '../../components/cinema/CinemaTree';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading: isMovieLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieApi.getMovieDetail(Number(id)),
    enabled: !!id
  });

  const { data: showtimes, isLoading: isShowtimesLoading } = useQuery({
    queryKey: ['showtimes', id],
    queryFn: () => cinemaApi.getLichChieuPhim(Number(id)),
    enabled: !!id
  });

  if (isMovieLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader className="w-12 h-12 text-primary" />
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-20 text-white/50">Không tìm thấy phim</div>;
  }

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0">
          <img 
            src={movie.hinhAnh} 
            alt={movie.tenPhim}
            className="w-full h-full object-cover blur-sm opacity-50"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1920x1080?text=Banner';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 absolute inset-0 flex items-center">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end w-full translate-y-1/4 md:translate-y-1/3 z-10">
            {/* Poster */}
            <div className="relative w-48 md:w-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/10 group">
              <img 
                src={movie.hinhAnh} 
                alt={movie.tenPhim}
                className="w-full h-auto"
              />
              {movie.trailer && (
                <a href={movie.trailer} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform shadow-lg shadow-primary/50">
                    <Play className="ml-1 w-6 h-6" fill="currentColor" />
                  </div>
                </a>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                {movie.tenPhim}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{movie.ngayKhoiChieu ? format(new Date(movie.ngayKhoiChieu), 'dd MMMM yyyy', { locale: vi }) : 'Sắp ra mắt'}</span>
                </div>
                {movie.danhGia !== null && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-white">{movie.danhGia}/10</span>
                  </div>
                )}
                {movie.hot && (
                  <span className="bg-primary px-3 py-1 rounded text-white text-xs font-bold tracking-wider">HOT</span>
                )}
              </div>
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold text-white mb-2">Nội Dung</h3>
                <p className="text-white/70 leading-relaxed line-clamp-4 md:line-clamp-none">
                  {movie.moTa}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to account for the overlapping hero section */}
      <div className="h-40 md:h-64" />

      {/* Showtimes Section */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-white mb-8 relative inline-block">
          Lịch Chiếu
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
        </h2>

        {isShowtimesLoading ? (
          <div className="flex justify-center py-10">
            <Loader className="w-10 h-10 text-primary" />
          </div>
        ) : (
          <CinemaTree cinemaSystems={showtimes?.heThongRapChieu || []} />
        )}
      </div>
    </div>
  );
};
