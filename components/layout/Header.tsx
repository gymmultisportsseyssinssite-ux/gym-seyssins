'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu } from 'lucide-react'

import { NAV_ITEMS, SITE_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
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
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(y / max, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        scrolled
          ? 'h-14 border-b border-[color:color-mix(in_oklab,var(--color-foreground)_8%,transparent)] bg-[color:color-mix(in_oklab,var(--color-background)_85%,transparent)] shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-foreground)_4%,transparent)] backdrop-blur-md md:h-16'
          : 'h-16 bg-background md:h-[72px]',
      )}
    >
      <div className="container-content flex h-full items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${SITE_NAME} — accueil`}
          className="group focus-visible:ring-ring flex items-center gap-3 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Image
            src="/images/logo.svg"
            alt=""
            width={32}
            height={32}
            className={cn(
              'transition-all duration-300 group-hover:rotate-[6deg]',
              scrolled ? 'size-7' : 'size-8',
            )}
            priority
          />
          <span
            className={cn(
              'font-display whitespace-nowrap transition-all duration-300',
              scrolled ? 'text-[0.85rem] md:text-sm' : 'text-sm md:text-[0.95rem]',
              'font-semibold tracking-tight',
            )}
          >
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
                      'group relative inline-flex h-11 items-center px-3.5 text-sm font-medium transition-colors',
                      'hover:text-primary focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2',
                      active ? 'text-primary' : 'text-foreground',
                    )}
                  >
                    {item.label}
                    {/* Underline animé */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'bg-primary absolute right-3.5 bottom-1.5 left-3.5 h-0.5 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                        active
                          ? 'origin-left scale-x-100'
                          : 'origin-left scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-2">
          <Link
            href="/cours#inscription"
            className="group bg-foreground text-background hover:bg-primary focus-visible:ring-ring focus-visible:ring-offset-background hidden items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all hover:gap-3 focus-visible:ring-2 focus-visible:ring-offset-2 md:inline-flex"
          >
            {inscriptionsOuvertes ? (
              <span className="relative flex size-1.5 shrink-0 rounded-full bg-[color:color-mix(in_oklab,var(--color-secondary)_90%,white)]">
                <span
                  aria-hidden="true"
                  className="absolute inline-flex size-full animate-ping rounded-full bg-[color:color-mix(in_oklab,var(--color-secondary)_90%,white)] opacity-75"
                />
              </span>
            ) : null}
            <span>S’inscrire</span>
            <span className="bg-background/15 group-hover:bg-background/25 relative flex size-5 items-center justify-center overflow-hidden rounded-full transition-colors">
              <ArrowRight
                className="size-3 transition-transform duration-300 group-hover:translate-x-5"
                aria-hidden="true"
              />
              <ArrowRight
                className="absolute size-3 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0"
                aria-hidden="true"
              />
            </span>
          </Link>

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
                  <Link
                    href="/cours#inscription"
                    onClick={() => setOpen(false)}
                    className="bg-foreground text-background hover:bg-primary inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-all"
                  >
                    {inscriptionsOuvertes ? (
                      <span className="bg-secondary relative flex size-1.5 rounded-full">
                        <span className="bg-secondary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                      </span>
                    ) : null}
                    <span>S’inscrire</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
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

      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="bg-foreground/5 absolute right-0 bottom-0 left-0 h-px"
      >
        <div
          className="from-primary via-secondary to-primary h-full origin-left bg-gradient-to-r transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  )
}
