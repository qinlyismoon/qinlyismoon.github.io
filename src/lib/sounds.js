/** Workspace interaction sounds — filenames match /public assets. */
export const WORKSPACE_SOUNDS = {
  lampToggle: "/turn on:off.mp3",
  pageFlip: "/page flip.mp3",
  cameraShutter: "/camera shutter.mp3",
  clockTick: "/clock ticking.mp3",
  plantDrops: "/drops.mp3",
  nature: "/nature.mp3",
};

/** Window hover ambience — half of full volume. */
export const NATURE_SOUND_VOLUME = 0.5;

export function soundSrc(path) {
  return encodeURI(path);
}
