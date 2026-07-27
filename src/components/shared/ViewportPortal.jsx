import { createPortal } from "react-dom";

/** Portal to document.body — sync on the client so refs are available in useLayoutEffect. */
export default function ViewportPortal({ children }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}
