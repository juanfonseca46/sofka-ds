/* eslint-disable @typescript-eslint/no-unused-vars */
import { CodeBlock } from "./shared/CodeBlock";

const primitiveColors = [
  { name: "--sk-blue-50",   hex: "#EFF6FF" },
  { name: "--sk-blue-100",  hex: "#DBEAFE" },
  { name: "--sk-blue-200",  hex: "#BFDBFE" },
  { name: "--sk-blue-300",  hex: "#93C5FD" },
  { name: "--sk-blue-500",  hex: "#3082F6" },
  { name: "--sk-blue-600",  hex: "#1a6de0" },
  { name: "--sk-blue-700",  hex: "#1559c7" },
  { name: "--sk-red-100",   hex: "#FEE2E2" },
  { name: "--sk-red-300",   hex: "#FCA5A5" },
  { name: "--sk-red-400",   hex: "#F87171" },
  { name: "--sk-red-500",   hex: "#EF4444" },
  { name: "--sk-yellow-100",hex: "#FEF9C3" },
  { name: "--sk-yellow-300",hex: "#FDE047" },
  { name: "--sk-yellow-600",hex: "#CA8A04" },
  { name: "--sk-gray-50",   hex: "#F9FAFB" },
  { name: "--sk-gray-100",  hex: "#F3F4F6" },
  { name: "--sk-gray-200",  hex: "#E5E7EB" },
  { name: "--sk-gray-300",  hex: "#D1D5DB" },
  { name: "--sk-gray-400",  hex: "#9CA3AF" },
  { name: "--sk-gray-500",  hex: "#6B7280" },
  { name: "--sk-gray-700",  hex: "#374151" },
  { name: "--sk-gray-900",  hex: "#111827" },
  { name: "--sk-white",     hex: "#FFFFFF" },
  { name: "--sk-ink",       hex: "#424242" },
];

const semanticColors = [
  { name: "--sk-color-brand",          value: "var(--sk-blue-500)",   desc: "Acción principal / brand" },
  { name: "--sk-color-brand-hover",    value: "var(--sk-blue-600)",   desc: "Hover del brand" },
  { name: "--sk-color-brand-active",   value: "var(--sk-blue-700)",   desc: "Estado activo/pressed" },
  { name: "--sk-color-brand-subtle",   value: "var(--sk-blue-300)",   desc: "Secondary button fill" },
  { name: "--sk-color-brand-muted",    value: "var(--sk-blue-200)",   desc: "Disabled primary" },
  { name: "--sk-color-brand-bg",       value: "var(--sk-blue-50)",    desc: "Fondos con tinte brand" },
  { name: "--sk-color-danger",         value: "var(--sk-red-400)",    desc: "Acciones destructivas" },
  { name: "--sk-color-danger-muted",   value: "var(--sk-red-300)",    desc: "Danger disabled" },
  { name: "--sk-color-warning-bg",     value: "var(--sk-yellow-100)", desc: "Fondo badge warning" },
  { name: "--sk-color-warning-text",   value: "var(--sk-yellow-600)", desc: "Texto badge warning" },
  { name: "--sk-color-text-primary",   value: "var(--sk-gray-900)",   desc: "Texto principal" },
  { name: "--sk-color-text-body",      value: "var(--sk-gray-700)",   desc: "Cuerpo de texto" },
  { name: "--sk-color-text-secondary", value: "var(--sk-gray-500)",   desc: "Texto secundario / hint" },
  { name: "--sk-color-text-disabled",  value: "var(--sk-gray-400)",   desc: "Texto deshabilitado" },
  { name: "--sk-color-text-on-brand",  value: "var(--sk-white)",      desc: "Texto sobre fondo brand" },
  { name: "--sk-color-surface",        value: "var(--sk-white)",      desc: "Fondo principal" },
  { name: "--sk-color-surface-muted",  value: "var(--sk-gray-50)",    desc: "Input disabled BG" },
  { name: "--sk-color-surface-subtle", value: "var(--sk-gray-100)",   desc: "Fondo imágenes / chips" },
  { name: "--sk-color-border",         value: "var(--sk-gray-300)",   desc: "Bordes por defecto" },
  { name: "--sk-color-border-light",   value: "var(--sk-gray-200)",   desc: "Bordes suaves / cards" },
];

const spacing = [
  { name: "--sk-space-1", px: "4px" },
  { name: "--sk-space-2", px: "8px" },
  { name: "--sk-space-3", px: "12px" },
  { name: "--sk-space-4", px: "16px" },
  { name: "--sk-space-5", px: "20px" },
  { name: "--sk-space-6", px: "24px" },
  { name: "--sk-space-8", px: "32px" },
  { name: "--sk-space-10", px: "40px" },
  { name: "--sk-space-12", px: "48px" },
];

const radii = [
  { name: "--sk-radius-sm",   px: "6px",    desc: "Chips, badges" },
  { name: "--sk-radius-md",   px: "8px",    desc: "Botones, inputs" },
  { name: "--sk-radius-lg",   px: "12px",   desc: "Cards, popovers" },
  { name: "--sk-radius-xl",   px: "16px",   desc: "Modales" },
  { name: "--sk-radius-full", px: "9999px", desc: "Pills, avatares" },
];

