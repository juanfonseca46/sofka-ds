import { useState } from "react";
import { ShoppingBag, Package } from "lucide-react";
import { StatCard, type StatCardVariant } from "../components/StatCard";
import { CodeBlock } from "./shared/CodeBlock";

export function StatCardPage() {
  const [variant,       setVariant]       = useState<StatCardVariant>("default");
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [value,         setValue]         = useState("24");
  const [label,         setLabel]         = useState("Productos");

  const code = `import { StatCard } from "./components/StatCard";

// Default — total de productos
<StatCard
  variant="default"
  value={24}
  label="Productos"
  showRightIcon={true}
/>

// Warning — pocas unidades
<StatCard
  variant="warning"
  value={4}
  label="Pocas unidades"
/>

// Danger — sin stock
<StatCard
  variant="danger"
  value={1}
  label="Sin stock"
/>

// Ícono personalizado
<StatCard
  variant="default"
  value={12}
  label="Camisas"
  icon={<ShoppingBag size={20} />}
  showRightIcon={false}
/>`;

  const tokenRows = [
    { token: "--sk-color-surface",         uso: "Fondo variante default" },
    { token: "--sk-color-border",          uso: "Borde variante default" },
    { token: "--sk-color-warning-bg",      uso: "Fondo variante warning" },
    { token: "--sk-color-warning-border",  uso: "Borde variante warning" },
    { token: "--sk-color-warning-text",    uso: "Textos e ícono variante warning" },
    { token: "--sk-color-danger-bg",       uso: "Fondo variante danger" },
    { token: "--sk-color-danger-muted",    uso: "Borde variante danger" },
    { token: "--sk-color-danger",          uso: "Textos e ícono variante danger" },
    { token: "--sk-radius-md",             uso: "Border radius (8px)" },
    { token: "--sk-space-2",              uso: "Padding vertical (8px)" },
    { token: "--sk-space-4",              uso: "Padding horizontal y gap (16px)" },
    { token: "--sk-space-1",              uso: "Gap entre top row y label (4px)" },
    { token: "--sk-font-size-2xl",         uso: "Tamaño del valor (24px)" },
    { token: "--sk-font-weight-semibold",  uso: "Peso del valor" },
    { token: "--sk-font-size-xs",          uso: "Tamaño del label (11px)" },
    { token: "--sk-font-weight-medium",    uso: "Peso del label" },
    { token: "--sk-gray-600",              uso: "Color label default + ícono chevron" },
  ];

  const propRows = [
    { prop: "variant",       type: "'default' | 'warning' | 'danger'", def: "'default'", desc: "Estilo visual de la card" },
    { prop: "value",         type: "string | number",                   def: "—",         desc: "Valor principal. Requerido" },
    { prop: "label",         type: "string",                            def: "—",         desc: "Etiqueta descriptiva. Requerido" },
    { prop: "icon",          type: "ReactNode",                         def: "Package / AlertTriangle", desc: "Ícono izquierdo personalizado" },
    { prop: "showRightIcon", type: "boolean",                           def: "true",      desc: "Muestra u oculta el chevron derecho" },
    { prop: "onClick",       type: "() => void",                        def: "—",         desc: "Callback al hacer click" },
  ];

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componentes</span>
        <h1 className="page-title">Stat Card</h1>
        <p className="page-description">
          Card compacta para mostrar métricas clave en la pantalla Home.
          Tres variantes semánticas: <strong>default</strong> (total),{" "}
          <strong>warning</strong> (pocas unidades) y{" "}
          <strong>danger</strong> (sin stock). Íconos y textos configurables.
        </p>
      </div>

      {/* ── Preview interactivo ────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Variante</span>
            {(["default", "warning", "danger"] as StatCardVariant[]).map((v) => (
              <button key={v}
                className={`control-btn${variant === v ? " selected" : ""}`}
                onClick={() => setVariant(v)}
              >{v}</button>
            ))}

            <span className="control-label" style={{ marginLeft: 8 }}>Chevron</span>
            <button className={`control-btn${showRightIcon ? " selected" : ""}`}
              onClick={() => setShowRightIcon(true)}>Visible</button>
            <button className={`control-btn${!showRightIcon ? " selected" : ""}`}
              onClick={() => setShowRightIcon(false)}>Oculto</button>
          </div>

          {/* Inputs de texto */}
          <div style={{
            padding: "10px 20px", background: "var(--sk-color-surface-muted)",
            borderBottom: "1px solid var(--sk-color-border-light)",
            display: "flex", gap: 16, alignItems: "center",
          }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-secondary)",
              textTransform: "uppercase", letterSpacing: "0.06em", display: "flex",
              alignItems: "center", gap: 8 }}>
              Valor
              <input value={value} onChange={e => setValue(e.target.value)} style={{
                padding: "4px 8px", borderRadius: 6, border: "1px solid var(--sk-color-border)",
                background: "var(--sk-color-surface)", color: "var(--sk-color-text-primary)",
                fontFamily: "var(--sk-font-family)", fontSize: 12, width: 64,
              }} />
            </label>
            <label style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-secondary)",
              textTransform: "uppercase", letterSpacing: "0.06em", display: "flex",
              alignItems: "center", gap: 8 }}>
              Label
              <input value={label} onChange={e => setLabel(e.target.value)} style={{
                padding: "4px 8px", borderRadius: 6, border: "1px solid var(--sk-color-border)",
                background: "var(--sk-color-surface)", color: "var(--sk-color-text-primary)",
                fontFamily: "var(--sk-font-family)", fontSize: 12, width: 120,
              }} />
            </label>
          </div>

          <div className="preview-canvas">
            <StatCard
              variant={variant}
              value={value}
              label={label}
              showRightIcon={showRightIcon}
            />
          </div>
        </div>
      </div>

      {/* ── Las 3 variantes juntas ─────────── */}
      <div className="doc-section">
        <h2 className="section-title">Variantes</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <StatCard variant="default" value={24} label="Productos"     showRightIcon />
          <StatCard variant="warning" value={4}  label="Pocas unidades" showRightIcon />
          <StatCard variant="danger"  value={1}  label="Sin stock"      showRightIcon />
        </div>
      </div>

      {/* ── Sin chevron ───────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Sin chevron · Íconos personalizados</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <StatCard variant="default" value={12} label="Camisas"
            icon={<ShoppingBag size={20} strokeWidth={1.8} />} showRightIcon={false} />
          <StatCard variant="default" value={8}  label="Pantalones"
            icon={<Package size={20} strokeWidth={1.8} />} showRightIcon={false} />
          <StatCard variant="warning" value={3}  label="Accesorios"
            icon={<ShoppingBag size={20} strokeWidth={2} />} showRightIcon={false} />
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

      {/* ── Código ────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código</h2>
        <CodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}
