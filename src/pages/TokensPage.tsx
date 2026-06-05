import { CodeBlock } from "./shared/CodeBlock";

/* ── Paleta organizada por sección, de más fuerte a más suave ── */
const colorSections = [
  {
    label: "Primarios — Azul",
    colors: [
      { name: "--sk-blue-700", hex: "#1559c7" },
      { name: "--sk-blue-600", hex: "#1a6de0" },
      { name: "--sk-blue-500", hex: "#3082F6" },
      { name: "--sk-blue-300", hex: "#93C5FD" },
      { name: "--sk-blue-200", hex: "#BFDBFE" },
      { name: "--sk-blue-100", hex: "#DBEAFE" },
      { name: "--sk-blue-50",  hex: "#EFF6FF" },
    ],
  },
  {
    label: "Danger — Rojo",
    colors: [
      { name: "--sk-red-500",  hex: "#EF4444" },
      { name: "--sk-red-400",  hex: "#F87171" },
      { name: "--sk-red-300",  hex: "#FCA5A5" },
      { name: "--sk-red-100",  hex: "#FEE2E2" },
      { name: "--sk-red-50",   hex: "#FFF5F5" },
    ],
  },
  {
    label: "Warning — Amarillo",
    colors: [
      { name: "--sk-yellow-600", hex: "#CA8A04" },
      { name: "--sk-yellow-300", hex: "#FDE047" },
      { name: "--sk-yellow-100", hex: "#FEF9C3" },
    ],
  },
  {
    label: "Grises",
    colors: [
      { name: "--sk-gray-900", hex: "#111827" },
      { name: "--sk-gray-800", hex: "#1F2937" },
      { name: "--sk-gray-700", hex: "#374151" },
      { name: "--sk-gray-600", hex: "#4B5563" },
      { name: "--sk-gray-500", hex: "#6B7280" },
      { name: "--sk-gray-400", hex: "#9CA3AF" },
      { name: "--sk-gray-300", hex: "#D1D5DB" },
      { name: "--sk-gray-200", hex: "#E5E7EB" },
      { name: "--sk-gray-100", hex: "#F3F4F6" },
      { name: "--sk-gray-50",  hex: "#F9FAFB" },
    ],
  },
  {
    label: "Neutros",
    colors: [
      { name: "--sk-ink",   hex: "#424242" },
      { name: "--sk-black", hex: "#000000" },
      { name: "--sk-white", hex: "#FFFFFF" },
    ],
  },
];

const semanticColors = [
  { name: "--sk-color-brand",               value: "var(--sk-blue-500)",    desc: "Acción principal / brand" },
  { name: "--sk-color-brand-hover",         value: "var(--sk-blue-600)",    desc: "Hover del brand" },
  { name: "--sk-color-brand-active",        value: "var(--sk-blue-700)",    desc: "Estado activo/pressed" },
  { name: "--sk-color-brand-subtle",        value: "var(--sk-blue-300)",    desc: "Secondary button fill" },
  { name: "--sk-color-brand-muted",         value: "var(--sk-blue-200)",    desc: "Disabled primary" },
  { name: "--sk-color-brand-bg",            value: "var(--sk-blue-50)",     desc: "Fondos con tinte brand" },
  { name: "--sk-color-danger",              value: "var(--sk-red-400)",     desc: "Acciones destructivas" },
  { name: "--sk-color-danger-muted",        value: "var(--sk-red-300)",     desc: "Danger disabled / borde" },
  { name: "--sk-color-danger-bg",           value: "var(--sk-red-100)",     desc: "Fondo danger suave" },
  { name: "--sk-color-warning-bg",          value: "var(--sk-yellow-100)",  desc: "Fondo badge warning" },
  { name: "--sk-color-warning-text",        value: "var(--sk-yellow-600)",  desc: "Texto badge warning" },
  { name: "--sk-color-warning-border",      value: "var(--sk-yellow-300)",  desc: "Borde badge warning" },
  { name: "--sk-color-text-primary",        value: "var(--sk-gray-900)",    desc: "Texto principal" },
  { name: "--sk-color-text-body",           value: "var(--sk-gray-700)",    desc: "Cuerpo de texto" },
  { name: "--sk-color-text-secondary",      value: "var(--sk-gray-500)",    desc: "Texto secundario / hint" },
  { name: "--sk-color-text-disabled",       value: "var(--sk-gray-400)",    desc: "Texto deshabilitado" },
  { name: "--sk-color-text-on-brand",       value: "var(--sk-white)",       desc: "Texto sobre fondo brand" },
  { name: "--sk-color-surface",             value: "var(--sk-white)",       desc: "Fondo principal" },
  { name: "--sk-color-surface-muted",       value: "var(--sk-gray-50)",     desc: "Input disabled BG" },
  { name: "--sk-color-surface-subtle",      value: "var(--sk-gray-100)",    desc: "Chips, imágenes placeholder" },
  { name: "--sk-color-border",              value: "var(--sk-gray-300)",    desc: "Bordes por defecto" },
  { name: "--sk-color-border-light",        value: "var(--sk-gray-200)",    desc: "Bordes suaves / cards" },
  { name: "--sk-color-border-focus-brand",  value: "var(--sk-blue-500)",    desc: "Focus ring input activo" },
  { name: "--sk-color-border-focus-danger", value: "var(--sk-red-400)",     desc: "Focus ring input error" },
];

