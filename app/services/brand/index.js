export async function getDataBrand(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["brand"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
