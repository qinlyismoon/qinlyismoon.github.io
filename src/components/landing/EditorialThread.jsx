/**
 * A single narrative stroke between the Home introduction and work index.
 * The drawing stays in document flow with its marker. This keeps the stroke
 * and note locked together while the mobile reading surface scrolls.
 */
export default function EditorialThread({ note }) {
  return (
    <div className="editorial-thread__marker" aria-hidden="true">
      <div className="editorial-thread">
        <svg className="editorial-thread__line" viewBox="0 0 1000 64" preserveAspectRatio="none" focusable="false">
          <path d="M 0 37 C 210 36, 355 40, 520 38 C 690 36, 835 33, 1000 36" />
        </svg>
        <span className="editorial-thread__note">{note}</span>
      </div>
    </div>
  );
}
