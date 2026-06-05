import { ChevronDown, User } from "lucide-react";
import type { CSSProperties } from "react";

export type InputState = "default" | "active" | "disabled" | "error";

export interface InputProps {
  label?: string;
  placeholder?: string;
  state?: InputState;
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
}

/* ── Token-driven styles ────────────────────────────────────── */
const wrapperStyle: Record<InputState, CSSProperties> = {
  default: {
    border: "1px solid var(--sk-color-border)",
    backgroundColor: "var(--sk-color-surface)",
  },
  active: {
    border: "1px solid var(--sk-color-border-focus-brand)",
    backgroundColor: "var(--sk-color-surface)",
    boxShadow: "0 0 0 3px rgba(48, 130, 246, 0.15)",
  },
  disabled: {
    border: "1px solid var(--sk-color-border-light)",
    backgroundColor: "var(--sk-color-surface-muted)",
    cursor: "not-allowed",
  },
  error: {
    border: "1px solid var(--sk-color-border-focus-danger)",
    backgroundColor: "var(--sk-color-surface)",
    boxShadow: "0 0 0 3px rgba(248, 113, 113, 0.15)",
  },
};

const labelColor: Record<InputState, string> = {
  default:  "var(--sk-color-text-label)",
  active:   "var(--sk-color-text-label)",
  disabled: "var(--sk-color-text-disabled)",
  error:    "var(--sk-color-text-label)",
};

export function Input({
  label = "Label",
  placeholder = "Placeholder",
  state = "default",
  errorMessage = "Mensaje de error",
  value,
  onChange,
}: InputProps) {
  const isDisabled = state === "disabled";

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--sk-input-gap)",
    fontFamily: "var(--sk-font-family)",
  };

  const labelRowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const labelTextStyle: CSSProperties = {
    fontSize: "var(--sk-input-label-size)",
    fontWeight: "var(--sk-input-label-weight)",
    color: labelColor[state],
  };

  const fieldStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 var(--sk-input-padding-x)",
    height: "var(--sk-input-height)",
    borderRadius: "var(--sk-input-radius)",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    ...wrapperStyle[state],
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "var(--sk-input-font-size)",
    fontFamily: "var(--sk-font-family)",
    color: isDisabled
      ? "var(--sk-color-text-disabled)"
      : "var(--sk-color-text-body)",
    cursor: isDisabled ? "not-allowed" : "text",
  };

  const helperStyle: CSSProperties = {
    fontSize: "var(--sk-input-helper-size)",
    fontWeight: "var(--sk-font-weight-medium)",
    color: state === "error" ? "var(--sk-color-danger)" : "transparent",
    minHeight: "16px",
  };

  return (
    <div style={containerStyle}>
      <div style={labelRowStyle}>
        <span style={labelTextStyle}>{label}</span>
        <User
          size={12}
          color={isDisabled ? "var(--sk-color-text-disabled)" : "var(--sk-color-text-label)"}
        />
      </div>

      <div style={fieldStyle}>
        <input
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={inputStyle}
        />
        <ChevronDown
          size={16}
          color={isDisabled ? "var(--sk-color-text-disabled)" : "var(--sk-color-text-secondary)"}
        />
      </div>

      <span style={helperStyle}>{errorMessage}</span>
    </div>
  );
}
