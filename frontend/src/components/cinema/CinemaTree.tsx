import React, { useState } from 'react';
import type { CinemaSystem } from '../../types/cinema';
import { format } from 'date-fns';

import { Link } from 'react-router-dom';

interface CinemaTreeProps {
  cinemaSystems: CinemaSystem[];
}

export const CinemaTree: React.FC<CinemaTreeProps> = ({ cinemaSystems }) => {
  const [activeSystem, setActiveSystem] = useState<string>('');

  // Sync activeSystem when cinemaSystems changes
  React.useEffect(() => {
    if (cinemaSystems && cinemaSystems.length > 0) {
      // If current active system is not in the new list, pick the first one
      const exists = cinemaSystems.some(s => s.maHeThongRap === activeSystem);
      if (!exists) {
        setActiveSystem(cinemaSystems[0].maHeThongRap);
      }
    }
  }, [cinemaSystems, activeSystem]);

  const selectedSystem = cinemaSystems.find(s => s.maHeThongRap === activeSystem) || cinemaSystems[0];

  if (!cinemaSystems || cinemaSystems.length === 0) {
    return <div className="text-white/50 text-center py-10">Không có lịch chiếu.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 glass-card p-4 h-[600px]">
      {/* System Tabs */}
      <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-32 flex-shrink-0 gap-2 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4 custom-scrollbar">
        {cinemaSystems.map(sys => (
          <button
            key={sys.maHeThongRap}
            onClick={() => setActiveSystem(sys.maHeThongRap)}
            className={`w-16 h-16 rounded-full flex-shrink-0 mx-auto transition-all duration-300 ${
              activeSystem === sys.maHeThongRap 
                ? 'opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-dark scale-110' 
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img 
              src={sys.logo || `https://via.placeholder.com/150?text=${sys.tenHeThongRap}`} 
              alt={sys.tenHeThongRap} 
              className="w-full h-full object-cover rounded-full bg-white"
            />
          </button>
        ))}
      </div>

      {/* Clusters and Showtimes */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {selectedSystem?.cumRap?.map((cluster) => (
          <div key={cluster.maCumRap} className="mb-6 bg-dark-lighter/50 rounded-lg p-4 border border-white/5">
            <h3 className="text-white font-bold text-lg mb-1">{cluster.tenCumRap}</h3>
            <p className="text-white/50 text-sm mb-4 truncate">{cluster.diaChi}</p>
            
            {cluster.lichChieuPhim && cluster.lichChieuPhim.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {cluster.lichChieuPhim.map(show => (
                  <Link 
                    key={show.maLichChieu} 
                    to={`/booking/${show.maLichChieu}`}
                    className="bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 text-primary hover:text-white rounded px-3 py-2 text-center transition-colors flex flex-col items-center justify-center"
                  >
                    <span className="font-bold text-lg">
                      {format(new Date(show.ngayChieuGioChieu), 'HH:mm')}
                    </span>
                    <span className="text-xs text-white/50">
                      {format(new Date(show.ngayChieuGioChieu), 'dd/MM')}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-sm italic">Không có suất chiếu</p>
            )}
          </div>
        ))}
        {(!selectedSystem?.cumRap || selectedSystem.cumRap.length === 0) && (
          <div className="text-white/50 text-center py-10">Không có rạp nào.</div>
        )}
      </div>
    </div>
  );
};
