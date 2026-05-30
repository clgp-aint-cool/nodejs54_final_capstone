import React, { useMemo } from 'react';
import type { Seat } from '../../types/booking';
import { cn } from '../../utils/cn';
import { User, X } from 'lucide-react';

interface SeatMapProps {
  seats: Seat[];
  selectedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ seats, selectedSeats, onSeatSelect }) => {
  // Group seats by row (assuming tenGhe is like A01, A02)
  const seatRows = useMemo(() => {
    const rows: { [key: string]: Seat[] } = {};
    seats.forEach(seat => {
      const row = seat.tenGhe.charAt(0);
      if (!rows[row]) rows[row] = [];
      rows[row].push(seat);
    });
    // Sort rows alphabetically
    return Object.keys(rows).sort().map(key => ({
      row: key,
      seats: rows[key].sort((a, b) => a.tenGhe.localeCompare(b.tenGhe, undefined, { numeric: true }))
    }));
  }, [seats]);

  const isSelected = (seat: Seat) => selectedSeats.some(s => s.maGhe === seat.maGhe);

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[800px] flex flex-col items-center">
        {/* Screen */}
        <div className="w-4/5 h-12 border-b-[8px] border-white/20 rounded-[50%] mb-12 relative flex items-end justify-center shadow-[0_10px_20px_rgba(255,255,255,0.05)]">
          <span className="text-white/40 font-bold tracking-[1em] mb-2 text-sm uppercase">Màn Hình</span>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col gap-2">
          {seatRows.map(({ row, seats }) => (
            <div key={row} className="flex items-center justify-center gap-2">
              <div className="w-6 text-center text-white/50 font-bold">{row}</div>
              <div className="flex gap-2">
                {seats.map(seat => {
                  const selected = isSelected(seat);
                  const isVip = seat.loaiGhe === 'Vip';
                  
                  return (
                    <button
                      key={seat.maGhe}
                      disabled={seat.daDat}
                      onClick={() => onSeatSelect(seat)}
                      className={cn(
                        "w-8 h-8 rounded-t-lg rounded-b-sm flex items-center justify-center text-xs font-bold transition-all duration-200 group relative",
                        {
                          // Booked
                          "bg-white/10 text-white/20 cursor-not-allowed": seat.daDat,
                          // Selected
                          "bg-primary text-white shadow-[0_0_10px_rgba(229,9,20,0.5)] transform scale-110": selected,
                          // VIP Available
                          "bg-yellow-500/80 hover:bg-yellow-500 text-white": !seat.daDat && !selected && isVip,
                          // Normal Available
                          "bg-white/30 hover:bg-white/50 text-white": !seat.daDat && !selected && !isVip,
                        }
                      )}
                      title={`${seat.tenGhe} - ${seat.loaiGhe} - ${seat.giaVe?.toLocaleString()}đ`}
                    >
                      {seat.daDat ? <X size={14} /> : selected ? <User size={14} /> : seat.tenGhe.substring(1)}
                    </button>
                  );
                })}
              </div>
              <div className="w-6 text-center text-white/50 font-bold">{row}</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 bg-dark-lighter/50 px-6 py-4 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/30 rounded-t-lg rounded-b-sm" />
            <span className="text-white/80 text-sm">Ghế thường</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500/80 rounded-t-lg rounded-b-sm" />
            <span className="text-white/80 text-sm">Ghế VIP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary shadow-[0_0_10px_rgba(229,9,20,0.5)] rounded-t-lg rounded-b-sm" />
            <span className="text-white/80 text-sm">Ghế đang chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 flex items-center justify-center rounded-t-lg rounded-b-sm">
              <X size={14} className="text-white/20" />
            </div>
            <span className="text-white/80 text-sm">Ghế đã đặt</span>
          </div>
        </div>
      </div>
    </div>
  );
};
