import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getHomeCopy } from "../lib/copy";
import { usePageTransition } from "../context/PageTransitionContext";
import HomeIntro from "../components/landing/HomeIntro";
import HomeLayout from "../components/layouts/HomeLayout";

export default function LandingPage() {
  const { language } = useAppSettings();
  const { navigateToDesk, navigateToAbout, navigateToLibrary } = usePageTransition();

  const copy = useMemo(() => getHomeCopy(language), [language]);
  return (
    <HomeLayout>
      <div className="landing-page__hero">
        <HomeIntro
          copy={copy}
          onOpenLibrary={() => navigateToLibrary({ silent: true })}
          onOpenDesk={() => navigateToDesk({ silent: true })}
          onOpenTimeline={() => navigateToAbout({ silent: true })}
        />
      </div>
    </HomeLayout>
  );
}
