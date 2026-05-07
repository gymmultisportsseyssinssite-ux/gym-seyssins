import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SITE } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
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
    <html lang="fr" className={`${inter.variable} ${sourceSerif.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
