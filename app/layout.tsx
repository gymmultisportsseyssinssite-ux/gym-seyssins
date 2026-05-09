import type { Metadata } from 'next'
import { Bricolage_Grotesque, Manrope } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SITE } from '@/lib/constants'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  axes: ['opsz'],
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    // L'image OG est générée dynamiquement par app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>{children}</NuqsAdapter>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
