export async function getDataTransaksi(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["transaksi"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
