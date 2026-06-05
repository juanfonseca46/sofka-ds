import { Plus, User } from "lucide-react";
import type { CSSProperties } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
export type ButtonSize = "md" | "sm" | "icon";

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
  transition: "var(--sk-btn-transition)",
  outline: "none",
};

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  primary: {
    backgroundColor: "var(--sk-color-brand)",
    color: "var(--sk-color-text-on-brand)",
  },
  secondary: {
    backgroundColor: "var(--sk-color-brand-subtle)",
    color: "var(--sk-color-text-on-brand)",
  },
  danger: {
    backgroundColor: "var(--sk-color-danger)",
    color: "var(--sk-color-text-on-brand)",
  },
  outline: {
    backgroundColor: "var(--sk-color-surface)",
    color: "var(--sk-color-brand)",
    border: "1px solid var(--sk-color-brand)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--sk-color-text-label)",
  },
};

const disabledStyle: Record<ButtonVariant, CSSProperties> = {
  primary:   { backgroundColor: "var(--sk-color-brand-subtle)",  color: "var(--sk-color-text-on-brand)", cursor: "not-allowed", opacity: 0.7 },
  secondary: { backgroundColor: "var(--sk-color-brand-muted)",   color: "var(--sk-color-text-on-brand)", cursor: "not-allowed", opacity: 0.7 },
  danger:    { backgroundColor: "var(--sk-color-danger-muted)",  color: "var(--sk-color-text-on-brand)", cursor: "not-allowed", opacity: 0.7 },
  outline:   { border: "1px solid var(--sk-color-brand-subtle)", color: "var(--sk-color-brand-subtle)",  cursor: "not-allowed", opacity: 0.7, backgroundColor: "transparent" },
  ghost:     { color: "var(--sk-color-text-disabled)", cursor: "not-allowed", backgroundColor: "transparent", opacity: 0.6 },
};

const sizeStyle: Record<"md" | "sm", CSSProperties> = {
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
  const iconSize = size === "md" ? 16 : 14;

  if (size === "icon") {
    return (
      <button
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        style={{
          ...baseStyle,
          ...activeStyle,
          width: "var(--sk-btn-width-icon)",
          height: "var(--sk-btn-height-icon)",
        }}
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={{ ...baseStyle, ...sizeStyle[size], ...activeStyle }}
    >
      {showLeadingIcon && <User size={iconSize} strokeWidth={2} />}
      <span>{label}</span>
      {showTrailingIcon && <Plus size={iconSize} strokeWidth={2.5} />}
    </button>
  );
}
