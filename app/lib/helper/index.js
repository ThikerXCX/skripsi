export function Slugify(name) {
  let slug = name.replace(/\s+/g, "-").toLowerCase();
  return slug;
}

export const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

export const generateNoService = () => {
  const randomChars = [];
  for (let i = 0; i < 5; i++) {
    randomChars.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
  }
  return `EC${randomChars.join("")}`;
};

export const sendMessage = async (data, status) => {
  const message = `
Selamat pagi ${data.namaCustomer}, 

Kami dari EC Computer ingin menginformasikan bahwa barang service Anda dengan nomor service ${data.id} telah masuk ke dalam proses perbaikan.

Berikut adalah detail informasi tentang barang service Anda:
- Nama Barang: ${data.namaPerangkat}
- No. Service: ${data.id}
- Keluhan: ${data.keluhan}

Terima kasih atas kepercayaan Anda terhadap kami. Kami akan segera menghubungi Anda jika ada informasi lebih lanjut tentang proses perbaikan barang service Anda.

Saya hormat,
Tim EC Computer
`;

  const resMessage = await fetch(`/api/fonnte`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noHp: data.noHpCustomer,
      message: message,
    }),
  });
  console.log(resMessage);
  return resMessage;
};
