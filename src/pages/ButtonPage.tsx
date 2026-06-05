import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../components/Button";
import { CodeBlock } from "./shared/CodeBlock";

const variants: ButtonVariant[] = ["primary", "secondary", "tertiary", "danger"];
const sizes: ButtonSize[] = ["lg", "md", "sm", "icon"];

const tokenRows = [
  { token: "--sk-btn-height-lg",     value: "48px",                          desc: "Alto botón large" },
  { token: "--sk-btn-height-md",     value: "40px",                          desc: "Alto botón medium" },
  { token: "--sk-btn-height-sm",     value: "32px",                          desc: "Alto botón small" },
  { token: "--sk-btn-height-icon",   value: "40px",                          desc: "Alto botón icono" },
  { token: "--sk-btn-padding-x-lg",  value: "var(--sk-space-6)",             desc: "Padding horizontal lg (24px)" },
  { token: "--sk-btn-padding-x-md",  value: "var(--sk-space-4)",             desc: "Padding horizontal md (16px)" },
  { token: "--sk-btn-padding-x-sm",  value: "var(--sk-space-3)",             desc: "Padding horizontal sm (12px)" },
  { token: "--sk-btn-radius",        value: "var(--sk-radius-md)",           desc: "Border radius (8px)" },
  { token: "--sk-btn-font-size-md",  value: "var(--sk-font-size-base)",      desc: "Tamaño fuente md/lg" },
  { token: "--sk-btn-font-size-sm",  value: "var(--sk-font-size-sm)",        desc: "Tamaño fuente sm" },
  { token: "--sk-btn-font-weight",   value: "var(--sk-font-weight-semibold)","desc": "Peso de fuente" },
  { token: "--sk-btn-gap",           value: "var(--sk-space-2)",             desc: "Gap entre icono y label" },
  { token: "--sk-color-brand",       value: "#3082F6",                       desc: "Fondo primary" },
  { token: "--sk-color-brand-hover", value: "#1a6de0",                       desc: "Hover primary" },
  { token: "--sk-color-danger",      value: "#F87171",                       desc: "Fondo danger" },
];

const propsRows = [
  { prop: "variant",          type: "ButtonVariant",  defaultVal: '"primary"', desc: "primary | secondary | tertiary | danger" },
  { prop: "size",             type: "ButtonSize",     defaultVal: '"md"',      desc: "lg | md | sm | icon" },
  { prop: "label",            type: "string",         defaultVal: '"Botón"',   desc: "Texto del botón" },
  { prop: "showLeadingIcon",  type: "boolean",        defaultVal: "true",      desc: "Muestra icono izquierdo" },
  { prop: "showTrailingIcon", type: "boolean",        defaultVal: "true",      desc: "Muestra icono derecho" },
  { prop: "disabled",         type: "boolean",        defaultVal: "false",     desc: "Estado deshabilitado" },
  { prop: "onClick",          type: "() => void",     defaultVal: "–",         desc: "Handler de click" },
];

function buildCode(variant: ButtonVariant, size: ButtonSize, disabled: boolean) {
  const attrs = [
    `variant="${variant}"`,
    size !== "md" ? `size="${size}"` : null,
    disabled ? "disabled" : null,
    size !== "icon" ? `label="Botón"` : null,
  ].filter(Boolean).join("\n  ");
  return `import { Button } from "sofka-ds/components/Button";\n\n<Button\n  ${attrs}\n/>`;
}

/* ── Showcase card ─────────────────────────────────────────── */
interface ShowcaseCardProps {
  title: string;
  children: React.ReactNode;
}

