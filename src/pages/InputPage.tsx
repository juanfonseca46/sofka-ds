import { useState } from "react";
import { Mail, Search, Eye, Lock, Calendar } from "lucide-react";
import { Input, type InputState, type HelperType } from "../components/Input";
import { CodeBlock } from "./shared/CodeBlock";

const states: InputState[]   = ["default", "active", "disabled", "error"];
const helperTypes: HelperType[] = ["help", "warning", "error"];

const tokenRows = [
  { token: "--sk-input-height",               value: "40px",                            desc: "Alto del campo" },
  { token: "--sk-input-padding-x",            value: "var(--sk-space-3)",               desc: "Padding horizontal" },
  { token: "--sk-input-radius",               value: "var(--sk-radius-md)",             desc: "Border radius" },
  { token: "--sk-input-font-size",            value: "var(--sk-font-size-md)",          desc: "Tamaño texto del campo" },
  { token: "--sk-input-label-size",           value: "var(--sk-font-size-sm)",          desc: "Tamaño del label" },
  { token: "--sk-input-label-weight",         value: "var(--sk-font-weight-medium)",    desc: "Peso del label" },
  { token: "--sk-input-helper-size",          value: "var(--sk-font-size-xs)",          desc: "Tamaño mensaje de soporte" },
  { token: "--sk-input-helper-color-help",    value: "var(--sk-color-brand)",           desc: "Color mensaje ayuda (azul)" },
  { token: "--sk-input-helper-color-warning", value: "var(--sk-color-warning-text)",    desc: "Color mensaje advertencia (amarillo)" },
  { token: "--sk-input-helper-color-error",   value: "var(--sk-color-danger)",          desc: "Color mensaje error (rojo)" },
  { token: "--sk-color-border",               value: "#D1D5DB",                         desc: "Borde default" },
  { token: "--sk-color-border-focus-brand",   value: "#3082F6",                         desc: "Borde active" },
  { token: "--sk-color-border-focus-danger",  value: "#F87171",                         desc: "Borde error" },
  { token: "--sk-color-surface-muted",        value: "#F9FAFB",                         desc: "BG disabled" },
];

const propsRows = [
  /* Label */
  { group: "Label",   prop: "label",         type: "string",              defaultVal: '"Label"',      desc: "Texto del label" },
  { group: "Label",   prop: "showLabelIcon", type: "boolean",             defaultVal: "true",         desc: "Boolean: muestra/oculta el icono del label" },
  { group: "Label",   prop: "labelIcon",     type: "ReactNode",           defaultVal: "<User />",     desc: "Instance Swap: reemplaza el icono del label" },
  /* Campo */
  { group: "Campo",   prop: "placeholder",   type: "string",              defaultVal: '"Placeholder"',desc: "Texto del placeholder" },
  { group: "Campo",   prop: "showFieldIcon", type: "boolean",             defaultVal: "true",         desc: "Boolean: muestra/oculta el icono del campo" },
  { group: "Campo",   prop: "fieldIcon",     type: "ReactNode",           defaultVal: "<ChevronDown />", desc: "Instance Swap: reemplaza el icono del campo" },
  { group: "Campo",   prop: "state",         type: "InputState",          defaultVal: '"default"',    desc: "Estado visual del campo" },
  { group: "Campo",   prop: "value",         type: "string",              defaultVal: "–",            desc: "Valor controlado" },
  { group: "Campo",   prop: "onChange",      type: "(v: string) => void", defaultVal: "–",            desc: "Handler de cambio" },
  /* Helper */
  { group: "Helper",  prop: "showHelper",    type: "boolean",             defaultVal: "false",        desc: "Boolean: muestra/oculta el mensaje de soporte" },
  { group: "Helper",  prop: "helperType",    type: "HelperType",          defaultVal: '"help"',       desc: "Variable: help (azul) | warning (amarillo) | error (rojo)" },
  { group: "Helper",  prop: "helperMessage", type: "string",              defaultVal: "–",            desc: "Texto del mensaje de soporte" },
];

