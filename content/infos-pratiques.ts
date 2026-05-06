export type AccessSection = {
  title: string
  content: string[]
}

export const infosPratiquesContent = {
  hero: {
    eyebrow: 'Infos pratiques',
    title: 'Tout ce qu’il faut savoir avant de venir',
    subtitle:
      'Accès, tarifs, calendrier de la saison et réponses aux questions les plus fréquentes.',
  },
  accessSection: {
    title: 'Accès et stationnement',
    sections: [
      {
        title: 'En voiture',
        content: [
          'Les cours se tiennent à la salle des sports de Seyssins. Depuis Grenoble, prendre la direction Seyssins par l’avenue de la République, puis suivre les panneaux « Salle des sports ».',
          'Le stationnement est gratuit sur le parking adjacent (environ 30 places). En cas d’affluence, un parking complémentaire est disponible à 150 m, rue des Marronniers.',
        ],
      },
      {
        title: 'En transports en commun',
        content: [
          'La ligne C4 du réseau TAG dessert l’arrêt « Seyssins Mairie » à 5 minutes à pied de la salle.',
          'Les lignes 21 et 22 du réseau Métrovélo permettent également de rejoindre Seyssins en vélo en site propre depuis Grenoble.',
        ],
      },
      {
        title: 'Vélo et marche',
        content: [
          'Un râtelier à vélos est installé devant la salle. Les abords sont sécurisés et adaptés aux modes doux.',
        ],
      },
    ] satisfies readonly AccessSection[],
  },
  tarifsSection: {
    title: 'Tarifs et adhésion',
    intro:
      'L’adhésion couvre la saison sportive complète, de septembre à juin. Elle donne accès à un nombre illimité de cours dans les disciplines choisies.',
    table: {
      headers: ['Formule', 'Prix annuel', 'Inclus'],
      rows: [
        ['Adhésion individuelle 1 cours', '180 €', '1 séance par semaine, toutes saisons'],
        ['Adhésion individuelle multi-cours', '240 €', 'Accès à toutes les disciplines'],
        ['Tarif famille (2e adhérent)', '−15 %', 'Sur la cotisation du second adhérent'],
        ['Tarif jeune (−25 ans)', '120 €', 'Sur présentation d’un justificatif'],
      ] as const,
    },
  },
  saisonSection: {
    title: 'Calendrier de la saison',
    dates: [
      {
        label: 'Inscriptions',
        date: 'Du 1er au 15 septembre',
        description: 'Permanences au bureau de l’association, salle des sports.',
      },
      {
        label: 'Reprise des cours',
        date: 'Lundi 16 septembre',
        description: 'Première semaine de cours pour toutes les disciplines.',
      },
      {
        label: 'Vacances de la Toussaint',
        date: 'Du 21 octobre au 3 novembre',
        description: 'Pas de cours pendant les vacances scolaires.',
      },
      {
        label: 'Assemblée générale',
        date: 'Samedi 22 mars',
        description:
          'Bilan de la saison et projets pour l’année suivante. Tous les adhérents sont conviés.',
      },
      {
        label: 'Fin de saison',
        date: 'Vendredi 27 juin',
        description: 'Dernier cours et goûter de fin d’année.',
      },
    ] as const,
  },
  faq: [
    {
      question: 'Faut-il un certificat médical pour s’inscrire ?',
      reponse:
        'Oui, un certificat médical de non contre-indication à la pratique sportive de moins de 6 mois est demandé à l’inscription. Il est valable trois saisons consécutives.',
    },
    {
      question: 'Puis-je essayer un cours avant de m’inscrire ?',
      reponse:
        'Oui, nous proposons un cours d’essai gratuit dans la discipline de votre choix. Contactez-nous pour réserver votre créneau.',
    },
    {
      question: 'Que se passe-t-il pendant les vacances scolaires ?',
      reponse:
        'Les cours sont interrompus pendant les vacances scolaires de la zone A (Grenoble). Le calendrier précis est affiché en début de saison.',
    },
    {
      question: 'Puis-je changer de cours en cours d’année ?',
      reponse:
        'C’est possible dans la limite des places disponibles. Adressez votre demande au bureau, qui transmettra au professeur concerné.',
    },
    {
      question: 'Y a-t-il des cours pour les personnes à mobilité réduite ?',
      reponse:
        'Oui, notre discipline « Gym sur chaise » est spécifiquement conçue pour les personnes à mobilité réduite ou en convalescence. Renseignez-vous auprès du bureau.',
    },
    {
      question: 'Comment se déroule le paiement ?',
      reponse:
        'Le paiement peut s’effectuer en une, deux ou trois fois (chèques encaissés à dates échelonnées). Les chèques vacances et coupons sport sont acceptés.',
    },
  ] as const,
} as const
