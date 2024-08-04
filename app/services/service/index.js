export async function getDataService(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["service"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
export async function getDataServiceBulanan(bulan, tahun) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOSTNAME
      }api/laporan/service?bulan=${encodeURIComponent(
        bulan
      )}&tahun=${encodeURIComponent(tahun)}`,
      {
        next: {
          revalidate: 60,
        },
        // cache: "no-store",
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

export async function getDataServiceTahunan(tahun) {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOSTNAME
      }api/laporan/service?tahun=${encodeURIComponent(tahun)}`,
      {
        next: {
          revalidate: 60,
        },
        // cache: "no-store",
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
