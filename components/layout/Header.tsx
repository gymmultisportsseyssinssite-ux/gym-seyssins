'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type HeaderProps = {
  inscriptionsOuvertes?: boolean
}

export function Header({ inscriptionsOuvertes = false }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-200',
        'h-16 md:h-[72px]',
        scrolled ? 'border-border bg-background/85 border-b backdrop-blur-md' : 'bg-background',
      )}
    >
      <div className="container-content flex h-full items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${SITE_NAME} — accueil`}
          className="focus-visible:ring-ring flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Image src="/images/logo.svg" alt="" width={36} height={36} className="size-9" priority />
          <span className="font-display text-base font-semibold tracking-tight whitespace-nowrap md:text-lg">
            <span className="hidden md:inline">Gym Multisport </span>Seyssins
          </span>
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-11 items-center px-3 text-sm font-medium transition-colors',
                      'hover:text-primary focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                      active ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {item.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="bg-primary absolute right-3 bottom-1 left-3 h-0.5 rounded-full"
                      />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/cours#inscription">
              S’inscrire
              {inscriptionsOuvertes ? (
                <Badge
                  variant="secondary"
                  className="ml-1 bg-white/20 px-2 text-[0.7rem] text-white"
                >
                  Ouvertes
                </Badge>
              ) : null}
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Ouvrir le menu">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation principale du site
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Navigation mobile" className="mt-6 px-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex h-12 items-center rounded-md px-4 text-base font-medium transition-colors',
                            active ? 'bg-muted text-primary' : 'text-foreground hover:bg-muted',
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-6 px-4">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/cours#inscription" onClick={() => setOpen(false)}>
                      S’inscrire
                    </Link>
                  </Button>
                  {inscriptionsOuvertes ? (
                    <p className="text-muted-foreground mt-3 text-center text-sm">
                      ✓ Inscriptions ouvertes
                    </p>
                  ) : null}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
