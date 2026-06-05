import type { CSSProperties } from "react";

export type BadgeVariant = "warning" | "danger" | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
}

/* ── Token-driven styles ────────────────────────────────────── */
const variantStyle: Record<BadgeVariant, CSSProperties> = {
  warning: {
    backgroundColor: "var(--sk-color-warning-bg)",
    color: "var(--sk-color-warning-text)",
    border: "1px solid var(--sk-color-warning-border)",
  },
  danger: {
    backgroundColor: "var(--sk-color-danger-bg)",
    color: "var(--sk-color-danger)",
    border: "1px solid var(--sk-color-danger-muted)",
  },
  neutral: {
    backgroundColor: "var(--sk-color-surface-subtle)",
    color: "var(--sk-color-text-secondary)",
    border: "1px solid var(--sk-color-border)",
  },
};

const defaultLabel: Record<BadgeVariant, string> = {
  warning: "Pocas und.",
  danger:  "Últimas und.",
  neutral: "Agotado",
};

export function Badge({ variant = "warning", label }: BadgeProps) {
  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "var(--sk-badge-padding-y) var(--sk-badge-padding-x)",
    borderRadius: "var(--sk-badge-radius)",
    fontSize: "var(--sk-badge-font-size)",
    fontWeight: "var(--sk-badge-font-weight)",
    fontFamily: "var(--sk-font-family)",
    whiteSpace: "nowrap",
    ...variantStyle[variant],
  };

  return <span style={badgeStyle}>{label ?? defaultLabel[variant]}</span>;
}
