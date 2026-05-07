import type { LucideIcon } from 'lucide-react'
import { Heart, HeartHandshake, Sparkles, Trophy } from 'lucide-react'

export type Valeur = {
  icon: LucideIcon
  title: string
  description: string
}

export type Membre = {
  nom: string
  role: string
  photo?: string
  bio?: string
}

export const associationContent = {
  hero: {
    eyebrow: 'Notre association',
    title: 'Une histoire sportive, une famille seyssinoise.',
    subtitle:
      'Depuis plus de 30 ans, la Gym Multisport Seyssins rassemble celles et ceux qui veulent bouger ensemble, apprendre et progresser à leur rythme.',
    image: { src: '/images/association-hero.jpg', alt: 'Adhérents en cours collectif' },
  },
  histoire: {
    title: 'Notre histoire',
    paragraphs: [
      'Fondée en 1990 par un groupe de passionnés de gymnastique douce, l’association est née d’une volonté simple : offrir aux habitants de Seyssins un lieu pour entretenir leur corps sans esprit de compétition. À l’époque, les cours se tenaient dans le hall polyvalent du village, avec quelques tapis et beaucoup d’enthousiasme.',
      'Au fil des saisons, l’offre s’est élargie. Le Pilates a rejoint la gym douce dans les années 2000, suivi par le renforcement musculaire, le stretching, et plus récemment la gym sur chaise pour les seniors. Chaque nouvelle discipline a été ajoutée en réponse à la demande des adhérents.',
      'Aujourd’hui, l’association rassemble plus de 200 membres, encadrés par une équipe de professeurs diplômés. Le bureau, exclusivement bénévole, veille à préserver l’esprit fondateur : la convivialité avant tout.',
    ],
  },
  valeurs: [
    {
      icon: HeartHandshake,
      title: 'Convivialité',
      description:
        'Le plaisir de se retrouver et de partager une activité, indépendamment du niveau de chacun.',
    },
    {
      icon: Heart,
      title: 'Inclusion',
      description:
        'Des cours adaptés à tous les âges et à toutes les conditions physiques. Personne n’est laissé de côté.',
    },
    {
      icon: Sparkles,
      title: 'Bien-être',
      description:
        'Bouger pour se sentir mieux dans son corps comme dans sa tête, à son rythme et sans pression.',
    },
    {
      icon: Trophy,
      title: 'Exigence',
      description:
        'Des professeurs formés et passionnés, des cours préparés avec soin pour faire progresser chaque adhérent.',
    },
  ] satisfies readonly Valeur[],
  bureau: [
    {
      nom: 'Marie Dubois',
      role: 'Présidente',
      photo: '/images/bureau-1.jpg',
      bio: 'Adhérente depuis 2010, Marie a pris la présidence en 2022 avec l’envie de moderniser l’association tout en préservant son esprit familial.',
    },
    {
      nom: 'Jean-Pierre Martin',
      role: 'Trésorier',
      photo: '/images/bureau-2.jpg',
      bio: 'Comptable de métier, Jean-Pierre veille depuis cinq ans à la santé financière de l’association.',
    },
    {
      nom: 'Sylvie Bernard',
      role: 'Secrétaire',
      photo: '/images/bureau-3.jpg',
      bio: 'Sylvie coordonne la communication et la vie quotidienne du bureau. Elle pratique le Pilates depuis dix ans.',
    },
    {
      nom: 'Antoine Roux',
      role: 'Membre du bureau',
      photo: '/images/bureau-4.jpg',
      bio: 'Antoine s’occupe des relations avec la mairie et de la logistique des événements.',
    },
  ] satisfies readonly Membre[],
  cta: {
    title: 'Rejoignez-nous pour la nouvelle saison',
    description:
      'Téléchargez la fiche d’inscription et le règlement intérieur pour devenir membre.',
    buttonLabel: 'Documents et inscription',
    buttonHref: '/documents',
  },
} as const
