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
  let message = "";
  let schedule = 0;

  if (status == "create") {
    message = `
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
  }
  if (status == "konfirmasi") {
    message = `
  Halo ${data.namaCustomer},
  
  Kami ingin menginformasikan bahwa perangkat Anda, ${
    data.namaPerangkat
  }, telah melalui tahap pengecekan. Berikut adalah rincian biaya dan kerusakan yang ditemukan:
  
  - Biaya Perbaikan: ${formatRupiah(data.biaya)}
  - Kerusakan : ${data.keluhan}
  - Penanganan : ${data.keterangan}
  
  Saat ini, perangkat Anda berada dalam tahap konfirmasi harga. Kami menunggu persetujuan Anda untuk melanjutkan proses perbaikan.
  
  Jika Anda setuju dengan biaya yang telah kami informasikan, silakan konfirmasi balasan pesan ini. Terima kasih atas kepercayaan Anda menggunakan layanan kami.
  
  Salam,
  Tim Perbaikan EC Computer
  
  Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
    `;
  }
  if (status == "feedback") {
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    schedule = Math.floor(Date.now() / 1000) + oneWeekInSeconds;

    message = `Halo ${data.namaCustomer},

Kami berharap Anda dalam keadaan baik. Kami dari EC Computer ingin mengucapkan terima kasih karena telah mempercayakan perbaikan perangkat Anda kepada kami. Kami sangat menghargai kesempatan untuk melayani Anda.

Kami ingin meminta sedikit waktu Anda untuk memberikan umpan balik mengenai layanan kami. Umpan balik Anda sangat berharga bagi kami untuk terus meningkatkan kualitas layanan.

Berikut adalah detail perangkat Anda:
- Nama Perangkat: ${data.namaPerangkat}
- No. Service: ${data.id}

kami ingin mengetahui bagaimana hasil barang perbaikan nya

Terima kasih banyak atas waktu dan kerjasama Anda.

Salam hangat,
Tim EC Computer

Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
  `;
  }

  const resMessage = await fetch(`/api/fonnte`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      noHp: data.noHpCustomer,
      message: message,
      schedule: schedule,
    }),
  });
  return resMessage;
};
