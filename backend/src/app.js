const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '../public')));

const phimRoutes = require('./routes/phim.routes');
const rapRoutes = require('./routes/rap.routes');
const datVeRoutes = require('./routes/datVe.routes');
const taoLichChieuRoutes = require('./routes/taoLichChieu.routes');
const nguoiDungRoutes = require('./routes/nguoiDung.routes');

app.use('/api/QuanLyPhim', phimRoutes);
app.use('/api/QuanLyRap', rapRoutes);
app.use('/api/QuanLyDatVe', datVeRoutes);
app.use('/api/QuanLyLichChieu', taoLichChieuRoutes);
app.use('/api/QuanLyNguoiDung', nguoiDungRoutes);

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Kết nối database thành công');
    const server = app.listen(PORT, () => {
      console.log(`Server đang chạy tại port ${PORT}`);
    });
    // Keep process alive
    process.on('SIGINT', async () => {
      await prisma.$disconnect();
      server.close();
      process.exit(0);
    });
  } catch (err) {
    console.error('Không thể kết nối database:', err);
    process.exit(1);
  }
};

if (require.main === module || (require.main && require.main.filename && require.main.filename.endsWith('server.js'))) {
  startServer().catch(err => {
    console.error('Server error:', err);
    process.exit(1);
  });
}

module.exports = app;
