import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '../../api/movieApi';
import { BannerCarousel } from '../../components/movie/BannerCarousel';
import { MovieCard } from '../../components/movie/MovieCard';
import { Loader } from '../../components/ui/Button';

export const Home = () => {
  const [filter, setFilter] = useState<'dangChieu' | 'sapChieu'>('dangChieu');

  const { data: banners, isLoading: isBannersLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: movieApi.getBanners
  });

  const { data: movies, isLoading: isMoviesLoading } = useQuery({
    queryKey: ['movies'],
    queryFn: () => movieApi.getMovies()
  });

  // Filter movies
  const filteredMovies = movies?.filter(m => {
    if (filter === 'dangChieu') return m.dangChieu;
    if (filter === 'sapChieu') return m.sapChieu;
    return true;
  }) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      {isBannersLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center bg-dark-lighter">
          <Loader className="w-12 h-12 text-primary" />
        </div>
      ) : (
        <BannerCarousel banners={banners || []} />
      )}

      {/* Movies Section */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider relative">
            Phim Hot
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h2>
          
          <div className="flex items-center p-1 bg-dark-lighter rounded-lg border border-white/10">
            <button
              onClick={() => setFilter('dangChieu')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'dangChieu' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Đang Chiếu
            </button>
            <button
              onClick={() => setFilter('sapChieu')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'sapChieu' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Sắp Chiếu
            </button>
          </div>
        </div>

        {isMoviesLoading ? (
          <div className="flex justify-center py-20">
            <Loader className="w-10 h-10 text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.maPhim} movie={movie} />
            ))}
            {filteredMovies.length === 0 && (
              <div className="col-span-full py-20 text-center text-white/50">
                Không tìm thấy phim nào.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
