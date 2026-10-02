/**
 * SceneBackground — the page-level backdrop of the desk scene.
 *
 * Pure color/gradient. Day/night only swaps this layer's paint; the
 * illustration layers never change.
 */
export default function SceneBackground() {
  return <div className="desk-scene__background" aria-hidden="true" />;
}
