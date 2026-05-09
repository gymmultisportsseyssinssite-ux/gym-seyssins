import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from '@/components/contact/ContactForm'
import { Map } from '@/components/shared/Map'
import { contactContent } from '@/content/contact'
import { ASSO_ADDRESS } from '@/lib/constants'
import { getSiteSettings } from '@/lib/sanity/fetch'

const SEYSSINS_COORDS: [number, number] = [5.69, 45.1649]

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez la Gym Multisport Seyssins par formulaire, email ou téléphone.',
}

type Row = { Icon: typeof Mail; label: string; value: React.ReactNode; href?: string }

function ContactRow({ Icon, label, value, href }: Row) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="border-foreground/15 text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-full border transition-all"
      >
        <Icon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-muted-foreground font-mono text-[0.7rem] font-medium tracking-[0.18em] uppercase">
          {label}
        </span>
        <div className="text-foreground group-hover:text-primary mt-1 text-base font-medium transition-colors">
          {value}
        </div>
      </div>
    </>
  )
  return (
    <li>
      {href ? (
        <a
          href={href}
          className="group focus-visible:ring-ring focus-visible:ring-offset-background flex items-start gap-4 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-start gap-4">{content}</div>
      )}
    </li>
  )
}

export default async function ContactPage() {
  const settings = await getSiteSettings().catch(() => null)
  const phoneHref = settings?.contactPhone
    ? `tel:${settings.contactPhone.replace(/\s+/g, '')}`
    : null

  return (
    <section className="bg-background relative isolate overflow-hidden pt-16 md:pt-18">
      {/* Halo radial chaud — atténué */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-secondary)_12%,transparent),transparent)] blur-2xl"
      />

      <div className="container-content relative pt-2 pb-20 md:pt-3 md:pb-28">
        {/* Header compact */}
        <div className="mb-5 flex items-baseline gap-4 md:mb-6">
          <p className="text-primary shrink-0 text-xs font-semibold tracking-[0.3em] uppercase">
            — Contact
          </p>
          <span
            aria-hidden="true"
            className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
          />
        </div>

        <div className="max-w-3xl">
          <h1 className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]">
            {contactContent.title}
          </h1>
          <p className="text-foreground/70 mt-4 text-base leading-[1.6] md:text-lg">
            {contactContent.intro}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne infos */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-7">
              <ContactRow
                Icon={MapPin}
                label="Adresse"
                value={
                  <address className="not-italic">
                    {ASSO_ADDRESS.venue}
                    <br />
                    {ASSO_ADDRESS.street}
                    <br />
                    {ASSO_ADDRESS.postalCode} {ASSO_ADDRESS.city}
                  </address>
                }
              />
              {settings?.contactEmail ? (
                <ContactRow
                  Icon={Mail}
                  label="Email"
                  value={settings.contactEmail}
                  href={`mailto:${settings.contactEmail}`}
                />
              ) : null}
              {settings?.contactPhone && phoneHref ? (
                <ContactRow
                  Icon={Phone}
                  label="Téléphone"
                  value={settings.contactPhone}
                  href={phoneHref}
                />
              ) : null}
            </ul>

            {/* Horaires - bandeau dédié */}
            <div className="border-foreground/12 mt-10 border-t border-dashed pt-6">
              <p className="text-muted-foreground font-mono text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                {contactContent.horaires.title}
              </p>
              <ul className="text-foreground/85 mt-3 flex flex-col gap-1.5 text-[0.95rem]">
                {contactContent.horaires.items.map((h) => (
                  <li key={h}>· {h}</li>
                ))}
              </ul>
            </div>

            {/* Carte */}
            <div className="relative mt-10">
              <div className="border-foreground/8 overflow-hidden rounded-[var(--radius-lg)] border shadow-[0_30px_60px_-25px_rgba(15,20,25,0.25)]">
                <Map
                  center={SEYSSINS_COORDS}
                  zoom={14}
                  markerLabel="Centre Sportif Yves Brouzet — Gym Multisport Seyssins"
                  className="h-[320px] w-full"
                />
              </div>
              <div
                aria-hidden="true"
                className="border-secondary/30 absolute -bottom-4 -right-4 -z-10 size-24 rounded-full border-2 border-dashed md:-bottom-6 md:-right-6 md:size-32"
              />
            </div>
          </div>

          {/* Colonne formulaire */}
          <div className="lg:col-span-7">
            <div className="bg-card border-foreground/8 rounded-[var(--radius-lg)] border p-7 shadow-[0_20px_40px_-25px_rgba(15,20,25,0.15)] md:p-10">
              <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                — Formulaire
              </p>
              <h2 className="font-display text-foreground mt-3 text-2xl leading-tight font-bold tracking-tight md:text-3xl">
                Envoyez-nous un message
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
