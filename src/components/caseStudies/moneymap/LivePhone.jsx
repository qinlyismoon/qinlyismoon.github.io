import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

// The real MoneyMap prototype, embedded as a phone. In dev it runs from the
// prototype's own dev server; in production from the built copy that
// `npm run build:portfolio` (in moneymap-destinations) writes to
// public/money-map/prototype/.
const PROTOTYPE_URL =
  import.meta.env.VITE_MM_PROTOTYPE_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:5180/"
    : `${import.meta.env.BASE_URL}money-map/prototype/index.html`);

export function prototypeSrc(path) {
  return `${PROTOTYPE_URL}?embed=${encodeURIComponent(path)}`;
}

/**
 * A live phone. `start` is the first screen. Exposes go(path) and reset().
 * `onLocation` hears every screen the visitor reaches.
 */
const LivePhone = forwardRef(function LivePhone({ start, title, onLocation }, ref) {
  const frame = useRef(null);
  const [src, setSrc] = useState(() => prototypeSrc(start));
  const [nonce, setNonce] = useState(0);

  useImperativeHandle(ref, () => ({
    go(path) {
      frame.current?.contentWindow?.postMessage({ type: "mm-go", path }, "*");
    },
    reset(path = start) {
      setSrc(prototypeSrc(path));
      setNonce((n) => n + 1);
    },
  }));

  useEffect(() => {
    if (!onLocation) return undefined;
    const onMessage = (event) => {
      if (event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "mm-location") onLocation(event.data.path);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onLocation]);

  return (
    <div className="mm-phone">
      <iframe
        key={nonce}
        ref={frame}
        src={src}
        title={title}
        loading="lazy"
        className="mm-phone__frame"
      />
    </div>
  );
});

export default LivePhone;
