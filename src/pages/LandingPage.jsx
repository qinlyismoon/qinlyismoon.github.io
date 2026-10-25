import { lazy, Suspense, useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getHomeCopy } from "../lib/copy";
import HomeIntro from "../components/landing/HomeIntro";
import EditorialThread from "../components/landing/EditorialThread";
import HomeLayout from "../components/layouts/HomeLayout";

const LibraryPage = lazy(() => import("./LibraryPage"));

export default function LandingPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getHomeCopy(language), [language]);
  return (
    <HomeLayout>
      <div className="landing-page__hero">
        <HomeIntro copy={copy} />
        <EditorialThread note={copy.editorialThreadNote} />
        <Suspense fallback={null}>
          <LibraryPage embedded />
        </Suspense>
        <p className="home-copyright">© 2026 Longyue Qin · v2.5.1</p>
      </div>
    </HomeLayout>
  );
}
