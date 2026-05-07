export const contactContent = {
  title: 'Nous contacter',
  intro:
    'Une question sur les cours, les inscriptions ou la vie de l’association ? Écrivez-nous, nous vous répondrons dans les meilleurs délais.',
  horaires: {
    title: 'Horaires du bureau',
    items: [
      'Pendant la saison sportive : mardi de 17 h à 19 h',
      'Pendant les inscriptions : mardi 17 h–19 h, samedi 10 h–12 h',
      'Pendant les vacances scolaires : permanences sur rendez-vous',
    ] as const,
  },
  formulaire: {
    title: 'Envoyez-nous un message',
    submitLabel: 'Envoyer',
    successTitle: 'Message envoyé',
    successMessage:
      'Merci pour votre message. Nous vous répondrons par email dans les meilleurs délais.',
    sendAgainLabel: 'Envoyer un autre message',
    rgpdLabel: 'J’accepte que mes données soient utilisées pour traiter ma demande.',
  },
  sujets: [
    { value: 'information', label: 'Demande d’information' },
    { value: 'inscription', label: 'Inscription' },
    { value: 'cours', label: 'Question sur un cours' },
    { value: 'autre', label: 'Autre' },
  ] as const,
} as const

export type ContactSujet = (typeof contactContent.sujets)[number]['value']
