import { MovementChart } from "../components/MovementChart";
import { CodeBlock }     from "./shared/CodeBlock";

export function MovementChartPage() {
  const code = `import { MovementChart } from "./components/MovementChart";

// Uso básico — todos los filtros
<MovementChart />

// Sin filtro de productos
<MovementChart showProductFilter={false} />

// Período inicial personalizado
<MovementChart defaultPeriod="30d" defaultProduct="camisas" />

// Título personalizado
<MovementChart title="Ventas semanales" defaultPeriod="7d" />`;

  const tokenRows = [
    { token: "--sk-color-surface",         uso: "Fondo de la card" },
    { token: "--sk-color-border-light",    uso: "Borde de la card y grid lines del chart" },
    { token: "--sk-radius-md",             uso: "Border radius (8px)" },
    { token: "--sk-space-4",               uso: "Padding de la card y gap general" },
    { token: "--sk-font-size-base",        uso: "Título (14px)" },
    { token: "--sk-font-weight-semibold",  uso: "Peso del título" },
    { token: "--sk-font-size-sm",          uso: "Texto del dropdown (12px — Body/2)" },
    { token: "--sk-font-size-xs",          uso: "Ticks de ejes X e Y (11px — Label)" },
    { token: "--sk-font-weight-medium",    uso: "Peso de los ticks" },
    { token: "--sk-gray-600",              uso: "Color ticks eje Y y placeholder dropdown" },
    { token: "--sk-color-text-primary",    uso: "Color ticks eje X" },
    { token: "--sk-color-border",          uso: "Borde dropdown" },
    { token: "--sk-color-brand",           uso: "Estado activo del dropdown y pills" },
    { token: "--sk-color-brand-bg",        uso: "Fondo activo dropdown y pills" },
    { token: "--sk-blue-300",              uso: "Color de la línea del chart (#93C5FD)" },
    { token: "--sk-blue-700",              uso: "Color de los dots del chart (#1559C7)" },
    { token: "--sk-shadow-md",             uso: "Sombra del menú desplegable" },
  ];

  const propRows = [
    { prop: "title",             type: "string",                                def: "'Movimientos'", desc: "Título de la card" },
    { prop: "defaultPeriod",     type: "'7d' | '30d' | '3m'",                  def: "'7d'",          desc: "Período inicial del chart" },
    { prop: "defaultProduct",    type: "'todos' | 'camisas' | 'pantalones' | 'accesorios'", def: "'todos'", desc: "Producto inicial seleccionado" },
    { prop: "showProductFilter", type: "boolean",                               def: "true",          desc: "Muestra u oculta los filtros de producto" },
  ];

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componentes</span>
        <h1 className="page-title">Movement Chart</h1>
        <p className="page-description">
          Card de gráfica lineal para visualizar movimientos de inventario.
          Incluye selector de período (7 días · 30 días · trimestre) y filtros
          opcionales por categoría de producto. La gráfica es completamente
          interactiva y está tokenizada con los colores del DS.
        </p>
      </div>

      {/* ── Preview default ─────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview — todos los filtros</h2>
        <div style={{ maxWidth: 420 }}>
          <MovementChart />
        </div>
      </div>

      {/* ── Sin filtro de productos ─────── */}
      <div className="doc-section">
        <h2 className="section-title">Sin filtro de productos</h2>
        <div style={{ maxWidth: 420 }}>
          <MovementChart showProductFilter={false} />
        </div>
      </div>

      {/* ── Variantes de período ────────── */}
      <div className="doc-section">
        <h2 className="section-title">Variantes de período</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {(["7d","30d","3m"] as const).map(p => (
            <div key={p}>
              <p style={{
                fontSize: 11, fontWeight: 600,
                color: "var(--sk-color-text-disabled)",
                textTransform: "uppercase", letterSpacing: "0.08em",
                marginBottom: 10,
              }}>
                {{ "7d": "7 días", "30d": "30 días", "3m": "Trimestre" }[p]}
              </p>
              <div style={{ maxWidth: 420 }}>
                <MovementChart defaultPeriod={p} showProductFilter={false} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tokens ──────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Tokens utilizados</h2>
        <table className="doc-table">
          <thead><tr><th>Token</th><th>Uso en el componente</th></tr></thead>
          <tbody>
            {tokenRows.map(t => (
              <tr key={t.token}>
                <td><span className="token-name">{t.token}</span></td>
                <td style={{ color: "var(--sk-color-text-secondary)", fontSize: 13 }}>{t.uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Props ───────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Props</h2>
        <table className="doc-table">
          <thead><tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr></thead>
          <tbody>
            {propRows.map(p => (
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

      {/* ── Código ──────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código</h2>
        <CodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}