function buildCode(state: InputState, showHelper: boolean, helperType: HelperType, showLabelIcon: boolean, showFieldIcon: boolean) {
  const lines = [
    `label="Correo electrónico"`,
    `placeholder="usuario@sofka.com"`,
    `state="${state}"`,
    !showLabelIcon ? `showLabelIcon={false}` : null,
    !showFieldIcon ? `showFieldIcon={false}` : null,
    showHelper      ? `showHelper` : null,
    showHelper      ? `helperType="${helperType}"` : null,
    showHelper      ? `helperMessage="Ingresa un correo válido"` : null,
  ].filter(Boolean).join("\n  ");
  return `import { Input } from "sofka-ds/components/Input";\n\n<Input\n  ${lines}\n/>`;
}

/* ── Showcase card (mismo patrón que ButtonPage) ───────────── */
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
      <div style={{ padding: "20px 20px 16px" }}>
        {children}
      </div>
    </div>
  );
}

const helperTypeLabels: Record<HelperType, string> = {
  help:    "Ayuda",
  warning: "Advertencia",
  error:   "Error",
};

export function InputPage() {
  const [activeState,    setActiveState]    = useState<InputState>("default");
  const [showLabelIcon,  setShowLabelIcon]  = useState(true);
  const [showFieldIcon,  setShowFieldIcon]  = useState(true);
  const [showHelper,     setShowHelper]     = useState(false);
  const [helperType,     setHelperType]     = useState<HelperType>("help");

  /* Instance swap icons para el preview */
  const iconOptions: { label: string; icon: React.ReactNode }[] = [
    { label: "Mail",      icon: <Mail size={16} /> },
    { label: "Search",    icon: <Search size={16} /> },
    { label: "Password",  icon: <Lock size={16} /> },
    { label: "Eye",       icon: <Eye size={16} /> },
    { label: "Calendar",  icon: <Calendar size={16} /> },
  ];
  const [fieldIconKey, setFieldIconKey] = useState(0);
  const selectedFieldIcon = iconOptions[fieldIconKey].icon;

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Componente</span>
        <h1 className="page-title">Input</h1>
        <p className="page-description">
          Campo de texto con 3 zonas configurables: <strong>Label</strong> (texto + icono
          intercambiable), <strong>Campo</strong> (placeholder + icono intercambiable) y{" "}
          <strong>Mensaje de soporte</strong> (ayuda, advertencia o error).
          Todos los tokens de color, tamaño y radio son CSS custom properties.
        </p>
      </div>

      {/* ── Preview interactivo ─────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Preview interactivo</h2>
        <div className="preview-box">
          <div className="preview-controls">

            {/* Estado */}
            <span className="control-label">Estado</span>
            {states.map((s) => (
              <button key={s} className={`control-btn${activeState === s ? " selected" : ""}`}
                onClick={() => setActiveState(s)}>{s}</button>
            ))}

            {/* Label icon */}
            <span className="control-label" style={{ marginLeft: 8 }}>Label icon</span>
            <button
              className={`control-btn${showLabelIcon ? " selected" : ""}`}
              onClick={() => setShowLabelIcon((v) => !v)}
            >
              {showLabelIcon ? "visible" : "oculto"}
            </button>

            {/* Field icon swap */}
            <span className="control-label" style={{ marginLeft: 8 }}>Field icon</span>
            <button
              className={`control-btn${showFieldIcon ? " selected" : ""}`}
              onClick={() => setShowFieldIcon((v) => !v)}
            >
              {showFieldIcon ? "visible" : "oculto"}
            </button>
            {showFieldIcon && iconOptions.map((opt, i) => (
              <button key={opt.label}
                className={`control-btn${fieldIconKey === i ? " selected" : ""}`}
                onClick={() => setFieldIconKey(i)}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                {opt.icon}
              </button>
            ))}

            {/* Helper */}
            <span className="control-label" style={{ marginLeft: 8 }}>Helper</span>
            <button
              className={`control-btn${showHelper ? " selected" : ""}`}
              onClick={() => setShowHelper((v) => !v)}
            >
              {showHelper ? "visible" : "oculto"}
            </button>
            {showHelper && helperTypes.map((ht) => (
              <button key={ht}
                className={`control-btn${helperType === ht ? " selected" : ""}`}
                onClick={() => setHelperType(ht)}
              >
                {helperTypeLabels[ht]}
              </button>
            ))}
          </div>

          <div className="preview-canvas" style={{ justifyContent: "center" }}>
            <div style={{ width: 280 }}>
              <Input
                label="Label"
                placeholder="Placeholder"
                state={activeState}
                showLabelIcon={showLabelIcon}
                showFieldIcon={showFieldIcon}
                fieldIcon={selectedFieldIcon}
                showHelper={showHelper}
                helperType={helperType}
                helperMessage={`Mensaje de ${helperTypeLabels[helperType].toLowerCase()}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Todos los estados — cards ──────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Todos los estados</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

          {states.map((s) => (
            <ShowcaseCard key={s} title={s.charAt(0).toUpperCase() + s.slice(1)}>
              <Input
                label="Label"
                placeholder="Placeholder"
                state={s}
                showHelper={s === "error"}
                helperType="error"
                helperMessage="Este campo es requerido"
              />
            </ShowcaseCard>
          ))}

          {/* Mensaje de soporte — las 3 variantes */}
          {helperTypes.map((ht) => (
            <ShowcaseCard key={ht} title={`Helper — ${helperTypeLabels[ht]}`}>
              <Input
                label="Label"
                placeholder="Placeholder"
                state="default"
                showHelper
                helperType={ht}
                helperMessage={
                  ht === "help"    ? "Texto de ayuda para el usuario" :
                  ht === "warning" ? "Atención, revisa este valor" :
                                     "Este campo es requerido"
                }
              />
            </ShowcaseCard>
          ))}

          {/* Sin iconos */}
          <ShowcaseCard title="Sin iconos (label + field)">
            <Input
              label="Label"
              placeholder="Placeholder"
              showLabelIcon={false}
              showFieldIcon={false}
            />
          </ShowcaseCard>

          {/* Icon swap — ejemplos */}
          <ShowcaseCard title="Instance swap de iconos">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Input label="Correo" placeholder="usuario@sofka.com"
                labelIcon={<Mail size={12} />} fieldIcon={<Mail size={16} />} />
              <Input label="Contraseña" placeholder="••••••••"
                labelIcon={<Lock size={12} />} fieldIcon={<Eye size={16} />} />
            </div>
          </ShowcaseCard>

        </div>
      </div>

      {/* ── Tokens ─────────────────────────────────────────── */}
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

      {/* ── Props ──────────────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Props</h2>
        {(["Label", "Campo", "Helper"] as const).map((group) => (
          <div key={group} style={{ marginBottom: 20 }}>
            <p style={{
              fontSize: 11, fontWeight: 700,
              color: "var(--sk-color-text-disabled)",
              textTransform: "uppercase", letterSpacing: "0.08em",
              marginBottom: 8,
            }}>
              {group}
            </p>
            <table className="doc-table">
              <thead><tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr></thead>
              <tbody>
                {propsRows.filter((r) => r.group === group).map((r) => (
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
        ))}
      </div>

      {/* ── Código ─────────────────────────────────────────── */}
      <div className="doc-section">
        <h2 className="section-title">Código de implementación</h2>
        <CodeBlock
          code={buildCode(activeState, showHelper, helperType, showLabelIcon, showFieldIcon)}
          language="tsx"
        />
      </div>
    </div>
  );
}
