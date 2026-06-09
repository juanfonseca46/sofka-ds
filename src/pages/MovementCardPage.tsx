import { useState } from "react";
import { MovementCard, type MovementType } from "../components/MovementCard";
import { CodeBlock } from "./shared/CodeBlock";

export function MovementCardPage() {
  const [type,        setType]        = useState<MovementType>("entrada");
  const [dark,        setDark]        = useState(false);
  const [showChevron, setShowChevron] = useState(true);
  const [label,       setLabel]       = useState("Entrada #456");
  const [amount,      setAmount]      = useState("$450,000");

  const code = `import { MovementCard } from "./components/MovementCard";

// Entrada — light
<MovementCard type="entrada" label="Entrada #456" amount="$450,000" />

// Salida — light
<MovementCard type="salida" label="Salida #123"  amount="$450,000" />

// Entrada — dark
<MovementCard type="entrada" label="Entrada #456" amount="$450,000" dark />

// Salida — dark
<MovementCard type="salida" label="Salida #123"  amount="$450,000" dark />

// Lista completa
<div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--sk-color-border-light)" }}>
  <MovementCard type="entrada" label="Entrada #456" amount="$450,000" />
  <MovementCard type="salida"  label="Salida #123"  amount="$200,000" />
  <MovementCard type="entrada" label="Entrada #789" amount="$180,000" />
</div>`;

  const tokenRows = [
    { token: "--sk-color-success-bg",      uso: "Fondo ícono entrada (verde suave)" },
    { token: "--sk-color-success-icon",    uso: "Color ícono entrada (#22C55E)" },
    { token: "--sk-color-danger-bg",       uso: "Fondo ícono salida (rojo suave)" },
    { token: "--sk-color-danger-active",   uso: "Color ícono salida (#EF4444)" },
    { token: "--sk-color-surface",         uso: "Fondo card light" },
    { token: "--sk-color-surface-muted",   uso: "Hover card light" },
    { token: "--sk-color-text-primary",    uso: "Textos en modo claro" },
    { token: "--sk-gray-100",              uso: "Textos en modo oscuro (#F3F4F6)" },
    { token: "--sk-color-text-body",       uso: "Color chevron light" },
    { token: "--sk-color-border-light",    uso: "Separador entre cards en lista" },
    { token: "--sk-font-size-base",        uso: "Tamaño de label y monto (14px)" },
    { token: "--sk-font-weight-normal",    uso: "Peso del label" },
    { token: "--sk-font-weight-semibold",  uso: "Peso del monto" },
    { token: "--sk-space-2",               uso: "Padding izquierdo (8px)" },
    { token: "--sk-space-4",               uso: "Gap entre elementos (16px)" },
    { token: "--sk-radius-md",             uso: "Border radius del ícono (8px)" },
  ];

  const propRows = [
    { prop: "type",         type: "'entrada' | 'salida'", def: "—",      desc: "Tipo de movimiento. Requerido" },
    { prop: "label",        type: "string",               def: "—",      desc: "Texto superior del movimiento. Requerido" },
    { prop: "amount",       type: "string",               def: "—",      desc: "Monto o valor inferior. Requerido" },
    { prop: "dark",         type: "boolean",              def: "false",  desc: "Activa el fondo oscuro (#111827)" },
    { prop: "showChevron",  type: "boolean",              def: "true",   desc: "Muestra u oculta el chevron derecho" },
    { prop: "onClick",      type: "() => void",           def: "—",      desc: "Callback al hacer click" },
  ];

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componentes</span>
        <h1 className="page-title">Movement Card</h1>
        <p className="page-description">
          Card de fila para listar movimientos de inventario. Dos variantes de tipo:{" "}
          <strong>entrada</strong> (verde) y <strong>salida</strong> (rojo), cada una
          con soporte de <strong>modo oscuro</strong> explícito. Diseñada para
          usarse en listas con separador automático entre items.
        </p>
      </div>

      {/* ── Preview interactivo ──────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">
            <span className="control-label">Tipo</span>
            {(["entrada", "salida"] as MovementType[]).map(t => (
              <button key={t}
                className={`control-btn${type === t ? " selected" : ""}`}
                onClick={() => { setType(t); setLabel(t === "entrada" ? "Entrada #456" : "Salida #123"); }}
              >{t}</button>
            ))}

            <span className="control-label" style={{ marginLeft: 8 }}>Modo</span>
            <button className={`control-btn${!dark ? " selected" : ""}`} onClick={() => setDark(false)}>Claro</button>
            <button className={`control-btn${dark  ? " selected" : ""}`} onClick={() => setDark(true)}>Oscuro</button>

            <span className="control-label" style={{ marginLeft: 8 }}>Chevron</span>
            <button className={`control-btn${showChevron  ? " selected" : ""}`} onClick={() => setShowChevron(true)}>Sí</button>
            <button className={`control-btn${!showChevron ? " selected" : ""}`} onClick={() => setShowChevron(false)}>No</button>
          </div>

          {/* Inputs inline */}
          <div style={{
            padding: "10px 20px", background: "var(--sk-color-surface-muted)",
            borderBottom: "1px solid var(--sk-color-border-light)",
            display: "flex", gap: 20, alignItems: "center",
          }}>
            {[
              { lbl: "Label",  val: label,  set: setLabel,  w: 160 },
              { lbl: "Monto",  val: amount, set: setAmount, w: 110 },
            ].map(({ lbl, val, set, w }) => (
              <label key={lbl} style={{
                fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-secondary)",
                textTransform: "uppercase", letterSpacing: "0.06em",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                {lbl}
                <input value={val} onChange={e => set(e.target.value)} style={{
                  padding: "4px 8px", borderRadius: 6, border: "1px solid var(--sk-color-border)",
                  background: "var(--sk-color-surface)", color: "var(--sk-color-text-primary)",
                  fontFamily: "var(--sk-font-family)", fontSize: 12, width: w,
                }} />
              </label>
            ))}
          </div>

          <div className="preview-canvas" style={{ padding: 0 }}>
            <div style={{
              width: 380, borderRadius: 12, overflow: "hidden",
              border: "1px solid var(--sk-color-border-light)",
              margin: "32px auto",
            }}>
              <MovementCard
                type={type} label={label} amount={amount}
                dark={dark} showChevron={showChevron}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Las 4 variantes ──────────── */}
      <div className="doc-section">
        <h2 className="section-title">Las 4 variantes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Light */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Modo claro
            </p>
            <div style={{ borderRadius: 12, overflow: "hidden",
              border: "1px solid var(--sk-color-border-light)", width: 380 }}>
              <MovementCard type="entrada" label="Entrada #456" amount="$450,000" />
              <MovementCard type="salida"  label="Salida #123"  amount="$450,000" />
            </div>
          </div>
          {/* Dark */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "var(--sk-color-text-disabled)",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
              Modo oscuro
            </p>
            <div style={{ borderRadius: 12, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)", width: 380 }}>
              <MovementCard type="entrada" label="Entrada #456" amount="$450,000" dark />
              <MovementCard type="salida"  label="Salida #123"  amount="$450,000" dark />
            </div>
          </div>
        </div>
      </div>

      {/* ── Lista de ejemplo ─────────── */}
      <div className="doc-section">
        <h2 className="section-title">Lista de movimientos</h2>
        <div style={{ borderRadius: 12, overflow: "hidden",
          border: "1px solid var(--sk-color-border-light)", width: 380 }}>
          {[
            { type: "entrada" as MovementType, label: "Entrada #456", amount: "$450,000" },
            { type: "salida"  as MovementType, label: "Salida #123",  amount: "$200,000" },
            { type: "entrada" as MovementType, label: "Entrada #789", amount: "$180,000" },
            { type: "salida"  as MovementType, label: "Salida #321",  amount: "$95,000"  },
          ].map((m, i) => (
            <MovementCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── Tokens ───────────────────── */}
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

      {/* ── Props ────────────────────── */}
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

      {/* ── Código ───────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código</h2>
        <CodeBlock code={code} language="tsx" />
      </div>
    </div>
  );
}
