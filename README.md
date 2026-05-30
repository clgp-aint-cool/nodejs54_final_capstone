#  CLGP's Theater - Hệ Thống Đặt Vé Xem Phim Toàn Diện

## https://nodejs54-final-capstone.vercel.app

##  Công Nghệ Sử Dụng (Tech Stack)

Dự án được xây dựng theo mô hình **Client-Server** với các công nghệ hiện đại nhất:
- **Frontend:** React.js, TypeScript, TailwindCSS, React Router, Zustand (State Management), React Query, Lucide-React (Icons).
- **Backend:** Node.js, Express.js, Prisma ORM, MySQL, JWT (Authentication), Multer (File Upload).


##  Chức Năng Nổi Bật 

### 1. Trang Chủ & Lịch Chiếu (Trải nghiệm người dùng)
Giao diện Dark Mode sang trọng, hiển thị Banner quảng cáo lớn. Bên dưới là danh sách các phim đang chiếu và sắp chiếu, hỗ trợ phân trang mượt mà. Khách hàng có thể dễ dàng duyệt qua các cụm rạp để xem lịch chiếu trong ngày.


### 2. Chi Tiết Phim (Movie Detail)
Khi click vào một bộ phim, người dùng sẽ xem được nội dung tóm tắt, trailer, điểm đánh giá và danh sách lịch chiếu cụ thể của bộ phim đó tại các hệ thống rạp khác nhau (CGV, BHD, Lotte...).


### 3. Đặt Vé Trực Tuyến (Seat Booking)
Một trong những chức năng phức tạp nhất: Hệ thống hiển thị sơ đồ ghế ngồi trực quan mô phỏng rạp chiếu thực tế.
- Ghế trống, Ghế đang chọn, Ghế đã bán (có màu sắc phân biệt).
- Cập nhật tổng tiền theo thời gian thực (Real-time calculation).
- *Yêu cầu người dùng phải Đăng nhập trước khi chọn ghế.*


### 4. Quản Trị Hệ Thống (Admin Dashboard)
Trang dành riêng cho tài khoản có quyền Quản trị viên (Admin). Sidebar được thiết kế hiện đại, dễ dàng điều hướng giữa các chức năng quản lý.

#### 4.1. Quản Lý Phim & Banner
Cho phép Admin thực hiện các thao tác CRUD (Thêm/Xem/Sửa/Xóa) đối với Phim và Banner. Tích hợp chức năng Upload hình ảnh (Poster/Banner) trực tiếp từ máy tính lên server.

#### 4.2. Quản Lý Lịch Chiếu (Showtimes)
Admin có thể thiết lập suất chiếu mới cho từng bộ phim, chọn hệ thống rạp, cụm rạp, giờ chiếu và định giá vé.


#### 4.3. Quản Lý Người Dùng
Hiển thị danh sách khách hàng và quản trị viên. Hỗ trợ tìm kiếm nhanh theo tên hoặc tài khoản, chỉnh sửa thông tin hoặc xóa tài khoản vi phạm.

---

##  Tài Khoản Demo (Testing Accounts)
- **Tài khoản Khách (User):** `userdemo` / Mật khẩu: `123456` *(Sử dụng để trải nghiệm Đặt vé)*
- **Tài khoản Quản Trị (Admin):** `admin` / Mật khẩu: `123456` *(Sử dụng để truy cập Admin Dashboard)*

