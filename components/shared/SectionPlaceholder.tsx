import { cn } from '@/lib/utils'

type SectionPlaceholderProps = {
  id: string
  label: string
  title: string
  description: string
  tone?: 'cream' | 'white' | 'sage'
  className?: string
}

const toneClasses: Record<NonNullable<SectionPlaceholderProps['tone']>, string> = {
  cream: 'bg-background',
  white: 'bg-card',
  sage: 'bg-[color-mix(in_oklab,var(--color-secondary)_15%,var(--color-background))]',
}

export function SectionPlaceholder({
  id,
  label,
  title,
  description,
  tone = 'cream',
  className,
}: SectionPlaceholderProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], className)}>
      <div className="container-content py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">{label}</p>
          <h2 className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]">
            {title}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">{description}</p>
        </div>
        <div
          aria-hidden="true"
          className="border-border bg-card/50 text-muted-foreground mt-10 grid h-56 place-items-center rounded-[var(--radius-lg)] border-2 border-dashed text-sm"
        >
          Contenu à venir (Prompt 3)
        </div>
      </div>
    </section>
  )
}
