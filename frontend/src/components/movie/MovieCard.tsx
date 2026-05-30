import React from 'react';
import { Play, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/movie';
import { Button } from '../ui/Button';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative rounded-xl overflow-hidden glass-card transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/20">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={movie.hinhAnh} 
          alt={movie.tenPhim}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=No+Image';
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
        
        {/* Rating badge */}
        {movie.danhGia !== null && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-lg px-2 py-1 border border-white/10 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-white text-xs font-bold">{movie.danhGia}/10</span>
          </div>
        )}

        {/* Play Trailer button (Hover state) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-primary/40 hover:bg-primary">
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-bold text-lg line-clamp-1 mb-1">{movie.tenPhim}</h3>
        
        <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
          <Calendar className="w-4 h-4" />
          <span>{movie.ngayKhoiChieu ? new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN') : 'Sắp ra mắt'}</span>
        </div>

        <Link to={`/movie/${movie.maPhim}`} className="block w-full">
          <Button variant="primary" className="w-full h-10 shadow-none">
            Đặt vé ngay
          </Button>
        </Link>
      </div>
    </div>
  );
};
