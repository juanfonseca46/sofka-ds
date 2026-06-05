import { useState } from "react";
import { ProductCard, type ProductCardLayout } from "../components/ProductCard";
import type { BadgeVariant } from "../components/Badge";
import { CodeBlock } from "./shared/CodeBlock";

const layouts: ProductCardLayout[] = ["vertical", "horizontal"];
const badges: (BadgeVariant | "none")[] = ["warning", "danger", "neutral", "none"];

const tokenRows = [
  { token: "--sk-card-radius",       value: "var(--sk-radius-lg)",          desc: "Radio de la tarjeta (12px)" },
  { token: "--sk-card-padding",      value: "var(--sk-space-3)",            desc: "Padding interior (12px)" },
  { token: "--sk-card-border-color", value: "var(--sk-color-border-light)", desc: "Color del borde" },
  { token: "--sk-card-image-radius", value: "var(--sk-radius-md)",          desc: "Radio imagen en horizontal" },
  { token: "--sk-card-image-h",      value: "160px",                        desc: "Alto imagen en vertical" },
  { token: "--sk-card-image-w-horiz","value": "80px",                       desc: "Ancho imagen en horizontal" },
  { token: "--sk-card-width",        value: "200px",                        desc: "Ancho fijo tarjeta vertical" },
  { token: "--sk-card-transition",   value: "box-shadow 150ms ease",        desc: "Animación hover" },
  { token: "--sk-shadow-md",         value: "0 4px 6px...",                 desc: "Sombra en hover" },
];

const propsRows = [
  { prop: "name",     type: "string",             defaultVal: '"Product name"', desc: "Nombre del producto" },
  { prop: "price",    type: "string",             defaultVal: '"$1,550"',       desc: "Precio formateado" },
  { prop: "quantity", type: "number",             defaultVal: "250",            desc: "Unidades disponibles" },
  { prop: "badge",    type: "BadgeVariant | \"none\"", defaultVal: '"warning"', desc: "Variante del badge de stock" },
  { prop: "imageSrc", type: "string",             defaultVal: "–",              desc: "URL de la imagen del producto" },
  { prop: "layout",   type: "ProductCardLayout",  defaultVal: '"vertical"',     desc: "Orientación de la tarjeta" },
  { prop: "onClick",  type: "() => void",         defaultVal: "–",              desc: "Handler de click" },
];

function buildCode(layout: ProductCardLayout, badge: BadgeVariant | "none") {
  return `import { ProductCard } from "sofka-ds/components/ProductCard";

<ProductCard
  name="Camisa Azul"
  price="$1,550"
  quantity={120}
  badge="${badge}"
  imageSrc="/assets/product.jpg"
  layout="${layout}"
  onClick={() => console.log("click")}
/>`;
}

export function ProductCardPage() {
  const [layout, setLayout] = useState<ProductCardLayout>("vertical");
  const [badge, setBadge] = useState<BadgeVariant | "none">("warning");

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Product Card</h1>
        <p className="page-description">
          Tarjeta de producto con imagen, nombre, precio, cantidad y badge de stock.
          Soporta layout vertical (catálogo) u horizontal (lista). Todos los
          radios, espaciados y colores provienen de tokens.
        </p>
      </div>

      {/* Preview interactivo */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Layout</span>
            {layouts.map((l) => (
              <button
                key={l}
                className={`control-btn${layout === l ? " selected" : ""}`}
                onClick={() => setLayout(l)}
              >{l}</button>
            ))}
            <span className="control-label" style={{ marginLeft: 8 }}>Badge</span>
            {badges.map((b) => (
              <button
                key={b}
                className={`control-btn${badge === b ? " selected" : ""}`}
                onClick={() => setBadge(b)}
              >{b}</button>
            ))}
          </div>
          <div className="preview-canvas" style={{ justifyContent: layout === "horizontal" ? "stretch" : "center" }}>
            <div style={{ width: layout === "horizontal" ? "100%" : "auto" }}>
              <ProductCard
                name="Camisa Azul"
                price="$1,550"
                quantity={120}
                badge={badge}
                layout={layout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Todas las variantes */}
      <div className="doc-section">
        <h2 className="section-title">Todas las variantes</h2>
        <div style={{ background: "var(--sk-white)", border: "1px solid var(--sk-color-border-light)", borderRadius: 12, padding: "24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Vertical</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
            {(["warning", "danger", "neutral"] as BadgeVariant[]).map((b) => (
              <ProductCard key={b} name="Product name" price="$1,550" quantity={120} badge={b} layout="vertical" />
            ))}
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Horizontal</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
            {(["warning", "danger", "neutral"] as BadgeVariant[]).map((b) => (
              <ProductCard key={b} name="Product name" price="$1,550" quantity={120} badge={b} layout="horizontal" />
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
        <CodeBlock code={buildCode(layout, badge)} language="tsx" />
      </div>
    </div>
  );
}
