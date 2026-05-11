import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { homeContent } from '@/content/home'
import { ASSO_ADDRESS } from '@/lib/constants'
import { Map } from '@/components/shared/Map'

const SEYSSINS_COORDS: [number, number] = [5.69, 45.1649]

type HomeContactProps = {
  contactEmail?: string
  contactPhone?: string
}

type ContactRow = {
  Icon: typeof Mail
  label: string
  value: React.ReactNode
  href?: string
}

function ContactItem({ Icon, label, value, href }: ContactRow) {
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

export function HomeContact({ contactEmail, contactPhone }: HomeContactProps) {
  const { contact } = homeContent
  const phoneHref = contactPhone ? `tel:${contactPhone.replace(/\s+/g, '')}` : null

  return (
    <section
      aria-labelledby="home-contact-title"
      className="bg-card relative isolate overflow-hidden"
    >
      <div className="container-content relative py-12 md:py-16 lg:py-20">
        {/* Header éditorial */}
        <div className="mb-12 flex items-baseline gap-6 md:mb-16">
          <span
            aria-hidden="true"
            className="font-display text-primary/15 text-[5rem] leading-none font-light tracking-tighter md:text-[7rem]"
          >
            04
          </span>
          <div className="flex-1 border-t border-dashed border-[color:color-mix(in_oklab,var(--color-primary)_25%,transparent)] pt-3">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
              {contact.eyebrow}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne infos */}
          <div className="lg:col-span-5">
            <h2
              id="home-contact-title"
              className="font-display text-foreground text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.025em]"
            >
              {contact.title}
            </h2>

            <ul className="mt-10 flex flex-col gap-7">
              <ContactItem
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
              {contactEmail ? (
                <ContactItem
                  Icon={Mail}
                  label="Email"
                  value={contactEmail}
                  href={`mailto:${contactEmail}`}
                />
              ) : null}
              {contactPhone && phoneHref ? (
                <ContactItem
                  Icon={Phone}
                  label="Téléphone"
                  value={contactPhone}
                  href={phoneHref}
                />
              ) : null}
            </ul>

            {/* Bureau horaires - bandeau dédié */}
            <div className="border-foreground/12 mt-10 border-t border-dashed pt-6">
              <p className="text-muted-foreground font-mono text-[0.7rem] font-semibold tracking-[0.18em] uppercase">
                Horaires bureau
              </p>
              <p className="text-foreground/85 mt-2 text-base">{contact.bureauHoraires}</p>
            </div>

            <div className="mt-10">
              <Link
                href={contact.cta.href}
                className="group bg-foreground text-background hover:bg-primary focus-visible:ring-ring focus-visible:ring-offset-card inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span>{contact.cta.label}</span>
                <span className="bg-background/15 group-hover:bg-background/25 relative flex size-7 items-center justify-center overflow-hidden rounded-full transition-colors">
                  <ArrowUpRight
                    className="absolute size-3.5 transition-transform duration-300 group-hover:translate-x-3.5 group-hover:-translate-y-3.5"
                    aria-hidden="true"
                  />
                  <ArrowUpRight
                    className="absolute size-3.5 -translate-x-3.5 translate-y-3.5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Colonne carte */}
          <div className="lg:col-span-7">
            <div className="relative">
              <div className="border-foreground/8 overflow-hidden rounded-[var(--radius-lg)] border shadow-[0_30px_60px_-25px_rgba(15,20,25,0.25)]">
                <Map
                  center={SEYSSINS_COORDS}
                  zoom={14}
                  markerLabel="Centre Sportif Yves Brouzet — Gym Multisport Seyssins"
                  className="h-[420px] w-full md:h-[480px]"
                />
              </div>
              {/* Cercle décoratif */}
              <div
                aria-hidden="true"
                className="border-secondary/30 absolute -bottom-5 -right-5 -z-10 size-28 rounded-full border-2 border-dashed md:-bottom-8 md:-right-8 md:size-36"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
