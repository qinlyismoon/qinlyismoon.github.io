export default function WorkspaceCloseButton({ onClose, ariaLabel, isDarkMode }) {
  return (
    <button
      type="button"
      className="workspace-close"
      onClick={onClose}
      aria-label={ariaLabel}
      style={{
        borderColor: isDarkMode
          ? "rgba(255,255,255,0.14)"
          : "rgba(0,0,0,0.10)",
        background: isDarkMode
          ? "rgba(255,255,255,0.08)"
          : "rgba(0,0,0,0.04)",
        color: isDarkMode ? "#f5f5f7" : "#111111",
      }}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}
