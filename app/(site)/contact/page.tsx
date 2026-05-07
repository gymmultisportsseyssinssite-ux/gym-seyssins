import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from '@/components/contact/ContactForm'
import { Map } from '@/components/shared/Map'
import { contactContent } from '@/content/contact'
import { ASSO_ADDRESS } from '@/lib/constants'
import { getSiteSettings } from '@/lib/sanity/fetch'

const SEYSSINS_COORDS: [number, number] = [5.6963, 45.1631]

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez la Gym Multisport Seyssins par formulaire, email ou téléphone.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null)
  const phoneHref = settings?.contactPhone
    ? `tel:${settings.contactPhone.replace(/\s+/g, '')}`
    : null

  return (
    <section className="bg-background">
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonne infos */}
          <div>
            <h1 className="font-display text-foreground text-[length:var(--text-4xl)]">
              {contactContent.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-prose text-lg">{contactContent.intro}</p>

            <ul className="mt-10 flex flex-col gap-6 text-base">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-foreground font-medium">Adresse</p>
                  <address className="text-muted-foreground mt-1 not-italic">
                    {ASSO_ADDRESS.street}
                    <br />
                    {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
                  </address>
                </div>
              </li>

              {settings?.contactEmail ? (
                <li className="flex items-start gap-3">
                  <Mail className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-foreground font-medium">Email</p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-muted-foreground hover:text-primary mt-1 inline-block hover:underline"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </li>
              ) : null}

              {settings?.contactPhone && phoneHref ? (
                <li className="flex items-start gap-3">
                  <Phone className="text-primary mt-1 size-5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-foreground font-medium">Téléphone</p>
                    <a
                      href={phoneHref}
                      className="text-muted-foreground hover:text-primary mt-1 inline-block hover:underline"
                    >
                      {settings.contactPhone}
                    </a>
                  </div>
                </li>
              ) : null}

              <li>
                <p className="text-foreground font-medium">{contactContent.horaires.title}</p>
                <ul className="text-muted-foreground mt-2 flex flex-col gap-1.5 text-sm">
                  {contactContent.horaires.items.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="border-border mt-10 overflow-hidden rounded-[var(--radius-lg)] border shadow-sm">
              <Map
                center={SEYSSINS_COORDS}
                zoom={14}
                markerLabel="Salle des sports — Gym Multisport Seyssins"
                className="h-[320px] w-full"
              />
            </div>
          </div>

          {/* Colonne formulaire */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
