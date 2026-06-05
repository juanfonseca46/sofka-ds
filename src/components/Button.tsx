import { Plus, User } from "lucide-react";
import type { CSSProperties } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger";
export type ButtonSize = "lg" | "md" | "sm" | "icon";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/* ── Token-driven styles ────────────────────────────────────── */
const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--sk-btn-gap)",
  borderRadius: "var(--sk-btn-radius)",
  border: "none",
  fontFamily: "var(--sk-font-family)",
  fontWeight: "var(--sk-btn-font-weight)",
  cursor: "pointer",
  outline: "none",
  position: "relative",
};

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: "var(--sk-color-brand)",
    color: "var(--sk-color-text-on-brand)",
  },
  secondary: {
    backgroundColor: "var(--sk-color-surface)",
    color: "var(--sk-color-brand)",
    border: "1px solid var(--sk-color-brand)",
  },
  tertiary: {
    backgroundColor: "transparent",
    color: "var(--sk-color-text-label)",
  },
  danger: {
    backgroundColor: "var(--sk-color-danger)",
    color: "var(--sk-color-text-on-brand)",
  },
};

const disabledStyle: Record<ButtonVariant, CSSProperties> = {
  primary:   { backgroundColor: "var(--sk-color-brand-subtle)",  color: "var(--sk-color-text-on-brand)",  cursor: "not-allowed", opacity: 0.65 },
  secondary: { border: "1px solid var(--sk-color-brand-subtle)", color: "var(--sk-color-brand-subtle)",   cursor: "not-allowed", opacity: 0.65, backgroundColor: "transparent" },
  tertiary:  { color: "var(--sk-color-text-disabled)",           cursor: "not-allowed", backgroundColor: "transparent", opacity: 0.6 },
  danger:    { backgroundColor: "var(--sk-color-danger-muted)",  color: "var(--sk-color-text-on-brand)",  cursor: "not-allowed", opacity: 0.65 },
};

const sizeStyle: Record<"lg" | "md" | "sm", CSSProperties> = {
  lg: {
    height: "var(--sk-btn-height-lg)",
    padding: "0 var(--sk-btn-padding-x-lg)",
    fontSize: "var(--sk-btn-font-size-lg)",
  },
  md: {
    height: "var(--sk-btn-height-md)",
    padding: "0 var(--sk-btn-padding-x-md)",
    fontSize: "var(--sk-btn-font-size-md)",
  },
  sm: {
    height: "var(--sk-btn-height-sm)",
    padding: "0 var(--sk-btn-padding-x-sm)",
    fontSize: "var(--sk-btn-font-size-sm)",
  },
};

const iconSizeMap: Record<ButtonSize, number> = { lg: 18, md: 16, sm: 14, icon: 18 };

export function Button({
  variant = "primary",
  size = "md",
  label = "Botón",
  showLeadingIcon = true,
  showTrailingIcon = true,
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const activeStyle = disabled ? disabledStyle[variant] : variantStyle[variant];
  const iconSize = iconSizeMap[size];

  /* CSS classes for hover animation (CSS :hover can't be done via inline styles) */
  const hoverClass = disabled ? "" : `sk-btn sk-btn-${variant}`;
  const finalClass = [hoverClass, className].filter(Boolean).join(" ");

  if (size === "icon") {
    return (
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={finalClass}
        style={{
          ...baseStyle,
          ...activeStyle,
          width: "var(--sk-btn-width-icon)",
          height: "var(--sk-btn-height-icon)",
        }}
      >
        <Plus size={iconSize} strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={finalClass}
      style={{ ...baseStyle, ...sizeStyle[size], ...activeStyle }}
    >
      {showLeadingIcon && <User size={iconSize} strokeWidth={2} />}
      <span>{label}</span>
      {showTrailingIcon && <Plus size={iconSize} strokeWidth={2.5} />}
    </button>
  );
}
