'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contactContent } from '@/content/contact'
import { contactSchema, type ContactInput } from '@/lib/contact-schema'

const DEFAULTS: ContactInput = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  sujet: 'information',
  message: '',
  rgpd: false,
  website: '',
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: DEFAULTS,
  })

  const onSubmit = async (values: ContactInput) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    })

    if (res.ok) {
      setSubmitted(true)
      return
    }

    if (res.status === 429) {
      toast.error('Trop d’envois récents. Merci de réessayer plus tard.')
      return
    }
    if (res.status === 400) {
      toast.error('Le formulaire contient des erreurs. Vérifiez les champs.')
      return
    }
    toast.error('Une erreur est survenue. Vous pouvez nous écrire directement par email.')
  }

  if (submitted) {
    return (
      <div className="bg-card border-border rounded-[var(--radius-lg)] border p-8 shadow-sm">
        <div className="flex flex-col items-start gap-4">
          <span
            aria-hidden="true"
            className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full"
          >
            <Check className="size-6" />
          </span>
          <h2 className="font-display text-foreground text-2xl">
            {contactContent.formulaire.successTitle}
          </h2>
          <p className="text-muted-foreground">{contactContent.formulaire.successMessage}</p>
          <Button
            variant="secondary"
            onClick={() => {
              form.reset(DEFAULTS)
              setSubmitted(false)
            }}
          >
            {contactContent.formulaire.sendAgainLabel}
          </Button>
        </div>
      </div>
    )
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-card border-border rounded-[var(--radius-lg)] border p-6 shadow-sm md:p-8"
      >
        <h2 className="font-display text-foreground text-2xl">{contactContent.formulaire.title}</h2>

        <div className="mt-6 grid grid-cols-1 gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom *</FormLabel>
                  <FormControl>
                    <Input autoComplete="given-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom *</FormLabel>
                  <FormControl>
                    <Input autoComplete="family-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" inputMode="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone (facultatif)</FormLabel>
                <FormControl>
                  <Input type="tel" autoComplete="tel" inputMode="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sujet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sujet *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Choisissez un sujet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contactContent.sujets.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Honeypot — caché aux humains, visible aux bots */}
          <div aria-hidden="true" className="absolute top-[-9999px] left-[-9999px]">
            <label>
              Site web (laisser vide)
              <input type="text" tabIndex={-1} autoComplete="off" {...form.register('website')} />
            </label>
          </div>

          <FormField
            control={form.control}
            name="rgpd"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={(c) => field.onChange(c === true)}
                    aria-required="true"
                    className="mt-1"
                  />
                </FormControl>
                <div className="flex-1">
                  <FormLabel className="text-sm leading-relaxed font-normal">
                    {contactContent.formulaire.rgpdLabel} *
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                Envoi en cours…
              </>
            ) : (
              contactContent.formulaire.submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
