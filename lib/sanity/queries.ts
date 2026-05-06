import { defineQuery } from 'next-sanity'

// =====================================================================
// Réglages du site (singleton)
// =====================================================================
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    contactEmail,
    contactPhone,
    inscriptionsOuvertes,
    inscriptionsMessage,
    saisonCourante
  }
`)

// =====================================================================
// Articles
// =====================================================================

// Articles à la une — privilégie featured=true, complète avec les plus récents.
// Limite à 3 résultats au total.
export const featuredArticlesQuery = defineQuery(`
  *[_type == "article"] | order(featured desc, datePublication desc)[0...3]{
    _id,
    titre,
    "slug": slug.current,
    datePublication,
    chapo,
    categorie,
    featured,
    imagePrincipale{ ..., asset->, alt }
  }
`)

// Tous les articles, du plus récent au plus ancien
export const allArticlesQuery = defineQuery(`
  *[_type == "article"] | order(datePublication desc){
    _id,
    titre,
    "slug": slug.current,
    datePublication,
    dateEvenement,
    chapo,
    categorie,
    featured,
    imagePrincipale{ ..., asset->, alt }
  }
`)

// Article par slug + 3 articles liés (même catégorie, hors article courant)
export const articleBySlugQuery = defineQuery(`
  {
    "article": *[_type == "article" && slug.current == $slug][0]{
      _id,
      titre,
      "slug": slug.current,
      datePublication,
      dateEvenement,
      chapo,
      contenu,
      categorie,
      featured,
      imagePrincipale{ ..., asset->, alt },
      auteur->{
        _id,
        prenom,
        nom,
        photo{ ..., asset->, alt }
      }
    },
    "articlesLies": *[
      _type == "article"
      && slug.current != $slug
      && categorie == *[_type == "article" && slug.current == $slug][0].categorie
    ] | order(datePublication desc)[0...3]{
      _id,
      titre,
      "slug": slug.current,
      datePublication,
      chapo,
      categorie,
      imagePrincipale{ ..., asset->, alt }
    }
  }
`)

// =====================================================================
// Cours et planning
// =====================================================================

// Tous les cours avec discipline + professeur dépéréférencés.
// Tri jour (lundi → samedi) puis heure de début.
export const allCoursWithDetailsQuery = defineQuery(`
  *[_type == "cours"]{
    _id,
    titre,
    jour,
    heureDebut,
    heureFin,
    lieu,
    placesMax,
    placesRestantes,
    statut,
    description,
    ordre,
    discipline->{
      _id,
      nom,
      "slug": slug.current,
      couleur,
      niveauRequis
    },
    professeur->{
      _id,
      prenom,
      nom,
      photo{ ..., asset->, alt }
    }
  } | order(
    select(
      jour == "lundi" => 1,
      jour == "mardi" => 2,
      jour == "mercredi" => 3,
      jour == "jeudi" => 4,
      jour == "vendredi" => 5,
      jour == "samedi" => 6,
      99
    ) asc,
    heureDebut asc
  )
`)

// =====================================================================
// Disciplines
// =====================================================================
export const allDisciplinesQuery = defineQuery(`
  *[_type == "discipline"] | order(nom asc){
    _id,
    nom,
    "slug": slug.current,
    description,
    couleur,
    niveauRequis,
    icone{ ..., asset-> }
  }
`)

// =====================================================================
// Professeurs (avec leurs cours)
// =====================================================================
export const allProfesseursWithCoursQuery = defineQuery(`
  *[_type == "professeur"] | order(ordre asc, nom asc){
    _id,
    prenom,
    nom,
    photo{ ..., asset->, alt },
    bio,
    ordre,
    specialites[]->{
      _id,
      nom,
      "slug": slug.current,
      couleur
    },
    "cours": *[_type == "cours" && references(^._id)]{
      _id,
      titre,
      jour,
      heureDebut,
      heureFin,
      lieu,
      discipline->{ nom, couleur }
    }
  }
`)

// =====================================================================
// Documents (groupés par catégorie côté composant)
// =====================================================================
export const allDocumentsQuery = defineQuery(`
  *[_type == "documentTelechargeable"] | order(categorie asc, ordre asc){
    _id,
    titre,
    description,
    categorie,
    saison,
    ordre,
    "fichierUrl": fichier.asset->url,
    "fichierExtension": fichier.asset->extension,
    "fichierTaille": fichier.asset->size
  }
`)

// =====================================================================
// Galeries photo
// =====================================================================
export const allGaleriesQuery = defineQuery(`
  *[_type == "galeriePhoto"] | order(date desc){
    _id,
    titre,
    "slug": slug.current,
    date,
    description,
    coverImage{ ..., asset->, alt },
    "nombrePhotos": count(photos)
  }
`)

export const galerieBySlugQuery = defineQuery(`
  *[_type == "galeriePhoto" && slug.current == $slug][0]{
    _id,
    titre,
    "slug": slug.current,
    date,
    description,
    coverImage{ ..., asset->, alt },
    photos[]{ ..., asset->, alt, legende },
    evenementLie->{
      _id,
      titre,
      "slug": slug.current
    }
  }
`)
