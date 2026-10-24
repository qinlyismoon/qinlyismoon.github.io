import { BrowserRouter } from "react-router-dom";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { MusicProvider } from "./context/MusicContext";
import SiteShell from "./components/shared/SiteShell";
import "./styles.css";
import "./journey-version-tags.css";
import "./teaching.css";
import "./site-chrome.css";
import "./settings.css";
import "./ambient-backdrop.css";

export default function App() {
  return (
    <AppSettingsProvider>
      <MusicProvider>
        <BrowserRouter>
          <SiteShell />
        </BrowserRouter>
      </MusicProvider>
    </AppSettingsProvider>
  );
}
