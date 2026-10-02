import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

function mountApplication() {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

window.setTimeout(() => {
  const loader = document.getElementById("site-loader");
  if (!loader) {
    mountApplication();
    return;
  }
  loader.classList.add("is-complete");
  window.setTimeout(() => {
    loader.remove();
    mountApplication();
  }, 240);
}, 550);
