import { BrowserRouter } from "react-router-dom";
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { MusicProvider } from "./context/MusicContext";
import MoonCursor from "./components/shared/MoonCursor";
import SiteShell from "./components/shared/SiteShell";
import "./styles.css";

export default function App() {
  return (
    <AppSettingsProvider>
      <MusicProvider>
        <MoonCursor />
        <BrowserRouter>
          <SiteShell />
        </BrowserRouter>
      </MusicProvider>
    </AppSettingsProvider>
  );
}
