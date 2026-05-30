import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cinemaApi } from '../../api/cinemaApi';
import { Loader } from '../../components/ui/Button';
import { CinemaTree } from '../../components/cinema/CinemaTree';

export const Cinemas = () => {
  const [activeSystem, setActiveSystem] = useState<string>('');

  const { data: systems, isLoading: isSystemsLoading } = useQuery({
    queryKey: ['cinemaSystems'],
    queryFn: cinemaApi.getHeThongRap
  });

  // Once systems load, set the first one as active
  if (systems && systems.length > 0 && !activeSystem) {
    setActiveSystem(systems[0].maHeThongRap);
  }

  const { data: systemDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['cinemaSystemDetails', activeSystem],
    queryFn: () => cinemaApi.getLichChieuHeThongRap(activeSystem),
    enabled: !!activeSystem
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-wider relative">
          Hệ Thống Cụm Rạp
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
        </h1>
        <p className="text-white/60 text-center max-w-2xl">
          Khám phá lịch chiếu và thông tin chi tiết của tất cả các cụm rạp trên toàn quốc. Đặt vé ngay hôm nay để nhận ưu đãi hấp dẫn.
        </p>
      </div>

      {isSystemsLoading ? (
        <div className="flex justify-center py-20">
          <Loader className="w-12 h-12 text-primary" />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Logo Selection Row */}
          <div className="flex flex-wrap justify-center gap-6 glass-card p-6 border-b border-white/5">
            {systems?.map(sys => (
              <button
                key={sys.maHeThongRap}
                onClick={() => setActiveSystem(sys.maHeThongRap)}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeSystem === sys.maHeThongRap 
                    ? 'ring-4 ring-primary ring-offset-4 ring-offset-dark scale-110 shadow-lg shadow-primary/30' 
                    : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img 
                  src={sys.logo || ''} 
                  alt={sys.tenHeThongRap} 
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </button>
            ))}
          </div>

          {/* Details Tree */}
          {isDetailsLoading ? (
            <div className="flex justify-center py-20">
              <Loader className="w-10 h-10 text-primary" />
            </div>
          ) : (
            <div className="glass-card shadow-2xl overflow-hidden border border-white/10">
              <CinemaTree cinemaSystems={systemDetails || []} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cinemas;
