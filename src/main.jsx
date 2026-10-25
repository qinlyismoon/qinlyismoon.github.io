import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

function dismissLoader() {
  const loader = document.getElementById("site-loader");
  if (!loader) return;
  loader.classList.add("is-complete");
  window.setTimeout(() => loader.remove(), 220);
}

// Mount as soon as the module runs — do not wait on an artificial delay.
// The HTML loader stays up until the first paint, then fades out.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

requestAnimationFrame(() => {
  requestAnimationFrame(dismissLoader);
});
