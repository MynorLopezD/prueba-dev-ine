import type { ReactNode } from "react";

/**
 * Propiedades del componente Modal.
 */
type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Componente Modal reutilizable para mostrar contenido superpuesto.
 *
 * @component
 * @description Renderiza un modal centrado con fondo oscurecido.
 * Controlado externamente mediante estado (isOpen).
 *
 * @param {ModalProps} props - Propiedades del componente
 * @param {boolean} props.isOpen - Indica si el modal está visible
 * @param {string} props.title - Título del modal
 * @param {() => void} props.onClose - Función para cerrar el modal
 * @param {ReactNode} props.children - Contenido interno del modal
 *
 * @returns {JSX.Element | null} Modal renderizado o null si está cerrado
 */
export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <div className="text-sm text-slate-700">{children}</div>
      </div>
    </div>
  );
}