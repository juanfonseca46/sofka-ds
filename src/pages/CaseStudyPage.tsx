import { useState } from "react";
import {
  Home, Package, Plus, Menu, ChevronLeft,
  Sun, Moon, AlertTriangle, XCircle,
  FolderPlus, Users, Truck, ArrowDownUp,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TOKEN MAPS — independientes del tema global de la página
═══════════════════════════════════════════════════════════ */
const L = {
  surface:       "#ffffff",
  surfaceMuted:  "#f9fafb",
  surfaceSubtle: "#f3f4f6",
  brand:         "#1e73e3",
  brandBg:       "#EFF6FF",
  brandMuted:    "#BFDBFE",
  textPrimary:   "#111827",
  textBody:      "#374151",
  textSecondary: "#5d6370",
  textDisabled:  "#9CA3AF",
  textOnBrand:   "#ffffff",
  danger:        "#B91C1C",
  dangerBg:      "#FEE2E2",
  warningText:   "#92400e",
  warningBg:     "#FEF9C3",
  border:        "#D1D5DB",
  borderLight:   "#E5E7EB",
  topbar:        "#1e73e3",
  navBg:         "#ffffff",
  navBorder:     "#f3f4f6",
  chartLine:     "#1e73e3",
  chartArea:     "rgba(30,115,227,0.09)",
  chartGrid:     "rgba(0,0,0,0.05)",
  chartLabel:    "#9CA3AF",
};

const D = {
  surface:       "#0d1117",
  surfaceMuted:  "#161b22",
  surfaceSubtle: "#21262d",
  brand:         "#4d9aff",
  brandBg:       "rgba(77,154,255,0.08)",
  brandMuted:    "rgba(77,154,255,0.22)",
  textPrimary:   "#f0f6fc",
  textBody:      "#c9d1d9",
  textSecondary: "#8b949e",
  textDisabled:  "#484f58",
  textOnBrand:   "#0d1117",
  danger:        "#f85149",
  dangerBg:      "rgba(248,81,73,0.10)",
  warningText:   "#d29922",
  warningBg:     "rgba(210,153,34,0.12)",
  border:        "#30363d",
  borderLight:   "#21262d",
  topbar:        "#161b22",
  navBg:         "#161b22",
  navBorder:     "#21262d",
  chartLine:     "#4d9aff",
  chartArea:     "rgba(77,154,255,0.10)",
  chartGrid:     "rgba(255,255,255,0.05)",
  chartLabel:    "#8b949e",
};

type Tok    = typeof L;
type Period  = "7d" | "30d" | "3m";
type Product = "todos" | "camisas" | "pantalones" | "accesorios";

/* ═══════════════════════════════════════════════════════════
   CHART DATA
═══════════════════════════════════════════════════════════ */
const CHART_DATA: Record<Period, {
  labels: string[];
  todos: number[]; camisas: number[];
  pantalones: number[]; accesorios: number[];
}> = {
  "7d":  { labels: ["L","M","X","J","V","S","D"],
           todos:      [20,45,30,60,40,75,55],
           camisas:    [8, 18,12,25,16,30,22],
           pantalones: [7, 15,10,22,14,28,20],
           accesorios: [5, 12, 8,13,10,17,13] },
  "30d": { labels: ["S1","S2","S3","S4"],
           todos:      [180,220,195,260],
           camisas:    [70, 90, 80,105],
           pantalones: [65, 80, 72, 95],
           accesorios: [45, 50, 43, 60] },
  "3m":  { labels: ["Ene","Feb","Mar"],
           todos:      [650,720,810],
           camisas:    [260,290,325],
           pantalones: [235,260,295],
           accesorios: [155,170,190] },
};

/* ═══════════════════════════════════════════════════════════
   SVG LINE CHART
═══════════════════════════════════════════════════════════ */
function LineChart({ c, period, product }: { c: Tok; period: Period; product: Product }) {
  const { labels } = CHART_DATA[period];
  const values     = CHART_DATA[period][product];
  const W = 256, H = 96;
  const pad = { t: 8, r: 6, b: 20, l: 28 };
  const cW  = W - pad.l - pad.r;
  const cH  = H - pad.t - pad.b;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const rng = max - min || 1;

  const pts = values.map((v, i) => ({
    x: pad.l + (i / (values.length - 1)) * cW,
    y: pad.t + (1 - (v - min) / rng) * cH,
  }));

  // Smooth bezier path
  const lineD = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const mx   = ((prev.x + pt.x) / 2).toFixed(1);
    return `${acc} C ${mx} ${prev.y.toFixed(1)} ${mx} ${pt.y.toFixed(1)} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  const areaD = `${lineD} L ${pts[pts.length - 1].x} ${pad.t + cH} L ${pts[0].x} ${pad.t + cH} Z`;
  const yTicks = [max, Math.round((max + min) / 2), min];

  return (
    <svg width={W} height={H} style={{ overflow: "visible", display: "block" }}>
      {/* Grid */}
      {[0, 0.5, 1].map((t, i) => (
        <line key={i} x1={pad.l} y1={pad.t + t * cH}
          x2={pad.l + cW} y2={pad.t + t * cH}
          stroke={c.chartGrid} strokeWidth={1} />
      ))}
      {/* Area */}
      <path d={areaD} fill={c.chartArea} />
      {/* Line */}
      <path d={lineD} fill="none" stroke={c.chartLine}
        strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Halo + dot on last point */}
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r={6} fill={c.chartLine} opacity={0.15} />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r={3.5} fill={c.chartLine} />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r={1.8} fill={c.surface} />
      {/* X labels */}
      {labels.map((lbl, i) => (
        <text key={i}
          x={pad.l + (i / (labels.length - 1)) * cW} y={H - 4}
          textAnchor="middle" fontSize={8.5} fill={c.chartLabel}
          fontFamily="Poppins, sans-serif">{lbl}</text>
      ))}
      {/* Y labels */}
      {yTicks.map((val, i) => (
        <text key={i} x={pad.l - 5} y={pad.t + (i / 2) * cH + 3}
          textAnchor="end" fontSize={8} fill={c.chartLabel}
          fontFamily="Poppins, sans-serif">{val}</text>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   STATUS BAR
═══════════════════════════════════════════════════════════ */
function StatusBar({ topbar }: { topbar: string }) {
  const ic = "rgba(255,255,255,0.85)";
  return (
    <div style={{ background: topbar, padding: "10px 18px 0",
      display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: ic, fontSize: 10, fontWeight: 700, letterSpacing: 0.2 }}>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {/* Signal */}
        <svg width={14} height={10} viewBox="0 0 14 10">
          {[0,1,2,3].map(i => (
            <rect key={i} x={i * 3.5} y={10 - (i + 1) * 2.5}
              width={2.5} height={(i + 1) * 2.5}
              fill="white" opacity={0.85} rx={0.5} />
          ))}
        </svg>
        {/* WiFi */}
        <svg width={13} height={10} viewBox="0 0 13 10" fill="none">
          <path d="M6.5 8L8 10H5L6.5 8Z" fill="white" opacity={0.85}/>
          <path d="M3.5 5.8C4.6 4.7 8.4 4.7 9.5 5.8" stroke="white" strokeWidth={1.2} strokeLinecap="round" opacity={0.85}/>
          <path d="M1 3.3C3.3 1 9.7 1 12 3.3" stroke="white" strokeWidth={1.2} strokeLinecap="round" opacity={0.6}/>
        </svg>
        {/* Battery */}
        <svg width={20} height={10} viewBox="0 0 20 10">
          <rect x={0.5} y={1} width={16} height={8} rx={1.5}
            stroke="white" strokeWidth={1} fill="none" opacity={0.85}/>
          <rect x={1.5} y={2.2} width={10} height={5.6} rx={0.8}
            fill="white" opacity={0.85}/>
          <path d="M17.5 3.5V6.5" stroke="white" strokeWidth={1.2}
            strokeLinecap="round" opacity={0.65}/>
        </svg>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EMPTY CONTENT
═══════════════════════════════════════════════════════════ */
function EmptyContent({ c }: { c: Tok }) {
  return (
    <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Welcome card */}
      <div style={{ background: c.surface, borderRadius: 16, padding: "18px 16px",
        border: `1px solid ${c.borderLight}` }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: c.textPrimary, marginBottom: 4 }}>
          Bienvenido a tu inventario virtual
        </p>
        <p style={{ fontSize: 11.5, color: c.textSecondary, marginBottom: 16, lineHeight: 1.55 }}>
          Agrega tu primer producto o grupo para empezar
        </p>
        {/* Dashed action buttons */}
        {[
          { Icon: Package,    label: "Nuevo producto" },
          { Icon: FolderPlus, label: "Nuevo grupo"    },
        ].map(({ Icon, label }) => (
          <button key={label} style={{
            width: "100%", padding: "11px 14px", borderRadius: 10, marginBottom: 8,
            border: `1.5px dashed ${c.brand}`,
            background: c.brandBg,
            color: c.brand,
            fontSize: 12.5, fontWeight: 600, fontFamily: "Poppins, sans-serif",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 7,
          }}>
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Secondary cards */}
      {[
        { Icon: Users, title: "Registra tus clientes",
          desc: "Agrega tu primer cliente y mantén el registro del movimiento de tus productos",
          btn: "Registrar cliente" },
        { Icon: Truck, title: "Registra proveedor",
          desc: "Agrega tu primer proveedor y mantén el registro del movimiento de tus productos",
          btn: "Registrar proveedor" },
      ].map(({ Icon, title, desc, btn }) => (
        <div key={title} style={{
          background: c.surface, borderRadius: 14, padding: "14px 14px 12px",
          border: `1px solid ${c.borderLight}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: c.brandBg, display: "flex",
              alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Icon size={15} color={c.brand} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary }}>{title}</p>
          </div>
          <p style={{ fontSize: 11, color: c.textSecondary, marginBottom: 10, lineHeight: 1.5 }}>{desc}</p>
          <button style={{
            width: "100%", padding: "9px", borderRadius: 8,
            border: `1px solid ${c.borderLight}`, background: c.surface,
            color: c.brand, fontSize: 12, fontWeight: 600,
            fontFamily: "Poppins, sans-serif", cursor: "pointer",
          }}>{btn}</button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FILLED CONTENT
