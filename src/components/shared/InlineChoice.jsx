import { useRef } from "react";
import useSlidingIndicator from "../../hooks/useSlidingIndicator";

/**
 * InlineChoice — the one choice primitive of the notebook.
 *
 * Options are plain words separated by middle dots ("Light · Dark ·
 * System"), the same separator the contact line and System Status use.
 * The chosen word speaks in primary text over a 1px accent rule; the
 * others stay in the quiet secondary voice. No pills, no segmented
 * control, no background. Keyboard: a radiogroup with roving focus —
 * arrow keys move and select, like native radios.
 *
 * The chosen word's accent rule is one line that slides between words with
 * the shared sliding-indicator motion (the same as the navigation tabs).
 *
 * Used by the Settings panel (mode, sound, accent). `swatch` renders a true-circle color sample before the label
 * (accent options only — an icon must mean something).
 */
export default function InlineChoice({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
  hideLabels = false,
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );
  const groupRef = useRef(null);
  const indicatorRef = useRef(null);
  useSlidingIndicator({
    containerRef: groupRef,
    indicatorRef,
    getActive: () =>
      hideLabels
        ? null
        : groupRef.current?.querySelectorAll(".ds-choice__label")[selectedIndex] ?? null,
    activeKey: value,
    layoutKey: options.map((option) => option.label).join("|"),
  });

  const move = (event, index) => {
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % options.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + options.length) % options.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = options.length - 1;
    if (next === null) return;
    event.preventDefault();
    onChange(options[next].id);
    const group = event.currentTarget.closest("[role='radiogroup']");
    group?.querySelectorAll("[role='radio']")[next]?.focus();
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={`ds-choice${hideLabels ? " ds-choice--swatches" : ""} ${className}`.trim()}
    >
      {options.map((option, index) => {
        const checked = index === selectedIndex;
        return (
          <span className="ds-choice__slot" key={option.id}>
            {index > 0 && !hideLabels ? (
              <span className="ds-choice__separator" aria-hidden="true">·</span>
            ) : null}
            <button
              type="button"
              role="radio"
              aria-checked={checked}
              aria-label={hideLabels ? option.label : undefined}
              title={hideLabels ? option.label : option.title}
              tabIndex={checked ? 0 : -1}
              className="ds-choice__option"
              onClick={() => onChange(option.id)}
              onKeyDown={(event) => move(event, index)}
            >
              {option.swatch ? (
                <span
                  className="ds-choice__swatch"
                  style={{ "--swatch": option.swatch }}
                  aria-hidden="true"
                />
              ) : null}
              {hideLabels ? null : <span className="ds-choice__label">{option.label}</span>}
            </button>
          </span>
        );
      })}
      {hideLabels ? null : (
        <span ref={indicatorRef} className="ds-choice__indicator" aria-hidden="true" />
      )}
    </div>
  );
}
