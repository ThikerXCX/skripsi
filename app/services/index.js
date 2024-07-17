export async function getDataById(url) {
  const res = await fetch(url, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}

export async function getDataProductBySlug(url) {
  const res = await fetch(url, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
