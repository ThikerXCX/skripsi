export async function getDataInfo(url) {
  const res = await fetch(url, {
    cache: "force-cache",
    next: {
      tags: ["info"],
    },
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
