import { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { movieApi } from '../../api/movieApi';
import { Button } from '../../components/ui';
import { Plus, X, Upload, Edit2, Trash2, Loader2 as Loader } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminBanners = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [maPhim, setMaPhim] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data: banners, isLoading, refetch } = useQuery({
    queryKey: ['adminBanners'],
    queryFn: () => movieApi.getBanners()
  });

  const { data: movies } = useQuery({
    queryKey: ['adminMoviesForBanner'],
    queryFn: () => movieApi.getMovies()
  });

  const addMutation = useMutation({
    mutationFn: movieApi.addBannerUploadImage,
    onSuccess: () => {
      toast.success('Thêm banner thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi thêm banner')
  });

  const updateMutation = useMutation({
    mutationFn: movieApi.updateBannerUploadImage,
    onSuccess: () => {
      toast.success('Cập nhật banner thành công');
      setIsModalOpen(false);
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi cập nhật banner')
  });

  const deleteMutation = useMutation({
    mutationFn: movieApi.deleteBanner,
    onSuccess: () => {
      toast.success('Xóa banner thành công');
      refetch();
    },
    onError: (e: any) => toast.error(e.response?.data?.message || 'Lỗi xóa banner')
  });

  const handleOpenModal = (banner?: any) => {
    setSelectedFile(null);
    if (banner) {
      setEditingBanner(banner);
      setMaPhim(banner.maPhim.toString());
    } else {
      setEditingBanner(null);
      setMaPhim('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner && !selectedFile) {
      toast.error('Vui lòng chọn hình ảnh banner');
      return;
    }
    if (!maPhim) {
      toast.error('Vui lòng chọn phim cho banner');
      return;
    }

    const data = new FormData();
    data.append('maPhim', maPhim);
    if (selectedFile) {
      data.append('file', selectedFile);
    }

    if (editingBanner) {
      data.append('maBanner', editingBanner.maBanner.toString());
      updateMutation.mutate(data);
    } else {
      addMutation.mutate(data);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader className="w-10 h-10 text-primary" /></div>;

  return (
    <div className="animate-in fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Quản lý Banner</h1>
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus size={20} className="mr-2" /> Thêm Banner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {banners?.map((banner) => (
          <div key={banner.maBanner} className="bg-dark-card rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={banner.hinhAnh} 
                alt={`Banner ${banner.maBanner}`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                  {banner.phim?.tenPhim || 'Không rõ tên phim'}
                </h3>
                <span className="text-primary text-sm font-bold bg-primary/20 px-2 py-1 rounded border border-primary/30">
                  Mã Phim: {banner.maPhim}
                </span>
                
                <div className="flex gap-2 mt-3">
                  <button 
                    onClick={() => handleOpenModal(banner)}
                    className="flex-1 py-1.5 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    <Edit2 size={16} className="mr-1" /> Sửa
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('Bạn có chắc muốn xóa banner này?')) {
                        deleteMutation.mutate(banner.maBanner);
                      }
                    }}
                    className="flex-1 py-1.5 rounded bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={16} className="mr-1" /> Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-dark-card border border-white/10 rounded-xl p-6 w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingBanner ? 'Cập Nhật Banner' : 'Thêm Banner Mới'}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/80">Chọn Phim</label>
                <select 
                  className="w-full bg-dark-lighter border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none"
                  value={maPhim}
                  onChange={e => setMaPhim(e.target.value)}
                  required
                >
                  <option value="" disabled>-- Chọn Phim --</option>
                  {movies?.map(movie => (
                    <option key={movie.maPhim} value={movie.maPhim}>
                      {movie.maPhim} - {movie.tenPhim}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-white/80 mb-2 block">Hình Ảnh Banner</label>
                <div className="flex flex-col gap-4">
                  {(selectedFile || editingBanner) && (
                    <img 
                      src={selectedFile ? URL.createObjectURL(selectedFile) : editingBanner?.hinhAnh} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border border-white/10"
                    />
                  )}
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
                    className="w-full justify-center h-20 border-dashed border-2 hover:border-primary/50"
                  >
                    <Upload size={24} className="mr-2" /> 
                    {selectedFile ? selectedFile.name : 'Chọn Hình Ảnh Tải Lên'}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)} type="button">Hủy</Button>
                <Button variant="primary" type="submit" isLoading={addMutation.isPending || updateMutation.isPending}>
                  {editingBanner ? 'Cập Nhật' : 'Thêm Mới'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
