import { FadeIn } from '@/components/shared/FadeIn'
import { SectionPlaceholder } from '@/components/shared/SectionPlaceholder'

export default function HomePage() {
  return (
    <>
      <FadeIn as="section" className="bg-background">
        <div className="container-content py-24 md:py-32">
          <p className="text-primary text-sm font-medium tracking-wide uppercase">Bienvenue</p>
          <h1 className="font-display text-foreground mt-3 text-[length:var(--text-4xl)]">
            Gym Multisport Seyssins
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-xl">
            Le sport au cœur de la convivialité. Des activités physiques adaptées, accessibles et
            chaleureuses pour bouger ensemble à Seyssins.
          </p>
          <div
            aria-hidden="true"
            className="border-border bg-card/50 text-muted-foreground mt-12 grid h-72 place-items-center rounded-[var(--radius-lg)] border-2 border-dashed text-sm md:h-96"
          >
            Hero illustré (Prompt 3)
          </div>
        </div>
      </FadeIn>

      <FadeIn>
        <SectionPlaceholder
          id="association"
          tone="white"
          label="L’association"
          title="Une équipe passionnée, un esprit familial"
          description="Présentation rapide de la Gym Multisport Seyssins, de ses valeurs et du bureau."
        />
      </FadeIn>

      <FadeIn>
        <SectionPlaceholder
          id="cours"
          tone="cream"
          label="Nos cours"
          title="Trouvez l’activité qui vous correspond"
          description="Aperçu des disciplines proposées : gym douce, Pilates, renforcement, et bien plus."
        />
      </FadeIn>

      <FadeIn>
        <SectionPlaceholder
          id="actualites"
          tone="sage"
          label="Actualités"
          title="Les dernières nouvelles de l’association"
          description="Articles, événements et communiqués publiés par le bureau."
        />
      </FadeIn>

      <FadeIn>
        <SectionPlaceholder
          id="contact"
          tone="white"
          label="Contact"
          title="Une question ? On vous répond"
          description="Formulaire de contact direct vers l’équipe et infos pratiques."
        />
      </FadeIn>
    </>
  )
}
