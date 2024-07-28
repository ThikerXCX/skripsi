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
