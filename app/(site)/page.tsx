import { FadeIn } from '@/components/shared/FadeIn'
import { JsonLd } from '@/components/shared/JsonLd'
import { HomeActualites } from '@/components/sections/home/HomeActualites'
import { HomeAssociation } from '@/components/sections/home/HomeAssociation'
import { HomeContact } from '@/components/sections/home/HomeContact'
import { HomeCoursPreview } from '@/components/sections/home/HomeCoursPreview'
import { HomeHero } from '@/components/sections/home/HomeHero'
import { ASSO_ADDRESS, SITE } from '@/lib/constants'
import { getSiteSettings } from '@/lib/sanity/fetch'

export default async function HomePage() {
  const settings = await getSiteSettings().catch(() => null)

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ASSO_ADDRESS.street,
      postalCode: ASSO_ADDRESS.postalCode,
      addressLocality: ASSO_ADDRESS.city,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.1649,
      longitude: 5.69,
    },
    ...(settings?.contactEmail ? { email: settings.contactEmail } : {}),
    ...(settings?.contactPhone ? { telephone: settings.contactPhone } : {}),
    sameAs: [],
  }

  return (
    <>
      <JsonLd data={localBusiness} />
      <HomeHero />
      <FadeIn>
        <HomeAssociation />
      </FadeIn>
      <FadeIn>
        <HomeCoursPreview />
      </FadeIn>
      <FadeIn>
        <HomeActualites />
      </FadeIn>
      <FadeIn>
        <HomeContact contactEmail={settings?.contactEmail} contactPhone={settings?.contactPhone} />
      </FadeIn>
    </>
  )
}
