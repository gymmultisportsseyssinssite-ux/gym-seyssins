export default function HomePage() {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-[length:var(--text-4xl)] tracking-tight text-[var(--color-foreground)]">
          Gym Multisport Seyssins
        </h1>
        <p className="mt-6 text-[length:var(--text-lg)] text-[var(--color-muted)]">
          Site en construction
        </p>
        <div className="mt-10">
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-8 py-3 text-[length:var(--text-base)] font-medium text-white shadow-sm transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-primary)]"
          >
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  )
}
