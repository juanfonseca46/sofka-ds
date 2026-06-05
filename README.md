# Sofka Design System

Sistema de diseño tokenizado para productos Sofka. Construido con React 18 + TypeScript + Vite + CSS Custom Properties.

## 🚀 Arrancar localmente

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 📐 Arquitectura de tokens

Los tokens están organizados en **tres capas** en `src/styles/tokens.css`:

```
Primitivos  →  Semánticos  →  Componentes
--sk-blue-500   --sk-color-brand   --sk-btn-height-md
--sk-gray-300   --sk-color-border  --sk-input-radius
```

| Capa | Prefix | Ejemplo |
|------|--------|---------|
| Primitivos | `--sk-{color}-{shade}` | `--sk-blue-500: #3082F6` |
| Semánticos | `--sk-color-{intent}` | `--sk-color-brand` |
| Componentes | `--sk-{component}-{prop}` | `--sk-btn-height-md` |

## 🧩 Componentes

| Componente | Variantes | Tokens |
|-----------|-----------|--------|
| **Button** | primary, secondary, danger, outline, ghost · md/sm/icon | `--sk-btn-*`, `--sk-color-brand` |
| **Input** | default, active, disabled, error | `--sk-input-*`, `--sk-color-border-focus-*` |
| **Badge** | warning, danger, neutral | `--sk-badge-*`, `--sk-color-warning-*` |
| **ProductCard** | vertical, horizontal | `--sk-card-*` |
| **Topbar** | – | `--sk-topbar-*` |

## 🎨 Cómo usar los tokens

```css
/* Importa los tokens en tu CSS */
@import "sofka-ds/src/styles/tokens.css";

.mi-boton {
  background-color: var(--sk-color-brand);
  color:            var(--sk-color-text-on-brand);
  height:           var(--sk-btn-height-md);
  border-radius:    var(--sk-btn-radius);
  font-family:      var(--sk-font-family);
}
```

## 📁 Estructura del proyecto

```
sofka-ds/
├── src/
│   ├── styles/
│   │   ├── tokens.css          ← Todos los CSS custom properties
│   │   └── global.css          ← Estilos base + docs UI
│   ├── components/             ← Componentes tokenizados
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── ProductCard.tsx
│   │   └── Topbar.tsx
│   ├── pages/                  ← Documentación interactiva
│   │   ├── OverviewPage.tsx
│   │   ├── TokensPage.tsx
│   │   ├── ButtonPage.tsx
│   │   ├── InputPage.tsx
│   │   ├── BadgePage.tsx
│   │   ├── ProductCardPage.tsx
│   │   └── TopbarPage.tsx
│   └── App.tsx                 ← Layout con sidebar de navegación
├── index.html
├── package.json
└── vite.config.ts
```

## 🛠 Stack técnico

- **Framework:** React 18 + TypeScript
- **Build:** Vite 6
- **Estilos:** CSS Custom Properties (tokens.css)
- **Iconos:** Lucide React
- **Fuente:** Poppins (Google Fonts)

---

> Prueba técnica — Diseñador UI Sofka
