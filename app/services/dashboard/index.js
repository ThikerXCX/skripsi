export async function getDataTransaksiDashboard(bulan, tahun) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOSTNAME
      }api/dashboard?koleksi=transaksi&bulan=${encodeURIComponent(
        bulan
      )}&tahun=${encodeURIComponent(tahun)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );
    if (!res.ok) {
      throw new Error("gagal mendapatkan data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null; // atau nilai lain yang sesuai
  }
}

export async function getDataServiceDashboard(bulan, tahun) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOSTNAME
      }api/dashboard?koleksi=service&bulan=${encodeURIComponent(
        bulan
      )}&tahun=${encodeURIComponent(tahun)}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );
    if (!res.ok) {
      throw new Error("gagal mendapatkan data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null; // atau nilai lain yang sesuai
  }
}
