import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CoursStatut } from '@/lib/sanity/types'

const STATUT_LABEL: Record<CoursStatut, string> = {
  ouvert: 'Ouvert',
  complet: 'Complet',
  'liste-attente': 'Liste d’attente',
}

const STATUT_CLASS: Record<CoursStatut, string> = {
  ouvert:
    'bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/30',
  complet: 'bg-muted text-muted-foreground border-border',
  'liste-attente':
    'bg-[var(--color-warning)]/20 text-[color-mix(in_oklab,var(--color-warning)_60%,black)] border-[var(--color-warning)]/40',
}

export function StatutBadge({
  statut,
  className,
}: {
  statut: CoursStatut | null
  className?: string
}) {
  if (!statut) return null
  return (
    <Badge
      variant="secondary"
      className={cn('border font-medium', STATUT_CLASS[statut], className)}
    >
      {STATUT_LABEL[statut]}
    </Badge>
  )
}