const spacing = [
  { name: "--sk-space-1",  px: "4px"  },
  { name: "--sk-space-2",  px: "8px"  },
  { name: "--sk-space-3",  px: "12px" },
  { name: "--sk-space-4",  px: "16px" },
  { name: "--sk-space-5",  px: "20px" },
  { name: "--sk-space-6",  px: "24px" },
  { name: "--sk-space-8",  px: "32px" },
  { name: "--sk-space-10", px: "40px" },
  { name: "--sk-space-12", px: "48px" },
];

const radii = [
  { name: "--sk-radius-sm",   px: "4px",    desc: "Badges, chips pequeños" },
  { name: "--sk-radius-md",   px: "8px",    desc: "Botones, inputs" },
  { name: "--sk-radius-lg",   px: "12px",   desc: "Cards, popovers" },
  { name: "--sk-radius-xl",   px: "16px",   desc: "Modales" },
  { name: "--sk-radius-2xl",  px: "20px",   desc: "Banners, sheets" },
  { name: "--sk-radius-3xl",  px: "32px",   desc: "Componentes destacados" },
  { name: "--sk-radius-full", px: "9999px", desc: "Pills, avatares, badges" },
];

/* ── Escala tipográfica combinada (Figma frame + sistema existente) ── */
const typographyScale = [
  {
    category: "Headings",
    items: [
      { token: "--sk-text-h1",  primitive: "--sk-font-size-4xl",  px: "40px", weight: "700 (Bold)",   role: "Heading / H1",         preview: "Sofka DS" },
      { token: "--sk-text-h2",  primitive: "--sk-font-size-3xl",  px: "32px", weight: "700 (Bold)",   role: "Heading / H2",         preview: "Sofka DS" },
      { token: "--sk-text-h3",  primitive: "--sk-font-size-2xl",  px: "24px", weight: "600 (Semibold)",role: "Heading / H3",         preview: "Sofka DS" },
      { token: "--sk-text-h4",  primitive: "--sk-font-size-xl",   px: "18px", weight: "600 (Semibold)",role: "Heading / H4",         preview: "Sofka DS" },
    ],
  },
  {
    category: "Body",
    items: [
      { token: "--sk-text-body-1", primitive: "--sk-font-size-base", px: "14px", weight: "400 (Normal)", role: "Body / B1",   preview: "Texto de cuerpo principal" },
      { token: "--sk-text-body-2", primitive: "--sk-font-size-sm",   px: "12px", weight: "400 (Normal)", role: "Body / B2",   preview: "Texto de cuerpo secundario" },
    ],
  },
  {
    category: "Alternativos",
    items: [
      { token: "--sk-text-label",  primitive: "--sk-font-size-xs",   px: "11px", weight: "500 (Medium)",  role: "Alternative / Label",  preview: "Label de campo" },
      { token: "--sk-text-button", primitive: "--sk-font-size-base",  px: "14px", weight: "600 (Semibold)",role: "Alternative / Button", preview: "Texto de botón" },
    ],
  },
  {
    category: "UI interno",
    items: [
      { token: "--sk-font-size-md", primitive: "–",                   px: "13px", weight: "400 (Normal)",  role: "Input text",           preview: "Texto en campo input" },
      { token: "--sk-font-size-lg", primitive: "–",                   px: "16px", weight: "600 (Semibold)",role: "Topbar title",          preview: "Título topbar" },
    ],
  },
];

