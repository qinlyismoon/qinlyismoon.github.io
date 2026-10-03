import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getHomeCopy } from "../lib/copy";
import HomeIntro from "../components/landing/HomeIntro";
import EditorialThread from "../components/landing/EditorialThread";
import HomeLayout from "../components/layouts/HomeLayout";
import LibraryPage from "./LibraryPage";

export default function LandingPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getHomeCopy(language), [language]);
  return (
    <HomeLayout>
      <div className="landing-page__hero">
        <HomeIntro copy={copy} />
        <EditorialThread note={copy.editorialThreadNote} />
        <LibraryPage embedded />
        <p className="home-copyright">© 2026 Phoebe Qin · v2.1.0</p>
      </div>
    </HomeLayout>
  );
}
