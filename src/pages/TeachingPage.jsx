import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getTeachingCopy } from "../lib/teachingContent";
import TeachingBoard from "../components/teaching/TeachingBoard";

/**
 * Teaching — home-style bubble board: about + principles + expandable
 * course surfaces. Copy stays in `teachingContent.js`.
 */
export default function TeachingPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => {
    const base = getTeachingCopy(language);
    return { ...base, language };
  }, [language]);

  return <TeachingBoard copy={copy} />;
}