const tokenImportCode = `/* Importa los tokens en tu CSS */
@import "sofka-ds/src/styles/tokens.css";

/* Escala tipográfica — aliases semánticos */
.titulo {
  font-size:   var(--sk-text-h1);   /* 40px */
  font-weight: var(--sk-font-weight-bold);
  font-family: var(--sk-font-family);
}

.subtitulo {
  font-size:   var(--sk-text-h3);   /* 24px */
  font-weight: var(--sk-font-weight-semibold);
}

.cuerpo {
  font-size:   var(--sk-text-body-1); /* 14px */
  font-weight: var(--sk-font-weight-normal);
}`;

/* ── Helpers ─────────────────────────────────────────── */
function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

const fontWeightMap: Record<string, number> = {
  "700 (Bold)":    700,
  "600 (Semibold)":600,
  "500 (Medium)":  500,
  "400 (Normal)":  400,
};

export function TokensPage() {
  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Fundaciones</span>
        <h1 className="page-title">Tokens</h1>
        <p className="page-description">
          El sistema nervioso del DS. Tres capas:{" "}
          <strong>Primitivos</strong> (valores base) →{" "}
          <strong>Semánticos</strong> (intención) →{" "}
          <strong>Componentes</strong> (contexto). Modificar un primitivo
          propaga el cambio a todo el sistema.
        </p>
      </div>

      {/* Cómo usar */}
      <div className="doc-section">
        <h2 className="section-title">Cómo usar</h2>
        <CodeBlock code={tokenImportCode} language="css" />
      </div>

      {/* ── Paleta por secciones ───────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Paleta primitiva</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {colorSections.map((section) => (
            <div key={section.label}>
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                color: "var(--sk-color-text-disabled)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}>
                {section.label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {section.colors.map((c) => (
                  <div key={c.name} className="color-chip" style={{ width: 106 }}>
                    <div
                      className="color-chip-swatch"
                      style={{
                        background: c.hex,
                        border: c.hex === "#FFFFFF" ? "1px solid var(--sk-color-border-light)" : undefined,
                        height: 48,
                      }}
                    />
                    <div className="color-chip-info" style={{ borderTop: "1px solid var(--sk-color-border-light)" }}>
                      <p className="color-chip-name">
                        {c.name.replace("--sk-", "")}
                      </p>
                      <p className="color-chip-hex">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens semánticos ─────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Tokens semánticos</h2>
        <table className="doc-table">
          <thead>
            <tr><th>Token</th><th>Valor</th><th>Uso</th></tr>
          </thead>
          <tbody>
            {semanticColors.map((t) => (
              <tr key={t.name}>
                <td><span className="token-name">{t.name}</span></td>
                <td>
                  <span className="token-value" style={{ display: "flex", alignItems: "center", gap: 6 }}>
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

      {/* ── Espaciado ─────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Espaciado</h2>
        <div style={{
          background: "var(--sk-white)",
          border: "1px solid var(--sk-color-border-light)",
          borderRadius: 12,
          padding: "16px 24px",
        }}>
          {spacing.map((s) => (
            <div key={s.name} className="spacing-row">
              <span className="token-name" style={{ minWidth: 140 }}>{s.name}</span>
              <div className="spacing-bar-wrap">
                <div className="spacing-bar" style={{ width: parseInt(s.px) * 2 }} />
                <span className="spacing-px">{s.px}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Border Radius ─────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Border Radius</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "flex-end" }}>
          {radii.map((r) => {
            const size = Math.min(parseInt(r.px) || 64, 64);
            const boxSize = Math.max(size + 16, 56);
            return (
              <div key={r.name} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              }}>
                <div style={{
                  width: boxSize,
                  height: boxSize,
                  background: "var(--sk-color-brand-bg)",
                  border: "2px solid var(--sk-color-brand-muted)",
                  borderRadius: r.px,
                }} />
                <span className="token-name" style={{ fontSize: 10 }}>
                  {r.name.replace("--sk-", "")}
                </span>
                <span style={{ fontSize: 11, color: "var(--sk-color-text-secondary)", fontFamily: "var(--sk-font-mono)" }}>
                  {r.px}
                </span>
                <span style={{
                  fontSize: 10,
                  color: "var(--sk-color-text-disabled)",
                  textAlign: "center",
                  maxWidth: 80,
                  lineHeight: 1.4,
                }}>
                  {r.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tipografía ────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Escala tipográfica</h2>
        <p style={{ fontSize: 13, color: "var(--sk-color-text-secondary)", marginBottom: 20 }}>
          Fuente:{" "}
          <code style={{
            background: "var(--sk-color-brand-bg)",
            color: "var(--sk-color-brand)",
            padding: "2px 6px",
            borderRadius: 4,
            fontFamily: "var(--sk-font-mono)",
          }}>Poppins</code>
          {" "}— 8 estilos organizados en 4 categorías.
        </p>

        {/* Preview visual (fiel al frame de Figma) */}
        <div style={{
          background: "var(--sk-white)",
          border: "1px solid var(--sk-color-border-light)",
          borderRadius: 12,
          padding: "28px 32px",
          marginBottom: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}>
          {[
            { label: "Heading / H1 / 40px", size: "40px", weight: 700 },
            { label: "Heading / H2 / 32px", size: "32px", weight: 700 },
            { label: "Heading / H3 / 24px", size: "24px", weight: 600 },
            { label: "Heading / H4 / 18px", size: "18px", weight: 600 },
          ].map((s) => (
            <p key={s.label} style={{
              fontFamily: "var(--sk-font-family)",
              fontSize: s.size,
              fontWeight: s.weight,
              color: "var(--sk-color-text-primary)",
              lineHeight: 1.2,
            }}>
              {s.label}
            </p>
          ))}
          <div style={{ borderTop: "1px solid var(--sk-color-border-light)", paddingTop: 10, marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Body / B1 / 14px",            size: "14px", weight: 400 },
              { label: "Body / B2 / 12px",            size: "12px", weight: 400 },
            ].map((s) => (
              <p key={s.label} style={{
                fontFamily: "var(--sk-font-family)",
                fontSize: s.size,
                fontWeight: s.weight,
                color: "var(--sk-color-text-body)",
              }}>
                {s.label}
              </p>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--sk-color-border-light)", paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Alternative / Label / 11px",  size: "11px", weight: 500 },
              { label: "Alternative / Button / 14px", size: "14px", weight: 600 },
            ].map((s) => (
              <p key={s.label} style={{
                fontFamily: "var(--sk-font-family)",
                fontSize: s.size,
                fontWeight: s.weight,
                color: "var(--sk-color-text-secondary)",
              }}>
                {s.label}
              </p>
            ))}
          </div>
        </div>

        {/* Tabla de tokens */}
        {typographyScale.map((group) => (
          <div key={group.category} style={{ marginBottom: 24 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--sk-color-text-disabled)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}>
              {group.category}
            </p>
            <table className="doc-table">
              <thead>
                <tr><th>Token semántico</th><th>Primitivo</th><th>Tamaño</th><th>Peso</th><th>Rol</th><th>Preview</th></tr>
              </thead>
              <tbody>
                {group.items.map((t) => (
                  <tr key={t.token}>
                    <td><span className="token-name">{t.token}</span></td>
                    <td><span className="token-value" style={{ fontSize: 11 }}>{t.primitive}</span></td>
                    <td><span className="token-value">{t.px}</span></td>
                    <td style={{ fontSize: 12, color: "var(--sk-color-text-secondary)" }}>{t.weight}</td>
                    <td style={{ fontSize: 12, color: "var(--sk-color-text-secondary)" }}>{t.role}</td>
                    <td>
                      <span style={{
                        fontSize: t.px,
                        fontFamily: "var(--sk-font-family)",
                        fontWeight: fontWeightMap[t.weight] ?? 400,
                        color: "var(--sk-color-text-primary)",
                        lineHeight: 1,
                      }}>
                        {t.preview}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

// suppress unused import warning from isDark helper used only for future dark swatches
void isDark;
