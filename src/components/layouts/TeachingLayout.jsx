/**
 * Teaching — a document page with its own scroll surface, matching the
 * About page's frame (`.version-history-layout`): the route layer owns the
 * top offset and gutters, this surface is the single vertical scroller and
 * never scrolls horizontally.
 */
export default function TeachingLayout({ children }) {
  return (
    <section className="teaching-layout" data-layout="teaching">
      {children}
    </section>
  );
}
