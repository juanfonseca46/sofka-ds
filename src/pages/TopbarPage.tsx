import { useState } from "react";
import { Topbar } from "../components/Topbar";
import { CodeBlock } from "./shared/CodeBlock";

const tokenRows = [
  { token: "--sk-topbar-height",      value: "52px",                      desc: "Altura de la barra" },
  { token: "--sk-topbar-padding-x",   value: "var(--sk-space-4)",         desc: "Padding horizontal (16px)" },
  { token: "--sk-topbar-bg",          value: "var(--sk-color-brand)",     desc: "Color de fondo (azul Sofka)" },
  { token: "--sk-topbar-color",       value: "var(--sk-white)",           desc: "Color del texto e iconos" },
  { token: "--sk-topbar-font-size",   value: "var(--sk-font-size-lg)",    desc: "Tamaño del título (16px)" },
  { token: "--sk-topbar-font-weight", value: "var(--sk-font-weight-semibold)", desc: "Peso del título" },
  { token: "--sk-color-brand",        value: "#3082F6",                   desc: "Referencia azul Sofka" },
];

const propsRows = [
  { prop: "title",       type: "string",    defaultVal: '"Título"', desc: "Texto central de la barra" },
  { prop: "onMenuLeft",  type: "() => void",defaultVal: "–",        desc: "Handler botón izquierdo" },
  { prop: "onMenuRight", type: "() => void",defaultVal: "–",        desc: "Handler botón derecho" },
];

const componentCode = `import { Topbar } from "sofka-ds/components/Topbar";

function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Topbar
        title="Mis Productos"
        onMenuLeft={() => setMenuOpen(!menuOpen)}
        onMenuRight={() => console.log("opciones")}
      />
      {/* contenido */}
    </div>
  );
}`;

export function TopbarPage() {
  const [title, setTitle] = useState("Título");

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Topbar</h1>
        <p className="page-description">
          Barra de navegación superior de ancho completo con fondo brand, título
          centrado y dos botones de menú (hamburger). El color, altura y tipografía
          se controlan por tokens.
        </p>
      </div>

      {/* Preview interactivo */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Título</span>
            {["Título", "Mis Productos", "Perfil", "Configuración"].map((t) => (
              <button
                key={t}
                className={`control-btn${title === t ? " selected" : ""}`}
                onClick={() => setTitle(t)}
              >{t}</button>
            ))}
          </div>
          <div className="preview-canvas" style={{ padding: 0, background: "var(--sk-gray-100)" }}>
            <div style={{ width: "100%" }}>
              <Topbar title={title} />
            </div>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="section-title">Ejemplos de uso</h2>
        <div style={{ background: "var(--sk-gray-100)", borderRadius: 12, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          {["Inicio", "Mis Pedidos", "Carrito", "Mi Cuenta"].map((t) => (
            <div key={t} style={{ borderRadius: 8, overflow: "hidden", boxShadow: "var(--sk-shadow-sm)" }}>
              <Topbar title={t} />
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
        <CodeBlock code={componentCode} language="tsx" />
      </div>
    </div>
  );
}
