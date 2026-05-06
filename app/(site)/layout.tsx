import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteSettings } from '@/lib/sanity/fetch'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings().catch(() => null)

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:px-4 focus:py-2 focus:font-medium focus:shadow-md"
      >
        Aller au contenu principal
      </a>

      <Header inscriptionsOuvertes={settings?.inscriptionsOuvertes ?? false} />

      <main id="main-content" className="flex min-h-screen flex-1 flex-col pt-16 md:pt-[72px]">
        {children}
      </main>

      <Footer contactEmail={settings?.contactEmail} contactPhone={settings?.contactPhone} />
    </>
  )
}
