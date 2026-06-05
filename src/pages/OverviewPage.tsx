import { Palette, Box, Type, Layers } from "lucide-react";

interface OverviewPageProps {
  navigate: (page: string) => void;
}

const cards = [
  {
    icon: <Palette size={20} />,
    title: "Tokens",
    desc: "Paleta de colores, espaciado, tipografía y radios que conforman el sistema.",
    page: "tokens",
  },
  {
    icon: <Box size={20} />,
    title: "Button",
    desc: "5 variantes, 3 tamaños y estados disabled. Acción principal de la UI.",
    page: "button",
  },
  {
    icon: <Type size={20} />,
    title: "Input",
    desc: "Campo de texto con 4 estados: default, active, disabled y error.",
    page: "input",
  },
  {
    icon: <Layers size={20} />,
    title: "Badge",
    desc: "Etiqueta de estado para stock: warning, danger y neutral.",
    page: "badge",
  },
  {
    icon: <Box size={20} />,
    title: "Product Card",
    desc: "Tarjeta de producto en layout vertical u horizontal con badges de stock.",
    page: "product-card",
  },
  {
    icon: <Layers size={20} />,
    title: "Topbar",
    desc: "Barra de navegación superior con título y controles de menú.",
    page: "topbar",
  },
];

export function OverviewPage({ navigate }: OverviewPageProps) {
  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">v1.0.0</span>
        <h1 className="page-title">Sofka Design System</h1>
        <p className="page-description">
          Sistema de diseño tokenizado para productos Sofka. Los componentes consumen
          CSS custom properties organizadas en tres capas: <strong>Primitivos → Semánticos → Componentes</strong>,
          lo que permite cambiar el look&amp;feel modificando únicamente el archivo de tokens.
        </p>
      </div>

      <div className="doc-section">
        <h2 className="section-title">Filosofía de tokens</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { layer: "Primitivos", desc: "Valores base: --sk-blue-500, --sk-gray-200…", color: "#e0f2fe", text: "#0369a1" },
            { layer: "Semánticos", desc: "Alias con intención: --sk-color-brand, --sk-color-danger…", color: "#f0fdf4", text: "#166534" },
            { layer: "Componentes", desc: "Específicos: --sk-btn-height-md, --sk-card-radius…", color: "#faf5ff", text: "#7e22ce" },
          ].map((l) => (
            <div key={l.layer} style={{
              background: l.color,
              borderRadius: 10,
              padding: "16px 18px",
              border: `1px solid ${l.color}`,
            }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: l.text, marginBottom: 4 }}>{l.layer}</p>
              <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-section">
        <h2 className="section-title">Componentes</h2>
        <div className="overview-grid">
          {cards.map((c) => (
            <div
              key={c.page}
              className="overview-card"
              onClick={() => navigate(c.page)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(c.page)}
            >
              <div className="overview-card-icon">{c.icon}</div>
              <p className="overview-card-title">{c.title}</p>
              <p className="overview-card-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-section">
        <h2 className="section-title">Stack técnico</h2>
        <table className="doc-table">
          <tbody>
            {[
              ["Framework", "React 18 + TypeScript"],
              ["Build", "Vite 6"],
              ["Estilos", "CSS Custom Properties (tokens.css)"],
              ["Iconos", "Lucide React"],
              ["Fuente", "Poppins (Google Fonts)"],
            ].map(([k, v]) => (
              <tr key={k}>
                <td style={{ width: 160, fontWeight: 500 }}>{k}</td>
                <td style={{ fontFamily: "var(--sk-font-mono)", fontSize: 13, color: "var(--sk-color-brand)" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
