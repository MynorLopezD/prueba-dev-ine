/**
 * Categorías disponibles para los anuncios.
 */
export type Category = "all" | "general" | "convocatorias" | "comunicados";

/**
 * Modelo de lorgos
 */
export interface Achievement {
  name: string;
  difficulty: string;
  potential: string;
}

/**
 * Modelo de anuncio.
 */
export interface Announcement {
  id: string;
  title: string;
  summary: string;
  category: Exclude<Category, "all">;
  tags?: string[];
  dateLabel: string;
  achievements?: Achievement[];
}
