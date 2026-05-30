import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { movieApi } from '../../api/movieApi';
import { cinemaApi } from '../../api/cinemaApi';
import { Button, Input } from '../../components/ui';
import { Loader2 as Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminShowtimes = () => {
  const [formData, setFormData] = useState({
    maPhim: '',
    ngayChieuGioChieu: '',
    maRap: '',
    giaVe: 75000
  });
  const [maHeThongRap, setMaHeThongRap] = useState('');
  const [maCumRap, setMaCumRap] = useState('');

  const { data: movies, isLoading: loadingMovies } = useQuery({
    queryKey: ['adminMoviesForShowtimes'],
    queryFn: () => movieApi.getMovies()
  });

  const { data: heThongRap, isLoading: loadingHTR } = useQuery({
    queryKey: ['heThongRap'],
    queryFn: () => cinemaApi.getHeThongRap()
  });

  const { data: cumRapList } = useQuery({
    queryKey: ['cumRap', maHeThongRap],
    queryFn: () => cinemaApi.getCumRapTheoHeThong(maHeThongRap),
    enabled: !!maHeThongRap
  });

  const { data: currentShowtimes, isLoading: loadingShowtimes, refetch: refetchShowtimes } = useQuery({
    queryKey: ['showtimes', formData.maPhim],
    queryFn: () => cinemaApi.getLichChieuPhim(Number(formData.maPhim)),
    enabled: !!formData.maPhim
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => cinemaApi.createShowtime(data),
    onSuccess: () => {
      toast.success('Tạo lịch chiếu thành công');
      setFormData({
        ...formData,
        ngayChieuGioChieu: '',
        maRap: '',
        giaVe: 75000
      });
      setMaHeThongRap('');
      setMaCumRap('');
      refetchShowtimes();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi tạo lịch chiếu')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      maPhim: Number(formData.maPhim),
      giaVe: Number(formData.giaVe)
    };

    addMutation.mutate(data);
  };

  const activeCumRap = cumRapList?.find((c: any) => c.maCumRap === maCumRap);

  if (loadingMovies || loadingHTR) return <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary" /></div>;

  return (
    <div className="animate-in fade-in max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Quản lý Lịch Chiếu</h1>
        <p className="text-white/60 mt-2">Lên lịch và xem các suất chiếu phim cho các cụm rạp trong hệ thống.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1 bg-dark-card rounded-xl border border-white/10 overflow-hidden shadow-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-white mb-6">Tạo Lịch Chiếu Mới</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/80">Chọn Phim</label>
              <select
                className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                value={formData.maPhim}
                onChange={e => setFormData({ ...formData, maPhim: e.target.value })}
                required
              >
                <option value="" disabled>-- Chọn Phim --</option>
                {movies?.map(movie => (
                  <option key={movie.maPhim} value={movie.maPhim}>
                    {movie.tenPhim}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/80">Hệ Thống Rạp</label>
                <select
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  value={maHeThongRap}
                  onChange={e => {
                    setMaHeThongRap(e.target.value);
                    setMaCumRap('');
                    setFormData({ ...formData, maRap: '' });
                  }}
                  required
                >
                  <option value="" disabled>-- Chọn Hệ Thống Rạp --</option>
                  {heThongRap?.map((htr: any) => (
                    <option key={htr.maHeThongRap} value={htr.maHeThongRap}>
                      {htr.tenHeThongRap}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/80">Cụm Rạp</label>
                <select
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  value={maCumRap}
                  onChange={e => {
                    setMaCumRap(e.target.value);
                    setFormData({ ...formData, maRap: '' });
                  }}
                  disabled={!maHeThongRap}
                  required
                >
                  <option value="" disabled>-- Chọn Cụm Rạp --</option>
                  {cumRapList?.map((cum: any) => (
                    <option key={cum.maCumRap} value={cum.maCumRap}>
                      {cum.tenCumRap}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/80">Rạp (Phòng chiếu)</label>
              <select
                className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                value={formData.maRap}
                onChange={e => setFormData({ ...formData, maRap: e.target.value })}
                disabled={!maCumRap}
                required
              >
                <option value="" disabled>-- Chọn Rạp --</option>
                {activeCumRap?.rap?.map((rap: any) => (
                  <option key={rap.maRap} value={rap.maRap}>
                    {rap.tenRap}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Ngày & Giờ Chiếu"
                name="ngayChieuGioChieu"
                type="datetime-local"
                value={formData.ngayChieuGioChieu}
                onChange={(e: any) => setFormData({ ...formData, ngayChieuGioChieu: e.target.value })}
                required
              />
              <Input
                label="Giá Vé (VND)"
                name="giaVe"
                type="number"
                min="75000"
                max="200000"
                step="5000"
                value={formData.giaVe}
                onChange={(e: any) => setFormData({ ...formData, giaVe: Number(e.target.value) })}
                required
              />
            </div>

            <div className="mt-4 flex justify-end">
              <Button type="submit" variant="primary" isLoading={addMutation.isPending} className="w-full">
                Tạo Lịch Chiếu
              </Button>
            </div>
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 bg-dark-card rounded-xl border border-white/10 overflow-hidden shadow-2xl p-6 flex flex-col h-fit max-h-[80vh]">
          <h2 className="text-xl font-bold text-white mb-6">
            Danh sách Lịch Chiếu {movies?.find(m => m.maPhim.toString() === formData.maPhim) ? `- ${movies?.find(m => m.maPhim.toString() === formData.maPhim)?.tenPhim}` : ''}
          </h2>

          {!formData.maPhim ? (
            <div className="flex-1 flex items-center justify-center text-white/50 py-20 text-center">
              Vui lòng chọn một bộ phim để xem danh sách lịch chiếu
            </div>
          ) : loadingShowtimes ? (
            <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary animate-spin" /></div>
          ) : currentShowtimes?.heThongRapChieu && currentShowtimes.heThongRapChieu.length > 0 ? (
            <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
              <div className="flex flex-col gap-4">
                {currentShowtimes.heThongRapChieu.map((htr: any) => (
                  <div key={htr.maHeThongRap} className="bg-dark-lighter/50 rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      {htr.logo && <img src={htr.logo} alt={htr.tenHeThongRap} className="w-8 h-8 rounded-full bg-white" />}
                      <h3 className="font-bold text-white text-lg">{htr.tenHeThongRap}</h3>
                    </div>

                    <div className="flex flex-col gap-4">
                      {htr.cumRap?.map((cr: any) => (
                        <div key={cr.maCumRap} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="text-sm text-white/80 font-bold mb-3">{cr.tenCumRap}</div>
                          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                            {cr.lichChieuPhim?.map((st: any) => (
                              <div key={st.maLichChieu} className="bg-dark p-2 rounded border border-white/5 hover:border-primary/50 transition-colors flex flex-col items-center justify-center">
                                <span className="text-xs text-white/50 mb-1">{st.tenRap}</span>
                                <span className="text-primary font-bold text-sm">
                                  {new Date(st.ngayChieuGioChieu).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className="text-xs text-white/40 mt-1">
                                  {new Date(st.ngayChieuGioChieu).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-white/50 py-20">
              Chưa có lịch chiếu nào cho phim này
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
