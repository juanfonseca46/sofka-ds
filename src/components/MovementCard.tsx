import { ChevronRight, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export type MovementType = "entrada" | "salida";

export interface MovementCardProps {
  /** Tipo de movimiento — determina el ícono y color */
  type: MovementType;
  /** Texto principal: número o descripción del movimiento */
  label: string;
  /** Monto o valor secundario */
  amount: string;
  /** Modo oscuro explícito (independiente del tema global) */
  dark?: boolean;
  /** Muestra el chevron de navegación (default: true) */
  showChevron?: boolean;
  /** Callback al hacer click */
  onClick?: () => void;
}

export function MovementCard({
  type,
  label,
  amount,
  dark = false,
  showChevron = true,
  onClick,
}: MovementCardProps) {
  return (
    <button
      className={[
        "sk-movement-card",
        `sk-movement-card--${type}`,
        dark ? "sk-movement-card--dark" : "",
      ].filter(Boolean).join(" ")}
      onClick={onClick}
      type="button"
    >
      {/* Ícono de tipo */}
      <div className={`sk-movement-card__icon-wrap sk-movement-card__icon-wrap--${type}`}>
        {type === "entrada"
          ? <ArrowDownToLine size={22} strokeWidth={2} />
          : <ArrowUpFromLine size={22} strokeWidth={2} />
        }
      </div>

      {/* Texto */}
      <div className="sk-movement-card__text">
        <span className="sk-movement-card__label">{label}</span>
        <span className="sk-movement-card__amount">{amount}</span>
      </div>

      {/* Chevron */}
      {showChevron && (
        <div className="sk-movement-card__chevron">
          <ChevronRight size={18} strokeWidth={2} />
        </div>
      )}
    </button>
  );
}