═══════════════════════════════════════════════════════════ */
function FilledContent({ c, period, product, onPeriod, onProduct }: {
  c: Tok; period: Period; product: Product;
  onPeriod: (p: Period) => void; onProduct: (p: Product) => void;
}) {
  const pill = (active: boolean) => ({
    padding: "3px 10px", borderRadius: 999, cursor: "pointer",
    border: `1px solid ${active ? c.brand : c.borderLight}`,
    background: active ? c.brand : "transparent",
    color: active ? c.textOnBrand : c.textSecondary,
    fontSize: 10, fontWeight: active ? 600 : 400,
    fontFamily: "Poppins, sans-serif",
  } as React.CSSProperties);

  const subPill = (active: boolean) => ({
    padding: "2px 9px", borderRadius: 999, cursor: "pointer",
    border: `1px solid ${active ? c.brand : c.borderLight}`,
    background: active ? c.brandBg : "transparent",
    color: active ? c.brand : c.textSecondary,
    fontSize: 10, fontWeight: active ? 600 : 400,
    fontFamily: "Poppins, sans-serif",
  } as React.CSSProperties);

  return (
    <div style={{ padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Greeting + CTAs */}
      <div style={{ background: c.surface, borderRadius: 16, padding: "16px 14px",
        border: `1px solid ${c.borderLight}` }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: c.textPrimary, marginBottom: 2 }}>
          Bienvenida, María 👋
        </p>
        <p style={{ fontSize: 11.5, color: c.textSecondary, marginBottom: 13 }}>
          ¿Qué quieres hacer hoy?
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { label: "Agregar producto", primary: true,  Icon: Package      },
            { label: "Nuevo movimiento", primary: false, Icon: ArrowDownUp  },
          ].map(({ label, primary, Icon }) => (
            <button key={label} style={{
              flex: 1, padding: "9px 4px", borderRadius: 10,
              border: primary ? "none" : `1px solid ${c.brand}`,
              background: primary ? c.brand : c.brandBg,
              color: primary ? c.textOnBrand : c.brand,
              fontSize: 11, fontWeight: 600, fontFamily: "Poppins, sans-serif",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", gap: 5,
            }}>
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "Total",     value: "15", Icon: Package,       bg: c.surfaceSubtle, clr: c.textPrimary,  border: c.borderLight },
          { label: "Bajo stock",value: "4",  Icon: AlertTriangle, bg: c.warningBg,     clr: c.warningText,  border: "transparent" },
          { label: "Sin stock", value: "1",  Icon: XCircle,       bg: c.dangerBg,      clr: c.danger,       border: "transparent" },
        ].map(({ label, value, Icon, bg, clr, border }) => (
          <div key={label} style={{
            background: bg, borderRadius: 12, padding: "10px 6px",
            border: `1px solid ${border}`,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <Icon size={14} color={clr} />
            <span style={{ fontSize: 22, fontWeight: 700, color: clr, lineHeight: 1 }}>{value}</span>
            <span style={{ fontSize: 9, color: clr, textAlign: "center",
              lineHeight: 1.3, opacity: 0.8 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Chart card */}
      <div style={{ background: c.surface, borderRadius: 16, padding: "13px 13px 11px",
        border: `1px solid ${c.borderLight}` }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: c.textPrimary, marginBottom: 10 }}>
          Movimientos
        </p>

        {/* Period filters */}
        <div style={{ display: "flex", gap: 6, marginBottom: 7 }}>
          {(["7d","30d","3m"] as Period[]).map(p => (
            <button key={p} style={pill(period === p)} onClick={() => onPeriod(p)}>
              {p === "7d" ? "7 días" : p === "30d" ? "30 días" : "3 meses"}
            </button>
          ))}
        </div>

        {/* Product filters */}
        <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
          {(["todos","camisas","pantalones","accesorios"] as Product[]).map(pr => (
            <button key={pr} style={subPill(product === pr)} onClick={() => onProduct(pr)}>
              {pr.charAt(0).toUpperCase() + pr.slice(1)}
            </button>
          ))}
        </div>

        <LineChart c={c} period={period} product={product} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOTTOM NAV
═══════════════════════════════════════════════════════════ */
function BottomNav({ c, isDark }: { c: Tok; isDark: boolean }) {
  return (
    <div style={{ background: c.navBg, borderTop: `1px solid ${c.navBorder}`,
      padding: "8px 0 12px", display: "flex", flexShrink: 0 }}>
      {[
        { label: "Inicio",      Icon: Home,    active: true  },
        { label: "Inventario",  Icon: Package, active: false },
        { label: "Agregar",     Icon: Plus,    active: false },
        { label: "Menú",        Icon: Menu,    active: false },
      ].map(({ label, Icon, active }, i) => (
        <div key={label} style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 3, position: "relative",
        }}>
          {/* Dark mode badge on Menú */}
          {i === 3 && (
            <div style={{
              position: "absolute", top: -3, right: 14,
              width: 15, height: 15, borderRadius: "50%",
              background: isDark ? c.brand : c.surfaceSubtle,
              border: `1px solid ${isDark ? "transparent" : c.borderLight}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {isDark
                ? <Sun  size={8} color={c.textOnBrand} />
                : <Moon size={8} color={c.textSecondary} />
              }
            </div>
          )}
          <Icon size={i === 2 ? 22 : 18} color={active ? c.brand : c.textSecondary}
            strokeWidth={active ? 2.5 : 1.8} />
          <span style={{
            fontSize: 9, color: active ? c.brand : c.textSecondary,
            fontWeight: active ? 600 : 400, fontFamily: "Poppins, sans-serif",
          }}>{label}</span>
          {active && (
            <div style={{
              position: "absolute", bottom: -12,
              width: 18, height: 2, borderRadius: 1,
              background: c.brand,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MOBILE FRAME
═══════════════════════════════════════════════════════════ */
function MobileFrame({ isDark, isEmpty }: { isDark: boolean; isEmpty: boolean }) {
  const c = isDark ? D : L;
  const [period,  setPeriod]  = useState<Period>("7d");
  const [product, setProduct] = useState<Product>("todos");

  return (
    <div style={{
      width: 300, height: 620, borderRadius: 36,
      overflow: "hidden", fontFamily: "'Poppins', sans-serif",
      display: "flex", flexDirection: "column", flexShrink: 0,
      boxShadow: isDark
        ? "0 24px 56px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.07)"
        : "0 24px 56px rgba(0,0,0,0.16), 0 0 0 1.5px rgba(0,0,0,0.07)",
    }}>
      <StatusBar topbar={c.topbar} />

      {/* Top app bar */}
      <div style={{ background: c.topbar, padding: "6px 16px 14px",
        display: "flex", alignItems: "center", gap: 6 }}>
        <ChevronLeft size={20} color="rgba(255,255,255,0.75)" strokeWidth={2.5} />
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600,
          letterSpacing: "-0.3px" }}>Tu almacén</span>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", background: c.surfaceMuted,
        scrollbarWidth: "none" }}>
        {isEmpty
          ? <EmptyContent c={c} />
          : <FilledContent c={c} period={period} product={product}
              onPeriod={setPeriod} onProduct={setProduct} />
        }
      </div>

      <BottomNav c={c} isDark={isDark} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export function CaseStudyPage() {
  const modeLabel = (isDark: boolean) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8,
        background: isDark ? "#161b22" : "#EFF6FF",
        border: `1px solid ${isDark ? "#30363d" : "#BFDBFE"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isDark
          ? <Moon size={14} color="#4d9aff" />
          : <Sun  size={14} color="#1e73e3" />
        }
      </div>
      <span style={{
        fontSize: 14, fontWeight: 600,
        color: "var(--sk-color-text-primary)",
      }}>
        {isDark ? "Modo oscuro" : "Modo claro"}
      </span>
    </div>
  );

  return (
    <div className="docs-page">
      <div className="page-header">
        <span className="page-badge">Case Study</span>
        <h1 className="page-title">Mockups — App Home</h1>
        <p className="page-description">
          Rediseño de la pantalla principal de gestión de inventario para pymes.
          Cuatro estados: modo claro y oscuro × primer acceso y usuario activo.
          Los filtros de la gráfica son interactivos.
        </p>
      </div>

      {[false, true].map((isDark) => (
        <div key={String(isDark)} className="doc-section">
          {modeLabel(isDark)}
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[true, false].map((isEmpty) => (
              <div key={String(isEmpty)}>
                <p style={{
                  fontSize: 11, fontWeight: 600,
                  color: "var(--sk-color-text-disabled)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  marginBottom: 14,
                }}>
                  {isEmpty ? "Primer acceso — vacío" : "Usuario activo"}
                </p>
                <MobileFrame isDark={isDark} isEmpty={isEmpty} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
