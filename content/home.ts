export const homeContent = {
  hero: {
    eyebrow: 'Association sportive de Seyssins',
    title: 'Le sport au cœur de la convivialité.',
    subtitle:
      'Depuis plus de 30 ans, nous proposons une dizaine de disciplines sportives pour tous les niveaux et tous les âges.',
    image: { src: '/images/hero.jpg', alt: 'Cours collectif de gymnastique douce' },
    primaryCta: { label: 'Découvrir nos cours', href: '/cours' },
    secondaryCta: { label: 'Nous contacter', href: '/contact' },
  },
  association: {
    eyebrow: 'Notre association',
    title: 'Une famille sportive ancrée à Seyssins',
    paragraphs: [
      'Née de l’envie commune de bouger ensemble, la Gym Multisport Seyssins rassemble depuis plus de trois décennies des Seyssinoises et Seyssinois de tous âges. Notre fil conducteur : la convivialité avant la performance.',
      'Chaque saison, plus de 200 adhérents se retrouvent dans nos salles pour pratiquer une dizaine de disciplines, encadrés par des professeurs diplômés. Notre force : un esprit familial où chacun trouve sa place, qu’il soit débutant ou confirmé.',
      'L’association est administrée par un bureau bénévole et soutenue par la mairie de Seyssins. Adhérer, c’est rejoindre une communauté qui prend soin de soi, et des autres.',
    ],
    images: [
      { src: '/images/asso-1.jpg', alt: 'Groupe de gymnastes en cours' },
      { src: '/images/asso-2.jpg', alt: 'Activité collective dans la salle' },
    ],
    cta: { label: 'En savoir plus', href: '/association' },
  },
  cours: {
    eyebrow: 'Nos cours',
    title: 'Nos disciplines',
    subtitle: 'Du Pilates au renforcement musculaire, trouvez l’activité qui vous correspond.',
    cta: { label: 'Voir le planning complet', href: '/cours' },
  },
  actualites: {
    eyebrow: 'Actualités',
    title: 'Dernières actualités',
    subtitle: 'Événements, communiqués et temps forts de la saison.',
    cta: { label: 'Toutes les actualités', href: '/actualites' },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Nous trouver',
    bureauHoraires: 'Bureau ouvert le mardi de 17 h à 19 h pendant la saison sportive.',
    cta: { label: 'Formulaire de contact', href: '/contact' },
  },
} as const
