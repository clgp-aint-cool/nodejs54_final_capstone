# 🎬 CLGP's Theater - Hệ Thống Đặt Vé Xem Phim Toàn Diện

Chào mừng bạn đến với **CLGP's Theater** - một nền tảng web mô phỏng hệ thống rạp chiếu phim chuyên nghiệp, cho phép người dùng xem lịch chiếu, đặt vé trực tuyến và cung cấp một hệ thống quản trị (Admin Dashboard) mạnh mẽ để quản lý phim, suất chiếu, rạp và người dùng.

## 🌟 Công Nghệ Sử Dụng (Tech Stack)

Dự án được xây dựng theo mô hình **Client-Server** với các công nghệ hiện đại nhất:
- **Frontend:** React.js, TypeScript, TailwindCSS, React Router, Zustand (State Management), React Query, Lucide-React (Icons).
- **Backend:** Node.js, Express.js, Prisma ORM, MySQL, JWT (Authentication), Multer (File Upload).

---

## 📸 Chức Năng Nổi Bật & Ảnh Demo (Features)

Dưới đây là các tính năng chính của hệ thống. *(Lưu ý: Bạn hãy chụp ảnh màn hình dự án thực tế của mình và lưu vào thư mục `docs/` để thay thế các placeholder ảnh bên dưới nhé!)*

### 1. Trang Chủ & Lịch Chiếu (Trải nghiệm người dùng)
Giao diện Dark Mode sang trọng, hiển thị Banner quảng cáo lớn. Bên dưới là danh sách các phim đang chiếu và sắp chiếu, hỗ trợ phân trang mượt mà. Khách hàng có thể dễ dàng duyệt qua các cụm rạp để xem lịch chiếu trong ngày.

![Demo Trang Chủ](./docs/home-demo.png)

### 2. Chi Tiết Phim (Movie Detail)
Khi click vào một bộ phim, người dùng sẽ xem được nội dung tóm tắt, trailer, điểm đánh giá và danh sách lịch chiếu cụ thể của bộ phim đó tại các hệ thống rạp khác nhau (CGV, BHD, Lotte...).

![Demo Chi Tiết Phim](./docs/movie-detail.png)

### 3. Đặt Vé Trực Tuyến (Seat Booking)
Một trong những chức năng phức tạp nhất: Hệ thống hiển thị sơ đồ ghế ngồi trực quan mô phỏng rạp chiếu thực tế.
- Ghế trống, Ghế đang chọn, Ghế đã bán (có màu sắc phân biệt).
- Cập nhật tổng tiền theo thời gian thực (Real-time calculation).
- *Yêu cầu người dùng phải Đăng nhập trước khi chọn ghế.*

![Demo Đặt Vé](./docs/booking-demo.png)

### 4. Quản Trị Hệ Thống (Admin Dashboard)
Trang dành riêng cho tài khoản có quyền Quản trị viên (Admin). Sidebar được thiết kế hiện đại, dễ dàng điều hướng giữa các chức năng quản lý.

#### 4.1. Quản Lý Phim & Banner
Cho phép Admin thực hiện các thao tác CRUD (Thêm/Xem/Sửa/Xóa) đối với Phim và Banner. Tích hợp chức năng Upload hình ảnh (Poster/Banner) trực tiếp từ máy tính lên server.

![Demo Quản Lý Phim](./docs/admin-movies.png)
![Demo Quản Lý Banner](./docs/admin-banners.png)

#### 4.2. Quản Lý Lịch Chiếu (Showtimes)
Admin có thể thiết lập suất chiếu mới cho từng bộ phim, chọn hệ thống rạp, cụm rạp, giờ chiếu và định giá vé.

![Demo Tạo Lịch Chiếu](./docs/admin-showtimes.png)

#### 4.3. Quản Lý Người Dùng
Hiển thị danh sách khách hàng và quản trị viên. Hỗ trợ tìm kiếm nhanh theo tên hoặc tài khoản, chỉnh sửa thông tin hoặc xóa tài khoản vi phạm.

![Demo Quản Lý Người Dùng](./docs/admin-users.png)

---

## 🔐 Tài Khoản Demo (Testing Accounts)
- **Tài khoản Khách (User):** `userdemo` / Mật khẩu: `123456` *(Sử dụng để trải nghiệm Đặt vé)*
- **Tài khoản Quản Trị (Admin):** `admin` / Mật khẩu: `123456` *(Sử dụng để truy cập Admin Dashboard)*

*(Nếu chưa có tài khoản, bạn có thể tự đăng ký một tài khoản mới trực tiếp trên giao diện Đăng ký của trang web).*
