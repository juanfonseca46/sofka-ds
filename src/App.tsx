import { useState, useEffect } from "react";
import {
  LayoutDashboard, Palette, Square, Type, Tag,
  CreditCard, AlignJustify, ChevronRight, Sun, Moon, Smartphone,
} from "lucide-react";

import { OverviewPage }    from "./pages/OverviewPage";
import { TokensPage }      from "./pages/TokensPage";
import { ButtonPage }      from "./pages/ButtonPage";
import { InputPage }       from "./pages/InputPage";
import { BadgePage }       from "./pages/BadgePage";
import { ProductCardPage } from "./pages/ProductCardPage";
import { TopbarPage }      from "./pages/TopbarPage";
import { CaseStudyPage }  from "./pages/CaseStudyPage";

type Page =
  | "overview"
  | "tokens"
  | "button"
  | "input"
  | "badge"
  | "product-card"
  | "topbar"
  | "case-study";

interface NavItem {
  id: Page;
  label: string;
  icon: React.ReactNode;
}

const foundationItems: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={15} /> },
  { id: "tokens",   label: "Tokens",   icon: <Palette size={15} /> },
];

const componentItems: NavItem[] = [
  { id: "button",       label: "Button",       icon: <Square size={15} /> },
  { id: "input",        label: "Input",        icon: <Type size={15} /> },
  { id: "badge",        label: "Badge",        icon: <Tag size={15} /> },
  { id: "product-card", label: "Product Card", icon: <CreditCard size={15} /> },
  { id: "topbar",       label: "Topbar",       icon: <AlignJustify size={15} /> },
];

const caseItems: NavItem[] = [
  { id: "case-study", label: "App Home", icon: <Smartphone size={15} /> },
];

export default function App() {
  const [page, setPage] = useState<Page>("overview");

  /* ── Dark mode — persiste en localStorage ────────────────── */
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("sk-theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("sk-theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("sk-theme", "light");
    }
  }, [isDark]);

  const navigate = (p: string) => setPage(p as Page);

  return (
    <div className="docs-layout">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside className="docs-sidebar">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-logo"><span>SK</span></div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">Sofka DS</span>
            <span className="sidebar-brand-version">v1.0.0</span>
          </div>
        </div>

        {/* Nav */}
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

          <div className="sidebar-group">
            <p className="sidebar-group-label">Case Study</p>
            {caseItems.map((item) => (
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

        {/* Footer — toggle + tech stack */}
        <div style={{ marginTop: "auto" }}>

          {/* Toggle dark mode */}
          <div style={{ padding: "0 12px 12px" }}>
            <button
              className="theme-toggle"
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDark
                ? <Sun  size={15} style={{ flexShrink: 0 }} />
                : <Moon size={15} style={{ flexShrink: 0 }} />
              }
              <span>{isDark ? "Modo claro" : "Modo oscuro"}</span>
            </button>
          </div>

          {/* Tech stack */}
          <div style={{
            padding: "12px 20px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 11,
            color: "#475569",
            lineHeight: 1.6,
          }}>
            React · TypeScript · Vite<br />
            CSS Custom Properties
          </div>
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
        {page === "case-study"   && <CaseStudyPage />}
        {page === "topbar"       && <TopbarPage />}
      </main>
    </div>
  );
}
