import { type ReactNode } from "react";
import { ChevronRight, Package, AlertTriangle } from "lucide-react";

export type StatCardVariant = "default" | "warning" | "danger";

export interface StatCardProps {
  /** Variante visual de la card */
  variant?: StatCardVariant;
  /** Valor principal — número o texto grande */
  value: string | number;
  /** Etiqueta descriptiva debajo del valor */
  label: string;
  /** Ícono izquierdo. Default: Package (default) / AlertTriangle (warning/danger) */
  icon?: ReactNode;
  /** Muestra el chevron de navegación derecho (default: true) */
  showRightIcon?: boolean;
  /** Callback al hacer click en la card */
  onClick?: () => void;
}

export function StatCard({
  variant = "default",
  value,
  label,
  icon,
  showRightIcon = true,
  onClick,
}: StatCardProps) {

  const defaultIcon =
    variant === "default"
      ? <Package size={20} strokeWidth={1.8} />
      : variant === "warning"
      ? <AlertTriangle size={20} strokeWidth={2} />
      : <AlertTriangle size={20} strokeWidth={2} />;

  return (
    <button
      className={`sk-stat-card sk-stat-card--${variant}`}
      onClick={onClick}
      type="button"
    >
      {/* Bloque izquierdo: icono + valor + label */}
      <div className="sk-stat-card__body">
        <div className="sk-stat-card__top">
          <span className="sk-stat-card__icon">
            {icon ?? defaultIcon}
          </span>
          <span className="sk-stat-card__value">{value}</span>
        </div>
        <span className="sk-stat-card__label">{label}</span>
      </div>

      {/* Chevron derecho */}
      {showRightIcon && (
        <div className="sk-stat-card__arrow">
          <ChevronRight size={18} strokeWidth={2} />
        </div>
      )}
    </button>
  );
}
