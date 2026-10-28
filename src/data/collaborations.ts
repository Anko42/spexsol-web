export interface Collaboration {
  name: string
  url?: string
  /** What you did or do for them. */
  role: { en: string; sk: string }
  /** Year started. */
  from: number
  /** Year ended; omit while ongoing. */
  to?: number
  /** Optional logo path under /public, e.g. "/logos/acme.svg". */
  logo?: string
}

// Companies worked with. Keep newest first. Ongoing ones have no `to`.
export const collaborations: Collaboration[] = []
