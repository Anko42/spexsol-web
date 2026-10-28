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
  /** Shows the "ongoing" badge. */
  active: boolean
  /** Keep the entry but do not render it. */
  hidden?: boolean
}

// Companies worked with. Keep newest first.
export const collaborations: Collaboration[] = [
  {
    name: 'Localhost Company',
    url: 'https://localhost.company',
    role: {
      en: 'Senior engineer on client projects',
      sk: 'Senior inžinier na klientskych projektoch',
    },
    from: 2026,
    logo: '/logos/localhost-company.svg',
    active: true,
  },
  {
    name: 'nes group',
    role: {
      en: 'Software development on client projects',
      sk: 'Vývoj softvéru na klientskych projektoch',
    },
    from: 2025, // TODO confirm years, website, role
    active: false,
  },
  {
    name: "Gentlemen's",
    role: {
      en: 'Software development on client projects',
      sk: 'Vývoj softvéru na klientskych projektoch',
    },
    from: 2025, // TODO confirm years, website, role
    active: false,
  },
  {
    name: 'Freevision',
    url: 'https://freevision.sk',
    role: {
      en: 'Senior engineer on client apps',
      sk: 'Senior inžinier na klientskych aplikáciách',
    },
    from: 2024, // TODO confirm start year
    to: 2026,
    logo: '/logos/freevision.png',
    active: false,
  },
]