const typography = [
  { name: "--sk-font-size-xs",   value: "11px",  usage: "Helper text, badge" },
  { name: "--sk-font-size-sm",   value: "12px",  usage: "Labels, small button" },
  { name: "--sk-font-size-md",   value: "13px",  usage: "Input text" },
  { name: "--sk-font-size-base", value: "14px",  usage: "Body, button md" },
  { name: "--sk-font-size-lg",   value: "16px",  usage: "Topbar title" },
  { name: "--sk-font-size-xl",   value: "20px",  usage: "Section subtitles" },
  { name: "--sk-font-size-2xl",  value: "24px",  usage: "Page titles" },
];

const tokenImportCode = `/* Importa los tokens en tu CSS */
@import "sofka-ds/src/styles/tokens.css";

/* Úsalos en cualquier componente */
.mi-componente {
  background-color: var(--sk-color-brand);
  color:            var(--sk-color-text-on-brand);
  height:           var(--sk-btn-height-md);
  border-radius:    var(--sk-btn-radius);
  font-family:      var(--sk-font-family);
}`;

export function TokensPage() {
  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Fundaciones</span>
        <h1 className="page-title">Tokens</h1>
        <p className="page-description">
          Los tokens son el sistema nervioso del DS. Organizados en tres capas:
          Primitivos (valores), Semánticos (intención) y Componentes (contexto).
          Modificar un token primitivo propaga el cambio a todo el sistema.
        </p>
      </div>

      {/* Cómo usar */}
      <div className="doc-section">
        <h2 className="section-title">Cómo usar</h2>
        <CodeBlock code={tokenImportCode} language="css" />
      </div>

      {/* Paleta primitiva */}
      <div className="doc-section">
        <h2 className="section-title">Paleta primitiva</h2>
        <div className="color-grid">
          {primitiveColors.map((c) => (
            <div key={c.name} className="color-chip">
              <div className="color-chip-swatch" style={{ background: c.hex }} />
              <div className="color-chip-info">
                <p className="color-chip-name">{c.name.replace("--sk-", "")}</p>
                <p className="color-chip-hex">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tokens semánticos */}
      <div className="doc-section">
        <h2 className="section-title">Tokens semánticos</h2>
        <table className="doc-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Valor</th>
              <th>Uso</th>
            </tr>
          </thead>
          <tbody>
            {semanticColors.map((t) => (
              <tr key={t.name}>
                <td><span className="token-name">{t.name}</span></td>
                <td>
                  <span className="token-value" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      className="color-swatch"
                      style={{ background: `var(${t.name})` }}
                    />
                    {t.value}
                  </span>
                </td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Espaciado */}
      <div className="doc-section">
        <h2 className="section-title">Espaciado</h2>
        <div style={{ background: "var(--sk-white)", border: "1px solid var(--sk-color-border-light)", borderRadius: 12, padding: "16px 24px" }}>
          {spacing.map((s) => (
            <div key={s.name} className="spacing-row">
              <span className="token-name" style={{ minWidth: 140 }}>{s.name}</span>
              <div className="spacing-bar-wrap">
                <div
                  className="spacing-bar"
                  style={{ width: parseInt(s.px) * 2 }}
                />
                <span className="spacing-px">{s.px}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radios */}
      <div className="doc-section">
        <h2 className="section-title">Border Radius</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {radii.map((r) => (
            <div key={r.name} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8
            }}>
              <div style={{
                width: 64, height: 64,
                background: "var(--sk-color-brand-bg)",
                border: "2px solid var(--sk-color-brand-muted)",
                borderRadius: r.px === "9999px" ? "9999px" : r.px,
              }} />
              <span className="token-name" style={{ fontSize: 10 }}>{r.name.replace("--sk-", "")}</span>
              <span style={{ fontSize: 11, color: "var(--sk-color-text-secondary)" }}>{r.px}</span>
              <span style={{ fontSize: 11, color: "var(--sk-color-text-disabled)", textAlign: "center" }}>{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tipografía */}
      <div className="doc-section">
        <h2 className="section-title">Tipografía</h2>
        <p style={{ fontSize: 13, color: "var(--sk-color-text-secondary)", marginBottom: 16 }}>
          Fuente: <code style={{ background: "var(--sk-color-brand-bg)", color: "var(--sk-color-brand)", padding: "2px 6px", borderRadius: 4, fontFamily: "var(--sk-font-mono)" }}>Poppins</code> — importada desde Google Fonts
        </p>
        <table className="doc-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Uso</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {typography.map((t) => (
              <tr key={t.name}>
                <td><span className="token-name">{t.name}</span></td>
                <td><span className="token-value">{t.value}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{t.usage}</td>
                <td>
                  <span style={{ fontSize: t.value, fontFamily: "var(--sk-font-family)", color: "var(--sk-color-text-primary)" }}>
                    Sofka DS
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
