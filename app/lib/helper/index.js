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
