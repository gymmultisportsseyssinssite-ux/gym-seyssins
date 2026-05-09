import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Mail, Phone } from 'lucide-react'

import { ASSO_ADDRESS, NAV_ITEMS, SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS } from '@/lib/constants'

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.5V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.4v7h3.1z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

type FooterProps = {
  contactEmail?: string
  contactPhone?: string
}

export function Footer({ contactEmail, contactPhone }: FooterProps) {
  const year = new Date().getFullYear()
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/\s+/g, '')}` : null

  return (
    <footer className="bg-foreground text-background relative isolate overflow-hidden">
      {/* Halo radial chaud */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_20%,transparent),transparent)] blur-2xl"
      />
      {/* Halo gauche froid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-primary)_25%,transparent),transparent)] blur-2xl"
      />

      <div className="container-content py-16 md:py-20">
        {/* En-tête éditorial : "— Gym Multisport Seyssins" + filet */}
        <div className="mb-14 flex items-baseline gap-4">
          <p className="text-secondary shrink-0 font-mono text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
            — {SITE_NAME}
          </p>
          <span
            aria-hidden="true"
            className="border-background/15 flex-1 border-t border-dashed"
          />
        </div>

        <div className="grid grid-cols-2 gap-12 md:grid-cols-12 md:gap-10">
          {/* Col 1 — Identité */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt=""
                width={36}
                height={36}
                className="bg-background/8 size-9 rounded-full p-1"
              />
              <span className="font-display text-background text-base font-bold tracking-tight">
                GMS
              </span>
            </div>
            <p className="text-background/65 mt-5 max-w-xs text-[0.95rem] leading-[1.6]">
              {SITE_TAGLINE}
            </p>
            <address className="text-background/50 mt-6 font-mono text-[0.8rem] leading-[1.7] not-italic">
              {ASSO_ADDRESS.venue}
              <br />
              {ASSO_ADDRESS.street}
              <br />
              {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
            </address>
          </div>

          {/* Col 2 — Navigation */}
          <nav aria-label="Pied de page — navigation" className="md:col-span-3">
            <h2 className="text-background/40 font-mono text-[0.7rem] font-semibold tracking-[0.25em] uppercase">
              Navigation
            </h2>
            <ul className="mt-5 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group text-background/85 hover:text-background focus-visible:ring-secondary focus-visible:ring-offset-foreground inline-flex items-center gap-1.5 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className="text-background/0 group-hover:text-secondary size-3.5 -translate-x-1 transition-all group-hover:translate-x-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Contact */}
          <div className="md:col-span-3">
            <h2 className="text-background/40 font-mono text-[0.7rem] font-semibold tracking-[0.25em] uppercase">
              Contact
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {contactEmail ? (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="group text-background/85 hover:text-background inline-flex items-start gap-2 transition-colors"
                  >
                    <Mail
                      className="text-secondary mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="break-all">{contactEmail}</span>
                  </a>
                </li>
              ) : null}
              {contactPhone && phoneHref ? (
                <li>
                  <a
                    href={phoneHref}
                    className="group text-background/85 hover:text-background inline-flex items-start gap-2 transition-colors"
                  >
                    <Phone
                      className="text-secondary mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{contactPhone}</span>
                  </a>
                </li>
              ) : null}
              {!contactEmail && !contactPhone ? (
                <li className="text-background/50 text-xs">Coordonnées à renseigner.</li>
              ) : null}
            </ul>
          </div>

          {/* Col 4 — Réseaux + CTA */}
          <div className="md:col-span-2">
            <h2 className="text-background/40 font-mono text-[0.7rem] font-semibold tracking-[0.25em] uppercase">
              Suivre
            </h2>
            <ul className="mt-5 flex items-center gap-2">
              {SOCIAL_LINKS.facebook && SOCIAL_LINKS.facebook !== '#' ? (
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    aria-label="Facebook (nouvel onglet)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:bg-secondary hover:text-secondary-foreground inline-flex size-10 items-center justify-center rounded-full transition-all"
                  >
                    <FacebookIcon className="size-4" />
                  </a>
                </li>
              ) : null}
              {SOCIAL_LINKS.instagram && SOCIAL_LINKS.instagram !== '#' ? (
                <li>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    aria-label="Instagram (nouvel onglet)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:bg-secondary hover:text-secondary-foreground inline-flex size-10 items-center justify-center rounded-full transition-all"
                  >
                    <InstagramIcon className="size-4" />
                  </a>
                </li>
              ) : null}
            </ul>

            <Link
              href="/cours#inscription"
              className="group bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all hover:gap-3"
            >
              <span>S’inscrire</span>
              <span className="bg-foreground/8 group-hover:bg-secondary-foreground/15 relative flex size-5 items-center justify-center overflow-hidden rounded-full transition-colors">
                <ArrowRight
                  className="size-3 transition-transform duration-300 group-hover:translate-x-5"
                  aria-hidden="true"
                />
                <ArrowRight
                  className="absolute size-3 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Signature géante décorative */}
      <div
        aria-hidden="true"
        className="border-background/10 pointer-events-none border-t border-dashed select-none"
      >
        <div className="container-content py-8 md:py-12">
          <p className="font-display text-background/8 w-full text-center leading-[0.85] font-extrabold tracking-[-0.04em] uppercase whitespace-nowrap text-[clamp(1.25rem,5.8vw,5.5rem)]">
            Gym Multisport Seyssins
          </p>
        </div>
      </div>

      {/* Bandeau bas */}
      <div className="border-background/10 border-t">
        <div className="container-content text-background/55 flex flex-col items-start justify-between gap-3 py-5 font-mono text-[0.75rem] tracking-wide md:flex-row md:items-center">
          <p>
            © {year} {SITE_NAME} · Association loi 1901
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-background transition-colors"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="hover:text-background transition-colors"
              >
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
