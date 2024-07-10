export async function getDataById(url) {
  const res = await fetch(url, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
