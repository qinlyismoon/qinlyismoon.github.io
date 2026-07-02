/** Subtle hover lifts per object — calm, physical, never exaggerated. */
export const OBJECT_HOVER = {
  clock: { y: -3, scale: 1.012, transition: { duration: 0.45, ease: [0.45, 0, 0.25, 1] } },
  plant: { y: -3, scale: 1.012, transition: { duration: 0.45, ease: [0.45, 0, 0.25, 1] } },
  speaker: { y: -4, scale: 1.015, transition: { duration: 0.4, ease: [0.45, 0, 0.25, 1] } },
  camera: { y: -3, scale: 1.012, transition: { duration: 0.4, ease: [0.45, 0, 0.25, 1] } },
  monitor: { transition: { duration: 0.45, ease: [0.45, 0, 0.25, 1] } },
  mug: { y: -3, scale: 1.012, transition: { duration: 0.45, ease: [0.45, 0, 0.25, 1] } },
};

/** SVG transform-origin in local object pixels — Framer whileHover scale is unreliable on <g>. */
export const OBJECT_HOVER_ORIGIN = {
  clock: "38px 78px",
  plant: "42px 46px",
  mug: "34px 78px",
};

/** No lift/scale on hover — label and drop-shadow only. */
export const OBJECT_NO_HOVER = new Set(["lamp", "books"]);

export const CAMERA_FLASH_MS = 380;
export const MUG_STIR_MS = 1500;
export const MUG_STIR_AUDIO_MS = 3000;
export const PLANT_WATERING_MS = 1000;