function ShowcaseCard({ title, children }: ShowcaseCardProps) {
  return (
    <div style={{
      background: "var(--sk-white)",
      border: "1px solid var(--sk-color-border-light)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      {/* Header de la card */}
      <div style={{
        padding: "10px 20px",
        borderBottom: "1px solid var(--sk-color-border-light)",
        background: "var(--sk-gray-50)",
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--sk-color-text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontFamily: "var(--sk-font-family)",
        }}>
          {title}
        </span>
      </div>
      {/* Botones en fila */}
      <div style={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        alignItems: "center",
      }}>
        {children}
      </div>
    </div>
  );
}

export function ButtonPage() {
  const [activeVariant, setActiveVariant] = useState<ButtonVariant>("primary");
  const [activeSize, setActiveSize] = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);

  /* Controles del preview — el orden que el usuario pidió:
     primary | disabled | secondary | tertiary | danger       */
  const variantControls: { label: string; action: () => void; active: boolean }[] = [
    { label: "primary",   action: () => { setActiveVariant("primary");   setDisabled(false); }, active: activeVariant === "primary"   && !disabled },
    { label: "disabled",  action: () => setDisabled((d) => !d),                                  active: disabled },
    { label: "secondary", action: () => { setActiveVariant("secondary"); setDisabled(false); }, active: activeVariant === "secondary" && !disabled },
    { label: "tertiary",  action: () => { setActiveVariant("tertiary");  setDisabled(false); }, active: activeVariant === "tertiary"  && !disabled },
    { label: "danger",    action: () => { setActiveVariant("danger");    setDisabled(false); }, active: activeVariant === "danger"    && !disabled },
  ];

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Button</h1>
        <p className="page-description">
          Elemento de acción principal. 4 variantes, 4 tamaños y estados
          habilitado / deshabilitado. Hover animado con elevación y cambio
          de color vía tokens CSS.
        </p>
      </div>

      {/* ── Preview interactivo ─────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            {/* Variantes en el orden pedido */}
            <span className="control-label">Variante</span>
            {variantControls.map((c) => (
              <button
                key={c.label}
                className={`control-btn${c.active ? " selected" : ""}`}
                onClick={c.action}
              >
                {c.label}
              </button>
            ))}

            {/* Tamaño */}
            <span className="control-label" style={{ marginLeft: 8 }}>Tamaño</span>
            {sizes.map((s) => (
              <button
                key={s}
                className={`control-btn${activeSize === s ? " selected" : ""}`}
                onClick={() => setActiveSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="preview-canvas">
            <Button
              variant={activeVariant}
              size={activeSize}
              disabled={disabled}
              label="Botón"
            />
          </div>
        </div>
      </div>

      {/* ── Todas las variantes — layout de cards ──────── */}
      <div className="doc-section">
        <h2 className="section-title">Todas las variantes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

          <ShowcaseCard title="Enabled">
            {variants.map((v) => (
              <Button key={v} variant={v} label="Botón" size="md" showTrailingIcon={false} />
            ))}
          </ShowcaseCard>

          <ShowcaseCard title="Disabled">
            {variants.map((v) => (
              <Button key={v} variant={v} label="Botón" size="md" showTrailingIcon={false} disabled />
            ))}
          </ShowcaseCard>

          <ShowcaseCard title="Large (L)">
            {variants.map((v) => (
              <Button key={v} variant={v} label="Botón" size="lg" showTrailingIcon={false} />
            ))}
          </ShowcaseCard>

          <ShowcaseCard title="Small (S)">
            {variants.map((v) => (
              <Button key={v} variant={v} label="Botón" size="sm" showTrailingIcon={false} />
            ))}
          </ShowcaseCard>

          <ShowcaseCard title="Con iconos (Medium)">
            {variants.map((v) => (
              <Button key={v} variant={v} label="Botón" size="md" />
            ))}
          </ShowcaseCard>

          <ShowcaseCard title="Icon button">
            {variants.map((v) => (
              <Button key={v} variant={v} size="icon" />
            ))}
          </ShowcaseCard>

        </div>
      </div>

      {/* ── Tokens ─────────────────────────────────────── */}
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

      {/* ── Props ──────────────────────────────────────── */}
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

      {/* ── Código ─────────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código de implementación</h2>
        <CodeBlock code={buildCode(activeVariant, activeSize, disabled)} language="tsx" />
      </div>
    </div>
  );
}
