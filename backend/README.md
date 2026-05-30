# CLGP's Theater - Backend API (Cinema API)

Hệ thống Backend cung cấp các API cho dự án Đặt vé xem phim (CLGP's Theater). Được xây dựng dựa trên kiến trúc chuẩn MVC, đảm bảo tính bảo mật, hiệu suất và dễ dàng mở rộng.

## 🛠 Tech Stack (Công Nghệ Sử Dụng)

- **Runtime Environment:** Node.js
- **Web Framework:** Express.js
- **Database:** MySQL
- **ORM (Object-Relational Mapping):** Prisma ORM
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs (Mã hóa mật khẩu)
- **File Uploads:** Multer (Quản lý hình ảnh Phim, Banner, Logo)
- **CORS:** Kích hoạt để giao tiếp với Frontend dễ dàng
- **API Documentation & Testing:** Postman (Kèm file Collection)

## 📂 Cấu Trúc Thư Mục (Architecture)

```text
backend/
├── prisma/                 # Cấu hình CSDL và Schema Prisma
│   └── schema.prisma       # Định nghĩa các Model (Bảng) trong MySQL
├── src/
│   ├── config/             # Cấu hình hệ thống (nếu có)
│   ├── controllers/        # Xử lý Request/Response từ Client
│   ├── routes/             # Định nghĩa các Endpoints (API URL)
│   ├── services/           # Chứa Business Logic và thao tác với Prisma ORM
│   ├── utils/              # Các hàm hỗ trợ (JWT, Hash password...)
│   └── server.js           # Entry point khởi chạy server Express
├── public/uploads/         # Thư mục lưu trữ hình ảnh upload từ Client
├── cinema-api.postman_collection.json # File tổng hợp API cho Postman
└── package.json            # Quản lý thư viện
```



## 🔗 Danh Sách Các API Chi Tiết

Hệ thống được chia thành 5 nhóm API chính. Các API có yêu cầu quyền hạn sẽ cần truyền Header `Authorization: Bearer <Token>`.

### 1. Quản Lý Người Dùng (`/api/QuanLyNguoiDung`)
- `POST /DangNhap`: Đăng nhập hệ thống (trả về JWT Token)
- `POST /DangKy`: Đăng ký tài khoản mới dành cho khách hàng
- `GET /LayDanhSachLoaiNguoiDung`: Truy xuất danh sách các loại người dùng (Khách hàng, Quản trị)
- `GET /LayDanhSachNguoiDung`: Lấy danh sách toàn bộ người dùng
- `GET /LayDanhSachNguoiDungPhanTrang`: Lấy danh sách người dùng có hỗ trợ phân trang
- `GET /TimKiemNguoiDung`: Tìm kiếm người dùng theo từ khóa (tài khoản, họ tên)
- `GET /TimKiemNguoiDungPhanTrang`: Tìm kiếm người dùng có phân trang
- `POST /ThongTinTaiKhoan`: Lấy thông tin profile của user đang đăng nhập (dựa vào Token)
- `POST /LayThongTinNguoiDung`: Lấy thông tin chi tiết của một user bất kỳ (Admin)
- `POST /ThemNguoiDung`: Thêm user mới vào hệ thống (Admin)
- `PUT /CapNhatThongTinNguoiDung` (hoặc `/CapNhat`): Cập nhật thông tin cá nhân của người dùng
- `DELETE /XoaNguoiDung`: Xóa tài khoản người dùng khỏi hệ thống (Admin)

### 2. Quản Lý Phim (`/api/QuanLyPhim`)
- `GET /LayDanhSachBanner`: Hiển thị danh sách các Banner quảng cáo
- `POST /ThemBannerUploadHinh`: Thêm banner mới (hỗ trợ upload file ảnh bằng Multer)
- `POST /CapNhatBannerUploadHinh`: Cập nhật hình ảnh hoặc thông tin banner
- `DELETE /XoaBanner`: Xóa banner khỏi hệ thống
- `GET /LayDanhSachPhim`: Lấy toàn bộ danh sách phim (đang chiếu, sắp chiếu...)
- `GET /LayDanhSachPhimPhanTrang`: Lấy danh sách phim có phân trang
- `GET /LayDanhSachPhimTheoNgay`: Truy xuất danh sách phim khởi chiếu trong một khoảng thời gian
- `GET /LayThongTinPhim`: Xem chi tiết thông tin một bộ phim (Mô tả, đánh giá, lịch chiếu)
- `POST /ThemPhimUploadHinh`: Thêm phim mới (hỗ trợ upload poster)
- `POST /CapNhatPhimUpload/:maPhim`: Chỉnh sửa thông tin phim và thay đổi poster
- `DELETE /XoaPhim` (hoặc `/XP`): Xóa phim khỏi hệ thống (xóa tự động các dữ liệu lịch chiếu/vé liên quan)

### 3. Quản Lý Rạp (`/api/QuanLyRap`)
- `GET /LayThongTinHeThongRap`: Liệt kê các hệ thống rạp (BHD Star, CGV, Lotte Cinema...)
- `GET /LayThongTinCumRapTheoHeThong`: Xem danh sách các chi nhánh rạp thuộc 1 hệ thống
- `GET /LayThongTinLichChieuHeThongRap`: Lấy toàn bộ lịch chiếu phim của 1 hệ thống rạp
- `GET /LayThongTinLichChieuPhim`: Lấy thông tin rạp và lịch chiếu cụ thể của 1 bộ phim

### 4. Quản Lý Đặt Vé (`/api/QuanLyDatVe`)
- `GET /LayDanhSachPhongVe`: Lấy thông tin chi tiết phòng chiếu (số ghế trống/đã đặt, thông tin rạp) dựa trên Mã Lịch Chiếu
- `POST /DatVe`: Xử lý giao dịch đặt nhiều vé cùng lúc (Yêu cầu đăng nhập - truyền Token)

### 5. Quản Lý Lịch Chiếu (`/api/QuanLyLichChieu`)
- `POST /TaoLichChieu`: Tạo suất chiếu mới cho một bộ phim tại một rạp cụ thể (Admin)

## 🧪 Hướng Dẫn Test Bằng Postman
Trong thư mục `backend/` đã có sẵn file `cinema-api.postman_collection.json`.
1. Mở ứng dụng **Postman**.
2. Chọn **Import** -> Kéo thả file `cinema-api.postman_collection.json` vào.
3. Khi import xong, bạn sẽ thấy toàn bộ Collection gồm 5 nhóm API với các tham số, body và headers đã được cấu hình sẵn. 
4. Chạy API **Đăng Nhập** trước. Postman script sẽ tự động lấy Token lưu vào biến môi trường để bạn thoải mái test các API cần quyền Admin/User.
