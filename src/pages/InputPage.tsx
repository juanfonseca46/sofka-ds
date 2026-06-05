import { useState } from "react";
import { Input, type InputState } from "../components/Input";
import { CodeBlock } from "./shared/CodeBlock";

const states: InputState[] = ["default", "active", "disabled", "error"];

const tokenRows = [
  { token: "--sk-input-height",       value: "40px",                      desc: "Alto del campo" },
  { token: "--sk-input-padding-x",    value: "var(--sk-space-3)",         desc: "Padding horizontal" },
  { token: "--sk-input-radius",       value: "var(--sk-radius-md)",       desc: "Border radius" },
  { token: "--sk-input-font-size",    value: "var(--sk-font-size-md)",    desc: "Tamaño texto input" },
  { token: "--sk-input-label-size",   value: "var(--sk-font-size-sm)",    desc: "Tamaño del label" },
  { token: "--sk-input-helper-size",  value: "var(--sk-font-size-xs)",    desc: "Tamaño mensaje helper" },
  { token: "--sk-input-label-weight", value: "var(--sk-font-weight-medium)", desc: "Peso del label" },
  { token: "--sk-color-border",               value: "#D1D5DB", desc: "Borde default" },
  { token: "--sk-color-border-focus-brand",   value: "#3082F6", desc: "Borde active" },
  { token: "--sk-color-border-focus-danger",  value: "#F87171", desc: "Borde error" },
  { token: "--sk-color-surface-muted",        value: "#F9FAFB", desc: "BG disabled" },
  { token: "--sk-color-text-disabled",        value: "#9CA3AF", desc: "Texto disabled" },
  { token: "--sk-color-danger",               value: "#F87171", desc: "Color mensaje error" },
];

const propsRows = [
  { prop: "label",        type: "string",             defaultVal: '"Label"',         desc: "Texto del label" },
  { prop: "placeholder",  type: "string",             defaultVal: '"Placeholder"',   desc: "Texto de hint" },
  { prop: "state",        type: "InputState",         defaultVal: '"default"',       desc: "Estado visual" },
  { prop: "errorMessage", type: "string",             defaultVal: '"Mensaje de error"', desc: "Texto de error (visible en estado error)" },
  { prop: "value",        type: "string",             defaultVal: "–",               desc: "Valor controlado" },
  { prop: "onChange",     type: "(v: string) => void",defaultVal: "–",               desc: "Handler de cambio" },
];

function buildCode(state: InputState) {
  return `import { Input } from "sofka-ds/components/Input";

<Input
  label="Correo electrónico"
  placeholder="usuario@sofka.com"
  state="${state}"${state === "error" ? `\n  errorMessage="El correo no es válido"` : ""}
/>`;
}

export function InputPage() {
  const [activeState, setActiveState] = useState<InputState>("default");

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Input</h1>
        <p className="page-description">
          Campo de texto con label, icono, mensaje de ayuda y 4 estados visuales.
          El borde, sombra de foco y colores de texto se controlan exclusivamente
          por tokens CSS.
        </p>
      </div>

      {/* Preview interactivo */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Estado</span>
            {states.map((s) => (
              <button
                key={s}
                className={`control-btn${activeState === s ? " selected" : ""}`}
                onClick={() => setActiveState(s)}
              >{s}</button>
            ))}
          </div>
          <div className="preview-canvas" style={{ justifyContent: "center" }}>
            <div style={{ width: 260 }}>
              <Input
                label="Label"
                placeholder="Placeholder"
                state={activeState}
                errorMessage="Mensaje de error"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Todos los estados */}
      <div className="doc-section">
        <h2 className="section-title">Todos los estados</h2>
        <div style={{ background: "var(--sk-white)", border: "1px solid var(--sk-color-border-light)", borderRadius: 12, padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {states.map((s) => (
              <div key={s}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{s}</p>
                <Input label="Label" placeholder="Placeholder" state={s} errorMessage="Mensaje de error" />
              </div>
            ))}
          </div>
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
        <CodeBlock code={buildCode(activeState)} language="tsx" />
      </div>
    </div>
  );
}
