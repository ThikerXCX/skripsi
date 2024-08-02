export async function getDataLaporan(url) {
  console.log(url);

  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["laporan"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
