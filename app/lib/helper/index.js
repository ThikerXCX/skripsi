export function Slugify(name) {
  let slug = name.replace(/\s+/g, "-").toLowerCase();
  return slug;
}
