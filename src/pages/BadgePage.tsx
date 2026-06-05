import { useState } from "react";
import { Badge, type BadgeVariant } from "../components/Badge";
import { CodeBlock } from "./shared/CodeBlock";

const variants: BadgeVariant[] = ["warning", "danger", "neutral"];

const tokenRows = [
  { token: "--sk-badge-padding-x",   value: "var(--sk-space-2)", desc: "Padding horizontal" },
  { token: "--sk-badge-padding-y",   value: "2px",               desc: "Padding vertical" },
  { token: "--sk-badge-radius",      value: "var(--sk-radius-sm)",  desc: "Redondeo cuadrado (4px)" },
  { token: "--sk-badge-font-size",   value: "var(--sk-font-size-xs)", desc: "Tamaño de fuente (11px)" },
  { token: "--sk-badge-font-weight", value: "var(--sk-font-weight-semibold)", desc: "Peso de fuente" },
  { token: "--sk-color-warning-bg",    value: "#FEF9C3", desc: "Fondo warning" },
  { token: "--sk-color-warning-text",  value: "#CA8A04", desc: "Texto warning" },
  { token: "--sk-color-warning-border",value: "#FDE047", desc: "Borde warning" },
  { token: "--sk-color-danger-bg",     value: "#FEE2E2", desc: "Fondo danger" },
  { token: "--sk-color-danger",        value: "#F87171", desc: "Texto danger" },
  { token: "--sk-color-danger-muted",  value: "#FCA5A5", desc: "Borde danger" },
  { token: "--sk-color-surface-subtle","value": "#F3F4F6", desc: "Fondo neutral" },
  { token: "--sk-color-text-secondary","value": "#6B7280", desc: "Texto neutral" },
  { token: "--sk-color-border",        value: "#D1D5DB", desc: "Borde neutral" },
];

const propsRows = [
  { prop: "variant", type: "BadgeVariant", defaultVal: '"warning"', desc: "Estilo semántico del badge" },
  { prop: "label",   type: "string",       defaultVal: "–",         desc: "Sobreescribe el texto por defecto" },
];

function buildCode(variant: BadgeVariant) {
  const labels: Record<BadgeVariant, string> = {
    warning: "Pocas und.",
    danger: "Últimas und.",
    neutral: "Agotado",
  };
  return `import { Badge } from "sofka-ds/components/Badge";

<Badge variant="${variant}" label="${labels[variant]}" />`;
}

export function BadgePage() {
  const [active, setActive] = useState<BadgeVariant>("warning");

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Badge</h1>
        <p className="page-description">
          Etiqueta de estado para indicar disponibilidad de stock. 3 variantes
          semánticas: warning (pocas unidades), danger (últimas unidades) y
          neutral (agotado).
        </p>
      </div>

      {/* Preview interactivo */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Variante</span>
            {variants.map((v) => (
              <button
                key={v}
                className={`control-btn${active === v ? " selected" : ""}`}
                onClick={() => setActive(v)}
              >{v}</button>
            ))}
          </div>
          <div className="preview-canvas">
            <Badge variant={active} />
          </div>
        </div>
      </div>

      {/* Todas las variantes */}
      <div className="doc-section">
        <h2 className="section-title">Todas las variantes</h2>
        <div style={{ background: "var(--sk-white)", border: "1px solid var(--sk-color-border-light)", borderRadius: 12, padding: "24px", display: "flex", gap: 12, alignItems: "center" }}>
          {variants.map((v) => <Badge key={v} variant={v} />)}
        </div>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="section-title">Tokens utilizados</h2>
        <table className="doc-table">
          <thead><tr><th>Token</th><th>Valor</th><th>Descripción</th></tr></thead>
          <tbody>
            {tokenRows.map((r) => (
              <tr key={r.token}>
                <td><span className="token-name">{r.token}</span></td>
                <td><span className="token-value">{r.value}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="section-title">Props</h2>
        <table className="doc-table">
          <thead><tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr></thead>
          <tbody>
            {propsRows.map((r) => (
              <tr key={r.prop}>
                <td style={{ fontWeight: 500 }}>{r.prop}</td>
                <td><span className="prop-type">{r.type}</span></td>
                <td><span className="prop-default">{r.defaultVal}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Código */}
      <div className="doc-section">
        <h2 className="section-title">Código de implementación</h2>
        <CodeBlock code={buildCode(active)} language="tsx" />
      </div>
    </div>
  );
}
