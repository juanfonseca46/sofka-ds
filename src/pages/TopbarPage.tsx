import { useState } from "react";
import { Topbar } from "../components/Topbar";
import { CodeBlock } from "./shared/CodeBlock";

const tokenRows = [
  { token: "--sk-topbar-height",      value: "52px",                           desc: "Altura de la barra" },
  { token: "--sk-topbar-padding-x",   value: "var(--sk-space-4)",              desc: "Padding horizontal (16px)" },
  { token: "--sk-topbar-bg",          value: "var(--sk-color-brand)",          desc: "Color de fondo (azul Sofka)" },
  { token: "--sk-topbar-color",       value: "var(--sk-white)",                desc: "Color del texto e iconos" },
  { token: "--sk-topbar-font-size",   value: "var(--sk-font-size-lg)",         desc: "Tamaño del título (16px)" },
  { token: "--sk-topbar-font-weight", value: "var(--sk-font-weight-semibold)", desc: "Peso del título" },
  { token: "--sk-color-brand",        value: "#3082F6",                        desc: "Referencia azul Sofka" },
];

const propsRows = [
  { prop: "title",         type: "string",    defaultVal: '"Título"', desc: "Texto: título centrado en la barra" },
  { prop: "showLeftIcon",  type: "boolean",   defaultVal: "true",     desc: "Boolean: muestra/oculta el icono izquierdo" },
  { prop: "showRightIcon", type: "boolean",   defaultVal: "true",     desc: "Boolean: muestra/oculta el icono derecho" },
  { prop: "onMenuLeft",    type: "() => void",defaultVal: "–",        desc: "Handler del botón izquierdo" },
  { prop: "onMenuRight",   type: "() => void",defaultVal: "–",        desc: "Handler del botón derecho" },
];

function buildCode(title: string, showLeft: boolean, showRight: boolean) {
  const lines = [
    `title="${title}"`,
    !showLeft  ? `showLeftIcon={false}` : null,
    !showRight ? `showRightIcon={false}` : null,
    `onMenuLeft={() => setMenuOpen(!menuOpen)}`,
    showRight ? `onMenuRight={() => console.log("opciones")}` : null,
  ].filter(Boolean).join("\n  ");
  return `import { Topbar } from "sofka-ds/components/Topbar";\n\n<Topbar\n  ${lines}\n/>`;
}

/* ── Showcase card ─────────────────────────────────────────── */
function ShowcaseCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--sk-white)",
      border: "1px solid var(--sk-color-border-light)",
      borderRadius: 12,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "10px 20px",
        borderBottom: "1px solid var(--sk-color-border-light)",
        background: "var(--sk-gray-50)",
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: "var(--sk-color-text-secondary)",
          textTransform: "uppercase", letterSpacing: "0.08em",
          fontFamily: "var(--sk-font-family)",
        }}>
          {title}
        </span>
      </div>
      <div style={{ background: "var(--sk-gray-100)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

export function TopbarPage() {
  const [title,      setTitle]      = useState("Título");
  const [showLeft,   setShowLeft]   = useState(true);
  const [showRight,  setShowRight]  = useState(true);

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Topbar</h1>
        <p className="page-description">
          Barra de navegación superior con fondo brand y 3 variables configurables:
          texto del título, visibilidad del icono izquierdo y visibilidad del icono
          derecho. El título permanece centrado independientemente de qué iconos
          estén visibles.
        </p>
      </div>

      {/* ── Preview interactivo ──────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">

            {/* Texto / título */}
            <span className="control-label">Título</span>
            {["Título", "Mis Productos", "Perfil", "Configuración"].map((t) => (
              <button key={t}
                className={`control-btn${title === t ? " selected" : ""}`}
                onClick={() => setTitle(t)}
              >{t}</button>
            ))}

            {/* Icono izquierdo */}
            <span className="control-label" style={{ marginLeft: 8 }}>Icono izq.</span>
            <button
              className={`control-btn${showLeft ? " selected" : ""}`}
              onClick={() => setShowLeft((v) => !v)}
            >
              {showLeft ? "visible" : "oculto"}
            </button>

            {/* Icono derecho */}
            <span className="control-label" style={{ marginLeft: 8 }}>Icono der.</span>
            <button
              className={`control-btn${showRight ? " selected" : ""}`}
              onClick={() => setShowRight((v) => !v)}
            >
              {showRight ? "visible" : "oculto"}
            </button>

          </div>

          <div className="preview-canvas" style={{ padding: 0, background: "var(--sk-gray-100)" }}>
            <Topbar
              title={title}
              showLeftIcon={showLeft}
              showRightIcon={showRight}
            />
          </div>
        </div>
      </div>

      {/* ── Variantes — cards ────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Todas las variantes</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

          <ShowcaseCard title="Ambos iconos (default)">
            <Topbar title="Título" />
          </ShowcaseCard>

          <ShowcaseCard title="Sin icono derecho">
            <Topbar title="Título" showRightIcon={false} />
          </ShowcaseCard>

          <ShowcaseCard title="Sin icono izquierdo">
            <Topbar title="Título" showLeftIcon={false} />
          </ShowcaseCard>

          <ShowcaseCard title="Solo título">
            <Topbar title="Título" showLeftIcon={false} showRightIcon={false} />
          </ShowcaseCard>

          <ShowcaseCard title="Texto largo">
            <Topbar title="Mi lista de productos favoritos" />
          </ShowcaseCard>

          <ShowcaseCard title="Texto corto">
            <Topbar title="Inicio" />
          </ShowcaseCard>

        </div>
      </div>

      {/* ── Tokens ──────────────────────────────────────── */}
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

      {/* ── Props ───────────────────────────────────────── */}
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

      {/* ── Código ──────────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código de implementación</h2>
        <CodeBlock code={buildCode(title, showLeft, showRight)} language="tsx" />
      </div>
    </div>
  );
}
