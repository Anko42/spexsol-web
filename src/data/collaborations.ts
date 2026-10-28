export type CollaborationVia = 'spexsol' | 'freelance' | 'employee'

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
  /** Invert the logo in light mode (for white-on-transparent marks). */
  invertLight?: boolean
  /** Through SpexSol, as a freelancer, or as an employee. Drives grouping on the page. */
  via: CollaborationVia
  /** Shows the "ongoing" badge. */
  active: boolean
  /** Keep the entry but do not render it. */
  hidden?: boolean
}

// Companies worked with. Keep newest first within each group.
export const collaborations: Collaboration[] = [
  // Through SpexSol (2025 –)
  {
    name: 'Localhost Company',
    url: 'https://localhost.company',
    role: {
      en: 'Senior engineer on client projects',
      sk: 'Senior inžinier na klientskych projektoch',
    },
    from: 2026,
    logo: '/logos/localhost-company.svg',
    via: 'spexsol',
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
    via: 'spexsol',
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
    via: 'spexsol',
    active: true,
  },

  // Before SpexSol: freelance
  {
    name: 'Freevision',
    url: 'https://freevision.sk',
    role: {
      en: 'Web and mobile apps for bus transport',
      sk: 'Webové a mobilné aplikácie pre autobusovú dopravu',
    },
    from: 2024,
    to: 2026,
    logo: '/logos/freevision.png',
    via: 'freelance',
    active: false,
  },
  {
    name: 'Kontentino',
    url: 'https://www.kontentino.com',
    role: {
      en: 'Frontend of a social media planning SaaS',
      sk: 'Frontend SaaS nástroja na plánovanie sociálnych sietí',
    },
    from: 2024,
    to: 2024,
    logo: '/logos/kontentino.png',
    via: 'freelance',
    active: false,
  },
  {
    name: 'Garwan',
    url: 'https://www.garwan.com',
    role: {
      en: 'Crypto hub, live blog and sports site with streaming',
      sk: 'Krypto hub, live blog a športový web so streamingom',
    },
    from: 2021,
    to: 2023,
    logo: '/logos/garwan.png',
    via: 'freelance',
    active: false,
  },
  {
    name: 'M7',
    url: 'https://www.m7.sk',
    role: {
      en: 'CRM and e-commerce platforms',
      sk: 'CRM a e-commerce platformy',
    },
    from: 2020,
    to: 2021,
    logo: '/logos/m7.png',
    via: 'freelance',
    active: false,
  },
  {
    name: 'bbbpets.sk',
    url: 'https://bbbpets.sk',
    role: {
      en: 'Turnkey e-shop and server administration',
      sk: 'E-shop na kľúč a správa servera',
    },
    from: 2020,
    to: 2020,
    logo: '/logos/bbbpets.png',
    invertLight: true,
    via: 'freelance',
    active: false,
  },
]
