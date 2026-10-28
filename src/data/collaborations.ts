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
  /** Invert the logo in dark mode (for black-on-transparent marks). */
  invertDark?: boolean
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
      en: 'Engineer on client projects',
      sk: 'Inžinier na klientskych projektoch',
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
    from: 2026,
    logo: '/logos/nes-group.svg',
    invertDark: true,
    active: true,
  },
  {
    name: "Gentlemen's",
    url: 'https://gentlemens.sk',
    role: {
      en: 'iOS apps in React Native',
      sk: 'iOS aplikácie v React Native',
    },
    from: 2025,
    logo: '/logos/gentlemens.png',
    invertDark: true,
    active: true,
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
