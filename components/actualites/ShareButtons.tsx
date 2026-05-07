'use client'

import { useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.5V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.4v7h3.1z" />
    </svg>
  )
}

type Props = {
  url: string
  titre: string
}

export function ShareButtons({ url, titre }: Props) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  const mailto = `mailto:?subject=${encodeURIComponent(titre)}&body=${encodeURIComponent(`${titre}\n${url}`)}`
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground mr-2 text-sm font-medium">Partager :</span>
      <Button asChild size="sm" variant="ghost" aria-label="Partager par email">
        <a href={mailto}>
          <Mail className="size-4" aria-hidden="true" />
          Email
        </a>
      </Button>
      <Button asChild size="sm" variant="ghost" aria-label="Partager sur Facebook">
        <a href={fb} target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="size-4" />
          Facebook
        </a>
      </Button>
      <Button size="sm" variant="ghost" onClick={onCopy} aria-label="Copier le lien">
        {copied ? (
          <>
            <Check className="size-4" aria-hidden="true" />
            Copié
          </>
        ) : (
          <>
            <Copy className="size-4" aria-hidden="true" />
            Copier le lien
          </>
        )}
      </Button>
    </div>
  )
}
