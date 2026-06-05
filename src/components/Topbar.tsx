import { AlignJustify } from "lucide-react";
import type { CSSProperties } from "react";

export interface TopbarProps {
  title?: string;
  onMenuLeft?: () => void;
  onMenuRight?: () => void;
}

export function Topbar({ title = "Título", onMenuLeft, onMenuRight }: TopbarProps) {
  const barStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 var(--sk-topbar-padding-x)",
    height: "var(--sk-topbar-height)",
    backgroundColor: "var(--sk-topbar-bg)",
    width: "100%",
    fontFamily: "var(--sk-font-family)",
  };

  const titleStyle: CSSProperties = {
    color: "var(--sk-topbar-color)",
    fontSize: "var(--sk-topbar-font-size)",
    fontWeight: "var(--sk-topbar-font-weight)",
    letterSpacing: "0.02em",
  };

  const iconBtnStyle: CSSProperties = {
    background: "none",
    border: "none",
    color: "var(--sk-topbar-color)",
    cursor: "pointer",
    padding: "var(--sk-space-1)",
    borderRadius: "var(--sk-radius-sm)",
    display: "flex",
    alignItems: "center",
    transition: "background 120ms ease",
  };

  return (
    <div style={barStyle}>
      <button
        style={iconBtnStyle}
        onClick={onMenuLeft}
        aria-label="Menú izquierdo"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
      >
        <AlignJustify size={22} strokeWidth={2} />
      </button>

      <span style={titleStyle}>{title}</span>

      <button
        style={iconBtnStyle}
        onClick={onMenuRight}
        aria-label="Menú derecho"
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
      >
        <AlignJustify size={22} strokeWidth={2} />
      </button>
    </div>
  );
}
