import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { bookingApi } from '../../api/bookingApi';
import { useBookingStore } from '../../store/bookingStore';
import { SeatMap } from '../../components/booking/SeatMap';
import { Button, Loader } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat, clearSeats } = useBookingStore();

  const maLichChieu = Number(id);

  const { data: roomInfo, isLoading, refetch } = useQuery({
    queryKey: ['ticketRoom', maLichChieu],
    queryFn: () => bookingApi.getDanhSachPhongVe(maLichChieu),
    enabled: !!maLichChieu
  });

  const bookTicketsMutation = useMutation({
    mutationFn: bookingApi.datVe,
    onSuccess: () => {
      toast.success('Đặt vé thành công!');
      clearSeats();
      refetch();
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt vé.');
    }
  });

  useEffect(() => {
    return () => {
      clearSeats();
    };
  }, [clearSeats]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader className="w-12 h-12 text-primary" />
      </div>
    );
  }

  if (!roomInfo) {
    return <div className="text-center py-20 text-white/50">Không tìm thấy thông tin phòng vé</div>;
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 ghế');
      return;
    }
    
    bookTicketsMutation.mutate({
      maLichChieu,
      danhSachVe: selectedSeats.map(s => ({ maGhe: s.maGhe, giaVe: s.giaVe }))
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Seat Map Section */}
        <div className="lg:col-span-2 glass-card p-6 border-t-4 border-t-primary">
          <SeatMap 
            seats={roomInfo.danhSachGhe || []} 
            selectedSeats={selectedSeats}
            onSeatSelect={toggleSeat}
          />
        </div>

        {/* Booking Summary Section */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-center text-primary mb-6 border-b border-white/10 pb-4">
              {totalPrice.toLocaleString()} đ
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Cụm rạp:</span>
                <span className="font-medium text-right">{roomInfo.thongTinPhim.tenCumRap}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Rạp:</span>
                <span className="font-medium text-right">{roomInfo.thongTinPhim.tenRap}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Phim:</span>
                <span className="font-bold text-right">{roomInfo.thongTinPhim.tenPhim}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-white/60">Suất chiếu:</span>
                <span className="font-medium text-right">
                  {new Date(roomInfo.thongTinPhim.ngayChieu).toLocaleString('vi-VN')}
                </span>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-white/60 mb-1">Ghế chọn:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.length > 0 ? (
                    selectedSeats.map(seat => (
                      <span key={seat.maGhe} className="bg-primary/20 text-primary border border-primary/30 px-2 py-1 rounded text-sm font-bold">
                        {seat.tenGhe}
                      </span>
                    ))
                  ) : (
                    <span className="text-white/40 italic">Chưa chọn ghế</span>
                  )}
                </div>
              </div>
            </div>

            <Button 
              variant="primary" 
              className="w-full h-12 text-lg"
              onClick={handleBooking}
              isLoading={bookTicketsMutation.isPending}
              disabled={selectedSeats.length === 0}
            >
              ĐẶT VÉ
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
