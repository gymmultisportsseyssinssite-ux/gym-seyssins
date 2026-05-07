import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

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
    <footer className="bg-foreground text-background">
      <div className="container-content py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Identité */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt=""
                width={44}
                height={44}
                className="bg-background/10 size-11 rounded-full p-1"
              />
              <span className="font-display text-xl font-medium">{SITE_NAME}</span>
            </div>
            <p className="text-background/80 mt-4 text-sm leading-relaxed">{SITE_TAGLINE}</p>
            <address className="text-background/70 mt-6 text-sm not-italic">
              {ASSO_ADDRESS.street}
              <br />
              {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
            </address>
          </div>

          {/* Col 2 — Navigation */}
          <nav aria-label="Pied de page — navigation">
            <h2 className="font-display text-background text-lg font-medium">Navigation</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-background/80 hover:text-background focus-visible:ring-primary focus-visible:ring-offset-foreground inline-flex h-9 items-center text-sm transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — Contact */}
          <div>
            <h2 className="font-display text-background text-lg font-medium">Contact</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {contactEmail ? (
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-background/80 hover:text-background inline-flex items-center gap-2 transition-colors hover:underline"
                  >
                    <Mail className="size-4 shrink-0" aria-hidden="true" />
                    <span className="break-all">{contactEmail}</span>
                  </a>
                </li>
              ) : null}
              {contactPhone && phoneHref ? (
                <li>
                  <a
                    href={phoneHref}
                    className="text-background/80 hover:text-background inline-flex items-center gap-2 transition-colors hover:underline"
                  >
                    <Phone className="size-4 shrink-0" aria-hidden="true" />
                    {contactPhone}
                  </a>
                </li>
              ) : null}
              {!contactEmail && !contactPhone ? (
                <li className="text-background/60">Coordonnées à renseigner dans le Studio.</li>
              ) : null}
            </ul>
          </div>

          {/* Col 4 — Réseaux + statut */}
          <div>
            <h2 className="font-display text-background text-lg font-medium">Suivez-nous</h2>
            <ul className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.facebook && SOCIAL_LINKS.facebook !== '#' ? (
                <li>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    aria-label="Facebook (nouvel onglet)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-background/30 hover:bg-background hover:text-foreground inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                  >
                    <FacebookIcon className="size-5" />
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
                    className="border-background/30 hover:bg-background hover:text-foreground inline-flex size-11 items-center justify-center rounded-full border transition-colors"
                  >
                    <InstagramIcon className="size-5" />
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="text-background/60 mt-6 text-xs">Association loi 1901</p>
          </div>
        </div>

        {/* Bandeau bas */}
        <div className="border-background/15 text-background/60 mt-16 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs md:flex-row md:items-center">
          <p>
            © {year} {SITE_NAME}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/mentions-legales"
                className="hover:text-background transition-colors hover:underline"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="hover:text-background transition-colors hover:underline"
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
