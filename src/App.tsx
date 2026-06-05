import { useState } from "react";
import {
  LayoutDashboard, Palette, Square, Type, Tag,
  CreditCard, AlignJustify, ChevronRight,
} from "lucide-react";

import { OverviewPage }    from "./pages/OverviewPage";
import { TokensPage }      from "./pages/TokensPage";
import { ButtonPage }      from "./pages/ButtonPage";
import { InputPage }       from "./pages/InputPage";
import { BadgePage }       from "./pages/BadgePage";
import { ProductCardPage } from "./pages/ProductCardPage";
import { TopbarPage }      from "./pages/TopbarPage";

type Page =
  | "overview"
  | "tokens"
  | "button"
  | "input"
  | "badge"
  | "product-card"
  | "topbar";

interface NavItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
}

const foundationItems: NavItem[] = [
  { id: "overview", label: "Overview",  icon: <LayoutDashboard size={15} /> },
  { id: "tokens",   label: "Tokens",    icon: <Palette size={15} /> },
];

const componentItems: NavItem[] = [
  { id: "button",       label: "Button",       icon: <Square size={15} /> },
  { id: "input",        label: "Input",        icon: <Type size={15} /> },
  { id: "badge",        label: "Badge",        icon: <Tag size={15} /> },
  { id: "product-card", label: "Product Card", icon: <CreditCard size={15} /> },
  { id: "topbar",       label: "Topbar",       icon: <AlignJustify size={15} /> },
];

export default function App() {
  const [page, setPage] = useState<Page>("overview");

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="docs-layout">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="docs-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-logo"><span>SK</span></div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Sofka DS</span>
            <span className="sidebar-brand-version">v1.0.0</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-group">
            <p className="sidebar-group-label">Fundaciones</p>
            {foundationItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-link${page === item.id ? " active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                {item.icon}
                {item.label}
                {page === item.id && (
                  <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.6 }} />
                )}
              </button>
            ))}
          </div>

          <div className="sidebar-group">
            <p className="sidebar-group-label">Componentes</p>
            {componentItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-link${page === item.id ? " active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                {item.icon}
                {item.label}
                {page === item.id && (
                  <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.6 }} />
                )}
              </button>
            ))}
          </div>
        </nav>

        <div style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          fontSize: 11,
          color: "#475569",
          lineHeight: 1.6,
        }}>
          React · TypeScript · Vite<br />
          CSS Custom Properties
        </div>
      </aside>

      {/* ── Content ──────────────────────────────────────── */}
      <main className="docs-content">
        {page === "overview"     && <OverviewPage navigate={navigate} />}
        {page === "tokens"       && <TokensPage />}
        {page === "button"       && <ButtonPage />}
        {page === "input"        && <InputPage />}
        {page === "badge"        && <BadgePage />}
        {page === "product-card" && <ProductCardPage />}
        {page === "topbar"       && <TopbarPage />}
      </main>
    </div>
  );
}
