import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import { homeContent } from '@/content/home'
import { ASSO_ADDRESS } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Map } from '@/components/shared/Map'

// Coordonnées approximatives de Seyssins (centre).
// À ajuster avec les coordonnées exactes de la salle.
const SEYSSINS_COORDS: [number, number] = [5.6963, 45.1631]

type HomeContactProps = {
  contactEmail?: string
  contactPhone?: string
}

export function HomeContact({ contactEmail, contactPhone }: HomeContactProps) {
  const { contact } = homeContent
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/\s+/g, '')}` : null

  return (
    <section aria-labelledby="home-contact-title" className="bg-card">
      <div className="container-content py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-primary text-sm font-medium tracking-wide uppercase">
              {contact.eyebrow}
            </p>
            <h2
              id="home-contact-title"
              className="font-display text-foreground mt-3 text-[length:var(--text-3xl)]"
            >
              {contact.title}
            </h2>

            <ul className="mt-8 flex flex-col gap-5 text-base">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <address className="text-foreground/90 not-italic">
                  {ASSO_ADDRESS.street}
                  <br />
                  {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
                </address>
              </li>
              <li className="text-foreground/80">{contact.bureauHoraires}</li>
              {contactEmail ? (
                <li className="flex items-start gap-3">
                  <Mail className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-foreground hover:text-primary font-medium hover:underline"
                  >
                    {contactEmail}
                  </a>
                </li>
              ) : null}
              {contactPhone && phoneHref ? (
                <li className="flex items-start gap-3">
                  <Phone className="text-primary mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  <a
                    href={phoneHref}
                    className="text-foreground hover:text-primary font-medium hover:underline"
                  >
                    {contactPhone}
                  </a>
                </li>
              ) : null}
            </ul>

            <div className="mt-8">
              <Button asChild>
                <Link href={contact.cta.href}>{contact.cta.label}</Link>
              </Button>
            </div>
          </div>

          <div className="border-border overflow-hidden rounded-[var(--radius-lg)] border shadow-sm">
            <Map
              center={SEYSSINS_COORDS}
              zoom={14}
              markerLabel="Salle des sports — Gym Multisport Seyssins"
              className="h-[360px] w-full md:h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
