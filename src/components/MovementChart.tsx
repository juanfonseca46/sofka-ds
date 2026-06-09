import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ── Tipos ─────────────────────────────────────────────── */
export type ChartPeriod  = "7d" | "30d" | "3m";
export type ChartProduct = "todos" | "camisas" | "pantalones" | "accesorios";

/* ── Datos por período ─────────────────────────────────── */
const DATA: Record<ChartPeriod, {
  xLabels: string[];
  yTicks:  number[];
  todos:      number[];
  camisas:    number[];
  pantalones: number[];
  accesorios: number[];
}> = {
  "7d": {
    xLabels:    ["L","M","X","J","V","S","D"],
    yTicks:     [20, 15, 10, 5],
    todos:      [5, 12, 10, 20, 13, 18, 15],
    camisas:    [2,  5,  4,  9,  5,  8,  6],
    pantalones: [2,  4,  4,  7,  5,  6,  6],
    accesorios: [1,  3,  2,  4,  3,  4,  3],
  },
  "30d": {
    xLabels:    ["1","5","10","15","20","25","30"],
    yTicks:     [100, 80, 60, 40],
    todos:      [40, 65, 55, 90, 70, 85, 75],
    camisas:    [15, 28, 22, 38, 28, 35, 30],
    pantalones: [14, 24, 20, 33, 25, 32, 27],
    accesorios: [11, 13, 13, 19, 17, 18, 18],
  },
  "3m": {
    xLabels:    ["1","15","30","45","60","75","90"],
    yTicks:     [400, 300, 200, 100],
    todos:      [100, 160, 140, 230, 180, 260, 220],
    camisas:    [40,  65,  56,  93,  72, 105,  88],
    pantalones: [36,  59,  51,  84,  65,  95,  80],
    accesorios: [24,  36,  33,  53,  43,  60,  52],
  },
};

const PERIOD_LABELS: Record<ChartPeriod, string> = {
  "7d":  "Últimos 7 días",
  "30d": "Último mes",
  "3m":  "Último trimestre",
};

const PRODUCT_LABELS: Record<ChartProduct, string> = {
  todos:      "Todos",
  camisas:    "Camisas",
  pantalones: "Pantalones",
  accesorios: "Accesorios",
};

/* ── SVG Line Chart interno ────────────────────────────── */
interface ChartSVGProps {
  period:  ChartPeriod;
  product: ChartProduct;
}

function ChartSVG({ period, product }: ChartSVGProps) {
  const d      = DATA[period];
  const values = d[product];
  const max    = d.yTicks[0];
  const min    = 0;

  const W   = 320;
  const H   = 122;
  const pad = { t: 4, r: 4, b: 0, l: 0 };
  const cW  = W - pad.l - pad.r;
  const cH  = H - pad.t - pad.b;

  const pts = values.map((v, i) => ({
    x: pad.l + (i / (values.length - 1)) * cW,
    y: pad.t + (1 - (v - min) / (max - min)) * cH,
  }));

  // Bezier suave
  const lineD = pts.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const mx   = ((prev.x + pt.x) / 2).toFixed(1);
    return `${acc} C ${mx} ${prev.y.toFixed(1)} ${mx} ${pt.y.toFixed(1)} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, "");

  const areaD = `${lineD} L ${pts[pts.length - 1].x} ${pad.t + cH} L ${pts[0].x} ${pad.t + cH} Z`;

  return (
    <svg
      width="100%" viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block", overflow: "visible" }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="var(--sk-color-brand)" stopOpacity="0.35" />
          <stop offset="68%"  stopColor="var(--sk-color-brand)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--sk-color-brand)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.33, 0.66, 1].map((t, i) => (
        <line key={i}
          x1={0} y1={pad.t + t * cH}
          x2={W} y2={pad.t + t * cH}
          stroke="var(--sk-color-border-light)"
          strokeWidth={1}
        />
      ))}

      {/* Área */}
      <path d={areaD} fill="url(#chartGrad)" />

      {/* Línea */}
      <path d={lineD} fill="none"
        stroke="var(--sk-blue-300)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.5}
          fill="var(--sk-blue-700)" />
      ))}
    </svg>
  );
}

/* ── Componente principal ──────────────────────────────── */
export interface MovementChartProps {
  /** Título de la card */
  title?: string;
  /** Período inicial */
  defaultPeriod?: ChartPeriod;
  /** Producto inicial */
  defaultProduct?: ChartProduct;
  /** Muestra el filtro de productos */
  showProductFilter?: boolean;
}

export function MovementChart({
  title          = "Movimientos",
  defaultPeriod  = "7d",
  defaultProduct = "todos",
  showProductFilter = true,
}: MovementChartProps) {
  const [period,  setPeriod]  = useState<ChartPeriod>(defaultPeriod);
  const [product, setProduct] = useState<ChartProduct>(defaultProduct);
  const [openP,   setOpenP]   = useState(false);

  const d = DATA[period];

  return (
    <div className="sk-movement-chart">

      {/* ── Header: título + dropdown período ── */}
      <div className="sk-movement-chart__header">
        <span className="sk-movement-chart__title">{title}</span>

        {/* Dropdown período */}
        <div className="sk-movement-chart__dropdown-wrap">
          <button
            className="sk-movement-chart__dropdown-btn"
            onClick={() => setOpenP(v => !v)}
            type="button"
          >
            <span>{PERIOD_LABELS[period]}</span>
            <ChevronDown
              size={16}
              style={{
                transition: "transform 150ms ease",
                transform: openP ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}
            />
          </button>

          {openP && (
            <div className="sk-movement-chart__dropdown-menu">
              {(["7d","30d","3m"] as ChartPeriod[]).map(p => (
                <button key={p}
                  className={`sk-movement-chart__dropdown-item${period === p ? " active" : ""}`}
                  onClick={() => { setPeriod(p); setOpenP(false); }}
                  type="button"
                >
                  {PERIOD_LABELS[p]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Filtro de productos ── */}
      {showProductFilter && (
        <div className="sk-movement-chart__product-filters">
          {(["todos","camisas","pantalones","accesorios"] as ChartProduct[]).map(pr => (
            <button key={pr}
              className={`sk-movement-chart__pill${product === pr ? " active" : ""}`}
              onClick={() => setProduct(pr)}
              type="button"
            >
              {PRODUCT_LABELS[pr]}
            </button>
          ))}
        </div>
      )}

      {/* ── Gráfica con eje Y ── */}
      <div className="sk-movement-chart__body">
        {/* Eje Y */}
        <div className="sk-movement-chart__y-axis">
          {d.yTicks.map(t => (
            <span key={t} className="sk-movement-chart__y-tick">{t}</span>
          ))}
        </div>

        {/* SVG */}
        <div className="sk-movement-chart__chart-area">
          <ChartSVG period={period} product={product} />

          {/* Eje X */}
          <div className="sk-movement-chart__x-axis">
            {d.xLabels.map(l => (
              <span key={l} className="sk-movement-chart__x-tick">{l}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
