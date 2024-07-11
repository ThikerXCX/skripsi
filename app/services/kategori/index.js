export async function getDataKategori(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["kategori"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}

export async function getDataKategoriById(url) {
  console.log(url);
  const res = await fetch(url, {
    cache: "no-cache",
  });
  console.log(res);
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
