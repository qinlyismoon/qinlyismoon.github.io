/** Workspace interaction sounds — filenames match /public assets. */
export const WORKSPACE_SOUNDS = {
  lampToggle: "/turn on:off.mp3",
  pageFlip: "/page flip.mp3",
  cameraShutter: "/camera shutter.mp3",
  clockTick: "/clock ticking.mp3",
  plantDrops: "/drops.mp3",
};

export function soundSrc(path) {
  return encodeURI(path);
}
