import { useState } from "react";
import type { Announcement } from "@/types/announcement.types";
import AnnouncementCard from "@/components/react/features/announcements/AnnouncementCard";
import Modal from "@/components/react/ui/Modal";
import { categoryConfig } from "@/components/react/features/announcements/AnnouncementCard";

const ACHIEVEMENT_BORDER_CLASSES = {
  info: "border-blue-200 bg-blue-50/40",
  success: "border-emerald-200 bg-emerald-50/40",
  warning: "border-amber-200 bg-amber-50/40",
  danger: "border-red-200 bg-red-50/40",
} as const;


/**
 * Propiedades del componente AnnouncementsFeed.
 */
type AnnouncementsFeedProps = {
  items: Announcement[];
};

/**
 * Feed de anuncios que muestra una lista de tarjetas de anuncios o un mensaje cuando está vacío.
 * 
 * @component
 * @param {AnnouncementsFeedProps} props - Las propiedades del componente
 * @param {Announcement[]} props.items - Array de anuncios a mostrar
 * @returns {JSX.Element} Una cuadrícula de tarjetas o un mensaje de lista vacía
 */
export function AnnouncementsFeed({ items }: AnnouncementsFeedProps) {

  // Estado para controlar el Announcement seleccionado
  const [selected, setSelected] = useState<Announcement | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
        No hay anuncios que coincidan con tu búsqueda.
      </div>
    );
  }

  const category = selected ? categoryConfig(selected.category) : null;
  const achievementStyle = category ? ACHIEVEMENT_BORDER_CLASSES[category.variant] : "";


  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <AnnouncementCard key={item.id} item={item} onViewDetail={setSelected} />
        ))}
      </div>

      <Modal
        isOpen={Boolean(selected)}
        title={selected?.title ?? ""}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-4">
            <div className="text-xs text-slate-500">
              {selected.category} • {selected.dateLabel}
            </div>

            <p className="text-sm text-slate-700">
              {selected.summary}
            </p>

            <div className="pt-2">
              <h3 className="mb-2 text-sm font-semibold text-slate-900">
                Logros asociados
              </h3>

              {selected?.achievements?.length ? (
                <ul className="space-y-3">
                  {selected.achievements.map((ach, index) => (
                    <li
                      key={index}
                      className={[
                        "rounded-xl border p-3",
                        achievementStyle,
                      ].join(" ")}
                    >
                      <p className="font-medium text-slate-900">{ach.name}</p>
                      <p className="text-xs text-slate-700">
                        Dificultad: {ach.difficulty}
                      </p>
                      <p className="text-xs text-slate-700">
                        Potencial: {ach.potential}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">
                  Este anuncio no tiene logros asociados.
                </p>
              )}

            </div>
          </div>
        )}

      </Modal>
    </>
  );
}
