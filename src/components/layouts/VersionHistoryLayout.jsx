export default function VersionHistoryLayout({ children }) {
  return (
    <section
      className="version-history-layout"
      data-layout="version-history"
      aria-label="Version history timeline"
    >
      {children}
    </section>
  );
}
