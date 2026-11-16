import { useAppSettings } from "../../context/AppSettingsContext";
import { getHomeCopy } from "../../lib/copy";
import { SITE_VERSION, SITE_YEAR } from "../../lib/siteMeta";

/** Quiet page colophon — same line on Home, Projects, Teaching, About. */
export default function PageCopyright({ className = "" }) {
  const { language } = useAppSettings();
  const { name } = getHomeCopy(language);

  return (
    <p className={`home-copyright home-copyright--flow ${className}`.trim()}>
      © {SITE_YEAR} {name} · v{SITE_VERSION}
    </p>
  );
}
