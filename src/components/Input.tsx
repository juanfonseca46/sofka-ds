import { ChevronDown, User, Info, AlertTriangle, AlertCircle } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

export type InputState    = "default" | "active" | "disabled" | "error";
export type HelperType    = "help" | "warning" | "error";

export interface InputProps {
  /* ── Label ──────────────────────────────────── */
  label?:         string;
  showLabelIcon?: boolean;    // Boolean: mostrar/ocultar icono del label
  labelIcon?:     ReactNode;  // Instance Swap: reemplazar icono del label

  /* ── Campo ──────────────────────────────────── */
  placeholder?:   string;
  showFieldIcon?: boolean;    // Boolean: mostrar/ocultar icono del campo
  fieldIcon?:     ReactNode;  // Instance Swap: reemplazar icono del campo

  /* ── Estado visual ──────────────────────────── */
  state?: InputState;

  /* ── Mensaje de soporte ─────────────────────── */
  showHelper?:    boolean;     // Boolean: mostrar/ocultar mensaje
  helperType?:    HelperType;  // Variable: help (azul) | warning (amarillo) | error (rojo)
  helperMessage?: string;      // Texto del mensaje

  /* ── Valor controlado ───────────────────────── */
  value?:    string;
  onChange?: (value: string) => void;
}

/* ── Token-driven field border/bg per state ─────────────────── */
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

/* ── Helper message config per type ────────────────────────── */
const helperConfig: Record<HelperType, { color: string; icon: ReactNode }> = {
  help: {
    color: "var(--sk-input-helper-color-help)",
    icon:  <Info size={12} />,
  },
  warning: {
    color: "var(--sk-input-helper-color-warning)",
    icon:  <AlertTriangle size={12} />,
  },
  error: {
    color: "var(--sk-input-helper-color-error)",
    icon:  <AlertCircle size={12} />,
  },
};

const helperDefaultText: Record<HelperType, string> = {
  help:    "Texto de ayuda",
  warning: "Atención, revisa este campo",
  error:   "Este campo es requerido",
};

export function Input({
  label         = "Label",
  showLabelIcon = true,
  labelIcon,
  placeholder   = "Placeholder",
  showFieldIcon = true,
  fieldIcon,
  state         = "default",
  showHelper    = false,
  helperType    = "help",
  helperMessage,
  value,
  onChange,
}: InputProps) {
  const isDisabled = state === "disabled";
  const iconColor  = isDisabled ? "var(--sk-color-text-disabled)" : "var(--sk-color-text-secondary)";

  /* Resolve swappable icons */
  const resolvedLabelIcon = labelIcon ?? <User size={12} />;
  const resolvedFieldIcon = fieldIcon ?? <ChevronDown size={16} />;

  /* Helper */
  const helper     = helperConfig[helperType];
  const helperText = helperMessage ?? helperDefaultText[helperType];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "var(--sk-input-gap)",
      fontFamily: "var(--sk-font-family)",
    }}>

      {/* ── Label row ─────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{
          fontSize: "var(--sk-input-label-size)",
          fontWeight: "var(--sk-input-label-weight)",
          color: labelColor[state],
        }}>
          {label}
        </span>

        {showLabelIcon && (
          <span style={{
            color: isDisabled ? "var(--sk-color-text-disabled)" : "var(--sk-color-text-label)",
            display: "flex",
            alignItems: "center",
          }}>
            {resolvedLabelIcon}
          </span>
        )}
      </div>

      {/* ── Field ─────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0 var(--sk-input-padding-x)",
        height: "var(--sk-input-height)",
        borderRadius: "var(--sk-input-radius)",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        gap: 8,
        ...wrapperStyle[state],
      }}>
        <input
          type="text"
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "var(--sk-input-font-size)",
            fontFamily: "var(--sk-font-family)",
            color: isDisabled ? "var(--sk-color-text-disabled)" : "var(--sk-color-text-body)",
            cursor: isDisabled ? "not-allowed" : "text",
            minWidth: 0,
          }}
        />

        {showFieldIcon && (
          <span style={{ color: iconColor, display: "flex", alignItems: "center", flexShrink: 0 }}>
            {resolvedFieldIcon}
          </span>
        )}
      </div>

      {/* ── Mensaje de soporte ────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--sk-input-helper-gap)",
        minHeight: 16,
        opacity: showHelper ? 1 : 0,
        transition: "opacity 150ms ease",
      }}>
        <span style={{ color: helper.color, display: "flex", alignItems: "center" }}>
          {helper.icon}
        </span>
        <span style={{
          fontSize: "var(--sk-input-helper-size)",
          fontWeight: "var(--sk-input-helper-weight)",
          color: helper.color,
          lineHeight: 1,
        }}>
          {helperText}
        </span>
      </div>

    </div>
  );
}
