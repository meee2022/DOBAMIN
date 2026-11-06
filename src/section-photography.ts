// Approved section photography; originals and generation prompts remain in the image archive.
const photo = (id: string, width: number, height: number) => ({
  src: `/collections/sections-2026-11-06/${id}.webp`,
  srcSet: `/collections/sections-2026-11-06/${id}-640.webp 640w, /collections/sections-2026-11-06/${id}.webp ${width}w`,
  width,
  height,
});

export const sectionPhotos = {
  hero: photo('hero', 1536, 1024),
  tarts: photo('tarts', 1254, 1254),
  cups: photo('cups', 1254, 1254),
  desserts: photo('desserts', 1254, 1254),
  protein: photo('protein', 1254, 1254),
  gifts: photo('gifts', 1536, 1024),
};
