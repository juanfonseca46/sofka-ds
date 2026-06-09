import { type ReactNode } from "react";
import { Bell, ChevronLeft } from "lucide-react";

export interface PageHeaderProps {
  /** Título principal de la pantalla */
  title: string;
  /** Subtítulo opcional debajo del título */
  subtitle?: string;
  /** Controla visibilidad del subtítulo (default: true si hay subtitle) */
  showSubtitle?: boolean;
  /** Muestra el botón izquierdo (back / nav) */
  showLeftIcon?: boolean;
  /** Icono personalizado para el botón izquierdo. Default: ChevronLeft */
  leftIcon?: ReactNode;
  /** Muestra el botón derecho (notificaciones / acción) */
  showRightIcon?: boolean;
  /** Icono personalizado para el botón derecho. Default: Bell */
  rightIcon?: ReactNode;
  /** Callback del botón izquierdo */
  onLeftClick?: () => void;
  /** Callback del botón derecho */
  onRightClick?: () => void;
}

export function PageHeader({
  title,
  subtitle,
  showSubtitle = true,
  showLeftIcon = false,
  leftIcon,
  showRightIcon = true,
  rightIcon,
  onLeftClick,
  onRightClick,
}: PageHeaderProps) {
  return (
    <div className="sk-page-header">
      <div className="sk-page-header__row">

        {/* Botón izquierdo — back / navegación */}
        {showLeftIcon && (
          <button
            className="sk-page-header__btn sk-page-header__btn--back"
            onClick={onLeftClick}
            aria-label="Volver"
          >
            {leftIcon ?? <ChevronLeft size={20} strokeWidth={2.5} />}
          </button>
        )}

        {/* Bloque de texto */}
        <div className="sk-page-header__text">
          <h1 className="sk-page-header__title">{title}</h1>
          {showSubtitle && subtitle && (
            <p className="sk-page-header__subtitle">{subtitle}</p>
          )}
        </div>

        {/* Botón derecho — notificaciones / acción */}
        {showRightIcon && (
          <button
            className="sk-page-header__btn sk-page-header__btn--action"
            onClick={onRightClick}
            aria-label="Notificaciones"
          >
            {rightIcon ?? <Bell size={20} strokeWidth={1.8} />}
          </button>
        )}

      </div>
    </div>
  );
}
