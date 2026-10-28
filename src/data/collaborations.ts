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
      en: 'Frontend developer. Web and mobile apps for bus transport (React, Ionic, Capacitor), native bridges, legacy migration.',
      sk: 'Frontend vývojár. Webové a mobilné aplikácie pre autobusovú dopravu (React, Ionic, Capacitor), natívne bridge, migrácia legacy aplikácie.',
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
      en: 'Frontend developer on a social media planning SaaS used by thousands of teams daily.',
      sk: 'Frontend vývojár SaaS nástroja na plánovanie sociálnych sietí, ktorý denne používajú tisíce tímov.',
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
      en: 'Full-stack developer (React, Laravel). Crypto hub, live blog platform, sports site with live streaming.',
      sk: 'Full-stack vývojár (React, Laravel). Krypto hub, live blog platforma, športový web s live streamingom.',
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
      en: 'Full-stack developer on CRM and e-commerce platforms (Vue.js).',
      sk: 'Full-stack vývojár CRM a e-commerce platforiem (Vue.js).',
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
      en: 'Built the e-shop from provided designs, then ran server and database administration.',
      sk: 'Postavil e-shop podľa dodaných návrhov, potom správa servera a databázy.',
    },
    from: 2020,
    to: 2020,
    logo: '/logos/bbbpets.png',
    invertLight: true,
    via: 'freelance',
    active: false,
  },
]
