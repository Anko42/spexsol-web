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
export const collaborations: Collaboration[] = [
  {
    name: 'Localhost Company',
    url: 'https://localhost.company',
    role: {
      en: 'Senior engineer on client projects',
      sk: 'Senior inÅ¾inier na klientskych projektoch',
    },
    from: 2026,
    logo: '/logos/localhost-company.svg',
  },
  {
    name: 'nes group',
    role: {
      en: 'Software development on client projects',
      sk: 'Vývoj softvéru na klientskych projektoch',
    },
    from: 2025, // TODO confirm years, website, role
    to: 2025,
  },
  {
    name: "Gentlemen's",
    role: {
      en: 'Software development on client projects',
      sk: 'Vývoj softvéru na klientskych projektoch',
    },
    from: 2025, // TODO confirm years, website, role
    to: 2025,
  },
  {
    name: 'Freevision',
    url: 'https://freevision.sk',
    role: {
      en: 'Senior engineer on client apps',
      sk: 'Senior inÅ¾inier na klientskych aplikÃ¡ciÃ¡ch',
    },
    from: 2024, // TODO confirm start year
    to: 2026,
    logo: '/logos/freevision.png',
  },
]
