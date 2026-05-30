import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { movieApi } from '../../api/movieApi';
import { Button, Input } from '../../components/ui';
import { Trash2, Edit2, Plus, X, Upload, Loader2 as Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { format } from 'date-fns';

export const AdminMovies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    maPhim: 0,
    tenPhim: '',
    biDanh: '',
    trailer: '',
    moTa: '',
    ngayKhoiChieu: '',
    danhGia: 10,
    hot: false,
    dangChieu: true,
    sapChieu: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: movies, isLoading, refetch } = useQuery({
    queryKey: ['adminMovies'],
    queryFn: () => movieApi.getMovies()
  });

  const addMutation = useMutation({
    mutationFn: movieApi.addMovieUploadImage,
    onSuccess: () => {
      toast.success('Thêm phim thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi thêm phim')
  });

  const updateMutation = useMutation({
    mutationFn: movieApi.updateMovieUploadImage,
    onSuccess: () => {
      toast.success('Cập nhật phim thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi cập nhật phim')
  });

  const deleteMutation = useMutation({
    mutationFn: movieApi.deleteMovie,
    onSuccess: () => {
      toast.success('Xóa phim thành công');
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi xóa phim')
  });

  const handleOpenModal = (movie?: Movie) => {
    setSelectedFile(null);
    if (movie) {
      setEditingMovie(movie);
      setFormData({
        maPhim: movie.maPhim,
        tenPhim: movie.tenPhim || '',
        biDanh: movie.biDanh || '',
        trailer: movie.trailer || '',
        moTa: movie.moTa || '',
        ngayKhoiChieu: format(new Date(movie.ngayKhoiChieu || new Date()), 'yyyy-MM-dd'),
        danhGia: movie.danhGia || 10,
        hot: movie.hot || false,
        dangChieu: movie.dangChieu || false,
        sapChieu: movie.sapChieu || false
      });
    } else {
      setEditingMovie(null);
      setFormData({
        maPhim: 0, tenPhim: '', biDanh: '', trailer: '', moTa: '', 
        ngayKhoiChieu: format(new Date(), 'yyyy-MM-dd'), danhGia: 10, 
        hot: false, dangChieu: true, sapChieu: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('tenPhim', formData.tenPhim);
    data.append('biDanh', formData.biDanh);
    data.append('trailer', formData.trailer);
    data.append('moTa', formData.moTa);
    data.append('ngayKhoiChieu', formData.ngayKhoiChieu);
    data.append('danhGia', formData.danhGia.toString());
    data.append('hot', formData.hot.toString());
    data.append('dangChieu', formData.dangChieu.toString());
    data.append('sapChieu', formData.sapChieu.toString());
    data.append('maNhom', 'GP01');

    if (selectedFile) {
      data.append('file', selectedFile);
    }

    if (editingMovie) {
      data.append('maPhim', formData.maPhim.toString());
      updateMutation.mutate(data);
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary" /></div>;

  return (
    <div className="animate-in fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Quản lý Phim</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" /> Thêm Phim
        </Button>
      </div>

      <div className="bg-dark-card rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/80">
                <th className="p-4 font-medium">Mã Phim</th>
                <th className="p-4 font-medium">Hình Ảnh</th>
                <th className="p-4 font-medium">Tên Phim</th>
                <th className="p-4 font-medium">Mô Tả</th>
                <th className="p-4 font-medium text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {movies?.map((movie) => (
                <tr key={movie.maPhim} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white/70">{movie.maPhim}</td>
                  <td className="p-4">
                    <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-16 h-20 object-cover rounded" />
                  </td>
                  <td className="p-4 font-bold text-white">{movie.tenPhim}</td>
                  <td className="p-4 text-white/70 text-sm max-w-xs truncate">{movie.moTa}</td>
                  <td className="p-4 flex gap-2 justify-end items-center h-28">
                    <button 
                      onClick={() => handleOpenModal(movie)}
                      className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Bạn có chắc muốn xóa phim này?')) {
                          deleteMutation.mutate(movie.maPhim);
                        }
                      }}
                      className="w-8 h-8 rounded bg-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-dark-card border border-white/10 rounded-xl p-6 w-full max-w-2xl relative z-10 shadow-2xl animate-in zoom-in-95 my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingMovie ? 'Cập Nhật Phim' : 'Thêm Phim Mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Tên Phim" 
                  name="tenPhim" 
                  value={formData.tenPhim}
                  onChange={(e: any) => setFormData({...formData, tenPhim: e.target.value})}
                  required
                />
                <Input 
                  label="Bí Danh" 
                  name="biDanh" 
                  value={formData.biDanh}
                  onChange={(e: any) => setFormData({...formData, biDanh: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Trailer URL" 
                  name="trailer" 
                  value={formData.trailer}
                  onChange={(e: any) => setFormData({...formData, trailer: e.target.value})}
                />
                <Input 
                  label="Ngày Khởi Chiếu" 
                  name="ngayKhoiChieu" 
                  type="date"
                  value={formData.ngayKhoiChieu}
                  onChange={(e: any) => setFormData({...formData, ngayKhoiChieu: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/80">Mô Tả</label>
                <textarea 
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors min-h-[100px]"
                  value={formData.moTa}
                  onChange={(e: any) => setFormData({...formData, moTa: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input type="checkbox" checked={formData.hot} onChange={(e: any) => setFormData({...formData, hot: e.target.checked})} className="accent-primary w-4 h-4" />
                  Phim Hot
                </label>
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input type="checkbox" checked={formData.dangChieu} onChange={(e: any) => setFormData({...formData, dangChieu: e.target.checked})} className="accent-primary w-4 h-4" />
                  Đang Chiếu
                </label>
                <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                  <input type="checkbox" checked={formData.sapChieu} onChange={(e: any) => setFormData({...formData, sapChieu: e.target.checked})} className="accent-primary w-4 h-4" />
                  Sắp Chiếu
                </label>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-sm">Đánh giá:</span>
                  <input type="number" min="0" max="10" value={formData.danhGia} onChange={(e: any) => setFormData({...formData, danhGia: Number(e.target.value)})} className="w-16 bg-dark-lighter border border-white/10 rounded px-2 py-1 text-white" />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-white/80 mb-2 block">Hình Ảnh Phim</label>
                <div className="flex items-center gap-4">
                  {(selectedFile || editingMovie) && (
                    <img 
                      src={selectedFile ? URL.createObjectURL(selectedFile) : editingMovie?.hinhAnh} 
                      alt="Preview" 
                      className="w-24 h-32 object-cover rounded-lg border border-white/10"
                    />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={fileInputRef}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full justify-center h-32 border-dashed border-2 hover:border-primary/50"
                    >
                      <Upload size={24} className="mr-2" /> 
                      {selectedFile ? selectedFile.name : 'Chọn Hình Ảnh Tải Lên (Local Multer)'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">Hủy</Button>
                <Button variant="primary" type="submit" isLoading={addMutation.isPending || updateMutation.isPending}>
                  {editingMovie ? 'Cập Nhật' : 'Thêm Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
