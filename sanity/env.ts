function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Variable manquante : NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Variable manquante : NEXT_PUBLIC_SANITY_DATASET',
)

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-05-01'

export const studioBasePath = '/studio'

export const readToken = process.env.SANITY_API_READ_TOKEN
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET
