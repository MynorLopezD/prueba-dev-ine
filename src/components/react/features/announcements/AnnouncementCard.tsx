import type { Announcement } from "@/types/announcement.types";
import Button from "@/components/react/ui/Button";
import Badge from "@/components/react/ui/Badge";

/**
 * Función auxiliar que determina la configuración visual para cada categoría de anuncio.
 * 
 * @param {Announcement["category"]} category - La categoría del anuncio
 * @returns {Object} Objeto con la etiqueta y variante de badge correspondiente
 * @returns {string} return.label - La etiqueta de texto para mostrar
 * @returns {"info" | "success" | "warning"} return.variant - La variante de estilo del badge
 * 
 * @remarks
 * - "general" → "General" con variante "info" (azul)
 * - "convocatorias" → "Convocatoria" con variante "success" (verde)
 * - "comunicados" → "Comunicado" con variante "warning" (ámbar)
 * - Por defecto → "Anuncio" con variante "info"
 */
export function categoryConfig(category: Announcement["category"]) {
  switch (category) {
    case "general":
      return { label: "General", variant: "info" as const };
    case "convocatorias":
      return { label: "Convocatoria", variant: "success" as const };
    case "comunicados":
      return { label: "Comunicado", variant: "warning" as const };
    default:
      return { label: "Anuncio", variant: "info" as const };
  }
}

/**
 * Tarjeta individual para mostrar un anuncio con su información completa.
 * 
 * @component
 * @description Componente que renderiza una tarjeta visualmente atractiva con la información
 * de un anuncio, incluyendo categoría, título, resumen, fecha, etiquetas y botones de acción.
 * Utiliza los componentes Badge y Button para mantener consistencia visual.
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {Announcement} props.item - El objeto de anuncio que contiene toda la información a mostrar
 * @param {string} props.item.category - Categoría del anuncio (general, convocatorias, o comunicados)
 * @param {string} props.item.title - Título del anuncio
 * @param {string} props.item.summary - Resumen o descripción breve del anuncio
 * @param {string} props.item.dateLabel - Etiqueta de fecha del anuncio
 * @param {string[]} props.item.tags - Array de etiquetas asociadas al anuncio
 * 
 * @returns {JSX.Element} Un artículo estilizado con la información del anuncio y botones de acción
 * 
 * @remarks
 * - La categoría se traduce a una etiqueta legible en español con colores diferenciados
 * - Incluye dos botones de acción: "Ver detalle" (secundario) y "Acción" (primario)
 * - Las etiquetas se muestran como badges con variante "info"
 * - Utiliza componentes reutilizables Badge y Button del sistema de diseño
 */

type AnnouncementCardProps = {
  item: Announcement;
  onViewDetail: (announcement: Announcement) => void;
};

export default function AnnouncementCard({ item, onViewDetail }: AnnouncementCardProps) {
  const category = categoryConfig(item.category);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <Badge variant={category.variant}>{category.label}</Badge>

          <h3 className="text-base font-semibold text-slate-900">
            {item.title}
          </h3>

          <p className="text-sm text-slate-600">{item.summary}</p>
        </div>

        <span className="text-xs text-slate-500">{item.dateLabel}</span>
      </div>

      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.tags.map((t) => (
            <Badge key={t} variant="info">
              {t}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button variant="secondary" onClick={() => onViewDetail(item)}>Ver detalle</Button>
        <Button variant="primary">Acción</Button>
      </div>
    </article>
  );
}
