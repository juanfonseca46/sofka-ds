import { useState } from "react";
import { Button, type ButtonVariant, type ButtonSize } from "../components/Button";
import { CodeBlock } from "./shared/CodeBlock";

const variants: ButtonVariant[] = ["primary", "secondary", "danger", "outline", "ghost"];
const sizes: ButtonSize[] = ["md", "sm", "icon"];

const tokenRows = [
  { token: "--sk-btn-height-md",     value: "40px",                    desc: "Alto botón mediano" },
  { token: "--sk-btn-height-sm",     value: "32px",                    desc: "Alto botón pequeño" },
  { token: "--sk-btn-height-icon",   value: "40px",                    desc: "Alto botón icono" },
  { token: "--sk-btn-padding-x-md",  value: "var(--sk-space-4)",       desc: "Padding horizontal md" },
  { token: "--sk-btn-padding-x-sm",  value: "var(--sk-space-3)",       desc: "Padding horizontal sm" },
  { token: "--sk-btn-radius",        value: "var(--sk-radius-md)",     desc: "Border radius" },
  { token: "--sk-btn-font-size-md",  value: "var(--sk-font-size-base)","desc": "Tamaño fuente md" },
  { token: "--sk-btn-font-size-sm",  value: "var(--sk-font-size-sm)",  desc: "Tamaño fuente sm" },
  { token: "--sk-btn-font-weight",   value: "var(--sk-font-weight-semibold)", desc: "Peso de fuente" },
  { token: "--sk-btn-gap",           value: "var(--sk-space-2)",       desc: "Gap entre icon y label" },
  { token: "--sk-color-brand",       value: "#3082F6",                 desc: "BG primary" },
  { token: "--sk-color-brand-hover", value: "#1a6de0",                 desc: "Hover primary" },
  { token: "--sk-color-danger",      value: "#F87171",                 desc: "BG danger" },
];

const propsRows = [
  { prop: "variant",           type: "ButtonVariant", defaultVal: '"primary"', desc: "Estilo visual del botón" },
  { prop: "size",              type: "ButtonSize",    defaultVal: '"md"',      desc: "Tamaño: md | sm | icon" },
  { prop: "label",             type: "string",        defaultVal: '"Botón"',   desc: "Texto del botón" },
  { prop: "showLeadingIcon",   type: "boolean",       defaultVal: "true",      desc: "Mostrar icono izquierdo" },
  { prop: "showTrailingIcon",  type: "boolean",       defaultVal: "true",      desc: "Mostrar icono derecho" },
  { prop: "disabled",          type: "boolean",       defaultVal: "false",     desc: "Estado deshabilitado" },
  { prop: "onClick",           type: "() => void",    defaultVal: "–",         desc: "Handler de click" },
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

export function ButtonPage() {
  const [activeVariant, setActiveVariant] = useState<ButtonVariant>("primary");
  const [activeSize, setActiveSize] = useState<ButtonSize>("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Button</h1>
        <p className="page-description">
          Elemento de acción principal. Disponible en 5 variantes, 3 tamaños y
          estados habilitado / deshabilitado. Todos los valores de color, tamaño
          y radio se controlan vía tokens CSS.
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
                className={`control-btn${activeVariant === v ? " selected" : ""}`}
                onClick={() => setActiveVariant(v)}
              >{v}</button>
            ))}
            <span className="control-label" style={{ marginLeft: 8 }}>Tamaño</span>
            {sizes.map((s) => (
              <button
                key={s}
                className={`control-btn${activeSize === s ? " selected" : ""}`}
                onClick={() => setActiveSize(s)}
              >{s}</button>
            ))}
            <span className="control-label" style={{ marginLeft: 8 }}>Estado</span>
            <button
              className={`control-btn${disabled ? " selected" : ""}`}
              onClick={() => setDisabled(!disabled)}
            >disabled</button>
          </div>
          <div className="preview-canvas">
            <Button variant={activeVariant} size={activeSize} disabled={disabled} label="Botón" />
          </div>
        </div>
      </div>

      {/* Showcase de variantes */}
      <div className="doc-section">
        <h2 className="section-title">Todas las variantes</h2>
        <div style={{ background: "var(--sk-white)", border: "1px solid var(--sk-color-border-light)", borderRadius: 12, padding: "8px 24px" }}>
          {[
            { label: "Enabled (md)", items: variants.map(v => <Button key={v} variant={v} label="Botón" size="md" />) },
            { label: "Disabled (md)", items: variants.map(v => <Button key={v} variant={v} label="Botón" disabled />) },
            { label: "Small (sm)", items: variants.map(v => <Button key={v} variant={v} label="Botón" size="sm" />) },
            { label: "Icon", items: [<Button key="icon" variant="primary" size="icon" />] },
          ].map((row) => (
            <div key={row.label} className="variant-row">
              <span className="variant-row-label">{row.label}</span>
              {row.items}
            </div>
          ))}
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
        <CodeBlock code={buildCode(activeVariant, activeSize, disabled)} language="tsx" />
      </div>
    </div>
  );
}
