export async function getDataTransaksi() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}api/transaksi`, {
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

export async function getUserTransaction(email) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}api/transaksi?email=${email}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}

export async function getInvoice(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}api/transaksi?id=${id}`,
    {
      next: {
        revalidate: 120,
      },
    }
  );
  if (!res.ok) {
    throw new Error("gagal mendapatkan data");
  }
  return res.json();
}
