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
