import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Format ISO -> "8 mai 2026" (French long).
 * Returns null if input is invalid.
 */
export function formatDateFR(iso: string | null | undefined): string | null {
  if (!iso) return null
  try {
    return format(parseISO(iso), 'd MMMM yyyy', { locale: fr })
  } catch {
    return null
  }
}

/**
 * Format ISO -> "8 mai 2026 à 18h30".
 */
export function formatDateTimeFR(iso: string | null | undefined): string | null {
  if (!iso) return null
  try {
    return format(parseISO(iso), "d MMMM yyyy 'à' HH'h'mm", { locale: fr })
  } catch {
    return null
  }
}

/**
 * Slugifie un texte pour générer un id d'ancre (table des matières).
 * "Mon titre" -> "mon-titre"
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritiques
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}
