const prisma = require('../config/db');

const rapService = {
  async layThongTinHeThongRap(maHeThongRap) {
    if (maHeThongRap) {
      return prisma.heThongRap.findUnique({
        where: { maHeThongRap },
        include: { cumRap: { include: { rap: true } } },
      });
    }
    return prisma.heThongRap.findMany({ include: { cumRap: { include: { rap: true } } } });
  },

  async layThongTinCumRapTheoHeThong(maHeThongRap) {
    return prisma.cumRap.findMany({
      where: { maHeThongRap },
      include: { rap: true, heThongRap: { select: { maHeThongRap: true, tenHeThongRap: true } } },
    });
  },

  async layThongTinLichChieuHeThongRap({ maHeThongRap, maNhom }) {
    const heThongRaps = await prisma.heThongRap.findMany({
      where: maHeThongRap ? { maHeThongRap } : undefined,
      include: {
        cumRap: {
          include: {
            rap: {
              include: {
                lichChieu: {
                  where: {
                    ...(maNhom ? {} : {}), // can filter by group if needed
                  },
                  include: {
                    phim: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Transform into standard format
    return heThongRaps.map(htr => {
      const cumRapList = htr.cumRap.map(cr => {
        // flatten all lichChieu inside this cumRap's raps
        let lichChieuPhim = [];
        cr.rap.forEach(r => {
          lichChieuPhim.push(...r.lichChieu);
        });
        return {
          maCumRap: cr.maCumRap,
          tenCumRap: cr.tenCumRap,
          diaChi: cr.diaChi,
          maHeThongRap: cr.maHeThongRap,
          lichChieuPhim: lichChieuPhim
        };
      });

      return {
        maHeThongRap: htr.maHeThongRap,
        tenHeThongRap: htr.tenHeThongRap,
        logo: htr.logo,
        cumRap: cumRapList
      };
    });
  },

  async layThongTinLichChieuPhim(MaPhim) {
    const lichChieus = await prisma.lichChieu.findMany({
      where: { maPhim: Number(MaPhim) },
      include: {
        rap: {
          include: {
            cumRap: {
              include: { heThongRap: true },
            },
          },
        },
      },
    });

    // Group by heThongRap -> cumRap -> lichChieu
    const heThongRapMap = new Map();

    lichChieus.forEach(lc => {
      const cr = lc.rap.cumRap;
      const htr = cr.heThongRap;

      if (!heThongRapMap.has(htr.maHeThongRap)) {
        heThongRapMap.set(htr.maHeThongRap, {
          maHeThongRap: htr.maHeThongRap,
          tenHeThongRap: htr.tenHeThongRap,
          logo: htr.logo,
          cumRapChieu: new Map()
        });
      }

      const htrObj = heThongRapMap.get(htr.maHeThongRap);

      if (!htrObj.cumRapChieu.has(cr.maCumRap)) {
        htrObj.cumRapChieu.set(cr.maCumRap, {
          maCumRap: cr.maCumRap,
          tenCumRap: cr.tenCumRap,
          diaChi: cr.diaChi,
          lichChieuPhim: []
        });
      }

      const crObj = htrObj.cumRapChieu.get(cr.maCumRap);
      crObj.lichChieuPhim.push({
        maLichChieu: lc.maLichChieu,
        maRap: lc.maRap,
        tenRap: lc.rap.tenRap,
        ngayChieuGioChieu: lc.ngayChieuGioChieu,
        giaVe: lc.giaVe,
      });
    });

    const heThongRapChieu = Array.from(heThongRapMap.values()).map(htr => ({
      ...htr,
      cumRap: Array.from(htr.cumRapChieu.values())
    }));

    return {
      heThongRapChieu
    };
  },
};

module.exports = rapService;
