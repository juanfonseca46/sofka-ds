import { useState } from "react";
import { Home, Search } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { CodeBlock } from "./shared/CodeBlock";

export function PageHeaderPage() {
  /* ── controles del preview ── */
  const [showLeftIcon,  setShowLeftIcon]  = useState(false);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [showSubtitle,  setShowSubtitle]  = useState(true);

  const codeSnippet = `import { PageHeader } from "./components/PageHeader";

// Variante Home — sin icono izquierdo, con subtítulo
<PageHeader
  title="Tu almacén"
  subtitle="Gestión de inventario"
  showSubtitle={true}
  showLeftIcon={false}
  showRightIcon={true}
/>

// Variante Inventario — con back, sin subtítulo
<PageHeader
  title="Inventario"
  showSubtitle={false}
  showLeftIcon={true}
  showRightIcon={true}
  onLeftClick={() => navigate(-1)}
/>

// Íconos personalizados
<PageHeader
  title="Búsqueda"
  showLeftIcon={true}
  leftIcon={<Home size={20} />}
  rightIcon={<Search size={20} />}
/>`;

  const tokenRows = [
    { token: "--sk-color-surface",        uso: "Fondo del header" },
    { token: "--sk-space-8",              uso: "Padding top (32px)" },
    { token: "--sk-space-4",              uso: "Padding lateral + gap entre elementos" },
    { token: "--sk-space-2",              uso: "Gap entre título y subtítulo" },
    { token: "--sk-font-size-2xl",        uso: "Tamaño título (24px)" },
    { token: "--sk-font-weight-semibold", uso: "Peso del título" },
    { token: "--sk-color-text-primary",   uso: "Color del título" },
    { token: "--sk-font-size-base",       uso: "Tamaño subtítulo (14px)" },
    { token: "--sk-font-weight-normal",   uso: "Peso del subtítulo" },
    { token: "--sk-color-text-body",      uso: "Color del subtítulo" },
    { token: "--sk-color-surface-subtle", uso: "Fondo del botón back" },
    { token: "--sk-gray-600",             uso: "Color icono back" },
    { token: "--sk-color-brand",          uso: "Color icono derecho (acción)" },
    { token: "--sk-color-brand-bg",       uso: "Hover del botón derecho" },
    { token: "--sk-radius-md",            uso: "Border radius de los botones (8px)" },
  ];

  const propRows = [
    { prop: "title",          type: "string",      def: "—",       desc: "Texto del título principal. Requerido" },
    { prop: "subtitle",       type: "string",      def: "—",       desc: "Texto del subtítulo. Opcional" },
    { prop: "showSubtitle",   type: "boolean",     def: "true",    desc: "Muestra u oculta el subtítulo" },
    { prop: "showLeftIcon",   type: "boolean",     def: "false",   desc: "Muestra el botón izquierdo (back / nav)" },
    { prop: "leftIcon",       type: "ReactNode",   def: "ChevronLeft", desc: "Icono personalizado para el botón izquierdo" },
    { prop: "showRightIcon",  type: "boolean",     def: "true",    desc: "Muestra el botón derecho (acción)" },
    { prop: "rightIcon",      type: "ReactNode",   def: "Bell",    desc: "Icono personalizado para el botón derecho" },
    { prop: "onLeftClick",    type: "() => void",  def: "—",       desc: "Callback al hacer click en el botón izquierdo" },
    { prop: "onRightClick",   type: "() => void",  def: "—",       desc: "Callback al hacer click en el botón derecho" },
  ];

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componentes</span>
        <h1 className="page-title">Page Header</h1>
        <p className="page-description">
          Encabezado de pantalla para apps móviles. Soporta dos variantes principales:
          <strong> Home</strong> (sin navegación atrás, con subtítulo) e{" "}
          <strong>Inventario</strong> (con botón back, sin subtítulo). Todos los
          íconos y textos son configurables mediante props.
        </p>
      </div>

      {/* ── Preview ───────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          {/* Controles */}
          <div className="preview-controls">
            <span className="control-label">Izquierdo</span>
            <button
              className={`control-btn${showLeftIcon ? " selected" : ""}`}
              onClick={() => setShowLeftIcon(true)}
            >Con back</button>
            <button
              className={`control-btn${!showLeftIcon ? " selected" : ""}`}
              onClick={() => setShowLeftIcon(false)}
            >Sin back</button>

            <span className="control-label" style={{ marginLeft: 8 }}>Subtítulo</span>
            <button
              className={`control-btn${showSubtitle ? " selected" : ""}`}
              onClick={() => setShowSubtitle(true)}
            >Visible</button>
            <button
              className={`control-btn${!showSubtitle ? " selected" : ""}`}
              onClick={() => setShowSubtitle(false)}
            >Oculto</button>

            <span className="control-label" style={{ marginLeft: 8 }}>Derecho</span>
            <button
              className={`control-btn${showRightIcon ? " selected" : ""}`}
              onClick={() => setShowRightIcon(true)}
            >Con icono</button>
            <button
              className={`control-btn${!showRightIcon ? " selected" : ""}`}
              onClick={() => setShowRightIcon(false)}
            >Sin icono</button>
          </div>

          {/* Canvas */}
          <div className="preview-canvas" style={{ padding: 0, flexDirection: "column", gap: 0 }}>
            {/* Simulación de pantalla móvil */}
            <div style={{
              width: 375,
              margin: "32px auto",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
            }}>
              <PageHeader
                title="Tu almacén"
                subtitle="Gestión de inventario"
                showSubtitle={showSubtitle}
                showLeftIcon={showLeftIcon}
                showRightIcon={showRightIcon}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Variantes ─────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Variantes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              label: "Home — título + subtítulo",
              props: { title: "Tu almacén", subtitle: "Gestión de inventario",
                showSubtitle: true, showLeftIcon: false, showRightIcon: true },
            },
            {
              label: "Inventario — con back, sin subtítulo",
              props: { title: "Inventario", showSubtitle: false,
                showLeftIcon: true, showRightIcon: true },
            },
            {
              label: "Solo título — sin iconos",
              props: { title: "Movimientos", showSubtitle: false,
                showLeftIcon: false, showRightIcon: false },
            },
            {
              label: "Íconos personalizados",
              props: { title: "Búsqueda", showSubtitle: false,
                showLeftIcon: true, leftIcon: <Home size={20} strokeWidth={2.5} />,
                showRightIcon: true, rightIcon: <Search size={20} strokeWidth={1.8} /> },
            },
          ].map(({ label, props }) => (
            <div key={label}>
              <p style={{
                fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
              }}>{label}</p>
              <div style={{
                width: 375, borderRadius: 12, overflow: "hidden",
                border: "1px solid var(--sk-color-border-light)",
              }}>
                <PageHeader {...props} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens ────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Tokens utilizados</h2>
        <table className="doc-table">
          <thead>
            <tr><th>Token</th><th>Uso en el componente</th></tr>
          </thead>
          <tbody>
            {tokenRows.map((t) => (
              <tr key={t.token}>
                <td><span className="token-name">{t.token}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{t.uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Props ─────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Props</h2>
        <table className="doc-table">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            {propRows.map((p) => (
              <tr key={p.prop}>
                <td><span className="token-name">{p.prop}</span></td>
                <td><span className="prop-type">{p.type}</span></td>
                <td><span className="prop-default">{p.def}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Code ──────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código</h2>
        <CodeBlock code={codeSnippet} language="tsx" />
      </div>
    </div>
  );
}
