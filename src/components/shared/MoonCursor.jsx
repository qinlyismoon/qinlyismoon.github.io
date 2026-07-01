import { useEffect, useState } from "react";

const CURSOR_SIZE = 28;

export default function MoonCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersCoarsePointer) return;

    setIsEnabled(true);
    document.documentElement.classList.add("moon-cursor-active");

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => {
      setIsVisible(false);
    };

    const handleEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      document.documentElement.classList.remove("moon-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <img
      src="/favicon.png"
      alt=""
      aria-hidden="true"
      className="moon-cursor"
      draggable={false}
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        left: position.x - CURSOR_SIZE / 2,
        top: position.y - CURSOR_SIZE / 2,
      }}
    />
  );
}
