import type { CSSProperties } from "react";
import { Badge, type BadgeVariant } from "./Badge";

export type ProductCardLayout = "vertical" | "horizontal";

export interface ProductCardProps {
  name?: string;
  price?: string;
  quantity?: number;
  badge?: BadgeVariant | "none";
  imageSrc?: string;
  layout?: ProductCardLayout;
  onClick?: () => void;
}

export function ProductCard({
  name = "Product name",
  price = "$1,550",
  quantity = 250,
  badge = "warning",
  imageSrc,
  layout = "vertical",
  onClick,
}: ProductCardProps) {
  /* ── Shared ── */
  const cardBase: CSSProperties = {
    fontFamily: "var(--sk-font-family)",
    backgroundColor: "var(--sk-color-surface)",
    borderRadius: "var(--sk-card-radius)",
    border: "1px solid var(--sk-card-border-color)",
    cursor: onClick ? "pointer" : "default",
    transition: "var(--sk-card-transition)",
  };

  const imagePlaceholder: CSSProperties = {
    backgroundColor: "var(--sk-color-surface-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  };

  /* ── Horizontal ── */
  if (layout === "horizontal") {
    return (
      <div
        onClick={onClick}
        style={{
          ...cardBase,
          display: "flex",
          alignItems: "center",
          gap: "var(--sk-space-3)",
          padding: "var(--sk-card-padding)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--sk-shadow-md)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        }}
      >
        <div
          style={{
            ...imagePlaceholder,
            width: "var(--sk-card-image-w-horiz)",
            height: "var(--sk-card-image-w-horiz)",
            borderRadius: "var(--sk-card-image-radius)",
          }}
        >
          {imageSrc
            ? <img src={imageSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--sk-color-text-disabled)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          }
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--sk-space-1)" }}>
          <p style={{ fontSize: "var(--sk-font-size-base)", fontWeight: "var(--sk-font-weight-semibold)", color: "var(--sk-color-text-primary)" }}>{name}</p>
          <p style={{ fontSize: "var(--sk-font-size-sm)", color: "var(--sk-color-text-secondary)" }}>{quantity} Und.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "var(--sk-space-2)" }}>
          <p style={{ fontSize: "var(--sk-font-size-base)", fontWeight: "var(--sk-font-weight-bold)", color: "var(--sk-color-text-primary)" }}>{price}</p>
          {badge !== "none" && <Badge variant={badge} />}
        </div>
      </div>
    );
  }

  /* ── Vertical ── */
  return (
    <div
      onClick={onClick}
      style={{
        ...cardBase,
        display: "flex",
        flexDirection: "column",
        width: "var(--sk-card-width)",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--sk-shadow-md)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div style={{ ...imagePlaceholder, width: "100%", height: "var(--sk-card-image-h)" }}>
        {imageSrc
          ? <img src={imageSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--sk-color-text-disabled)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
        }
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--sk-space-1)", padding: "var(--sk-card-padding)" }}>
        <p style={{ fontSize: "var(--sk-font-size-base)", fontWeight: "var(--sk-font-weight-semibold)", color: "var(--sk-color-text-primary)" }}>{name}</p>
        <p style={{ fontSize: "var(--sk-font-size-base)", fontWeight: "var(--sk-font-weight-bold)", color: "var(--sk-color-text-primary)" }}>{price}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "var(--sk-space-1)" }}>
          <p style={{ fontSize: "var(--sk-font-size-sm)", color: "var(--sk-color-text-secondary)" }}>{quantity} Und.</p>
          {badge !== "none" && <Badge variant={badge} />}
        </div>
      </div>
    </div>
  );
}
