import type { Product } from '~/lib/product-schema'

export const products: Product[] = [
  {
    slug: 'focusflow',
    name: 'FocusFlow',
    tagline: {
      en: 'A calm timer for deep work sessions.',
      sk: 'Pokojný časovač pre sústredenú prácu.',
    },
    description: {
      en: 'FocusFlow is a minimalist pomodoro-style timer that adapts to how you actually work. Set a session, mute distractions, and let the app handle the rest.\n\nBuilt for people who want to ship, not fiddle with settings. Syncs across iPhone, iPad and Mac.',
      sk: 'FocusFlow je minimalistický časovač v štýle pomodoro, ktorý sa prispôsobí tomu, ako reálne pracujete. Nastavte si reláciu, vypnite rušivé elementy a appka sa postará o zvyšok.\n\nVytvorený pre ľudí, ktorí chcú dodávať výsledky, nie sa hrať s nastaveniami. Synchronizuje sa medzi iPhone, iPad a Mac.',
    },
    category: 'Productivity',
    platform: 'ios',
    icon: '/products/focusflow/icon.png',
    screenshots: [
      '/products/focusflow/screenshot-1.png',
      '/products/focusflow/screenshot-2.png',
      '/products/focusflow/screenshot-3.png',
    ],
    links: [
      {
        type: 'appStore',
        url: 'https://apps.apple.com/app/id000000000',
      },
      {
        type: 'website',
        url: 'https://focusflow.example.com',
      },
    ],
  },
  {
    slug: 'trailmark',
    name: 'TrailMark',
    tagline: {
      en: 'Offline hiking maps with shareable routes.',
      sk: 'Offline turistické mapy so zdieľateľnými trasami.',
    },
    description: {
      en: 'TrailMark gives hikers reliable offline maps, elevation profiles and route sharing without the bloat. Download a region before you leave the signal behind.\n\nCommunity routes are moderated and come with difficulty and recent-conditions tags.',
      sk: 'TrailMark ponúka turistom spoľahlivé offline mapy, výškové profily a zdieľanie trás bez zbytočností. Stiahnite si región predtým, než stratíte signál.\n\nKomunitné trasy sú moderované a obsahujú štítky náročnosti a aktuálnych podmienok.',
    },
    category: 'Travel',
    platform: 'cross-platform',
    icon: '/products/trailmark/icon.png',
    screenshots: [
      '/products/trailmark/screenshot-1.png',
      '/products/trailmark/screenshot-2.png',
    ],
    links: [
      {
        type: 'appStore',
        url: 'https://apps.apple.com/app/id000000001',
      },
      {
        type: 'playStore',
        url: 'https://play.google.com/store/apps/details?id=com.example.trailmark',
      },
    ],
  },
  {
    slug: 'ledgerly',
    name: 'Ledgerly',
    tagline: {
      en: 'Simple invoicing for Slovak freelancers.',
      sk: 'Jednoduché fakturovanie pre slovenských freelancerov.',
    },
    description: {
      en: 'Ledgerly is a no-nonsense invoicing tool tailored for Slovak sole traders. Issue compliant invoices in seconds, track payments, and export everything your accountant needs.\n\nSupports EUR, reverse charge, and the usual VAT scenarios. No subscription traps.',
      sk: 'Ledgerly je priamočiary fakturačný nástroj pre slovenských živnostníkov. Vystavte korektné faktúry za pár sekúnd, sledujte platby a vyexportujte všetko, čo účtovník potrebuje.\n\nPodporuje EUR, prenesenú daňovú povinnosť a bežné DPH scenáre. Bez predplatiteľských pascí.',
    },
    category: 'Finance',
    platform: 'web',
    icon: '/products/ledgerly/icon.png',
    screenshots: [
      '/products/ledgerly/screenshot-1.png',
      '/products/ledgerly/screenshot-2.png',
      '/products/ledgerly/screenshot-3.png',
      '/products/ledgerly/screenshot-4.png',
    ],
    links: [
      {
        type: 'website',
        url: 'https://ledgerly.example.com',
      },
    ],
  },
  {
    slug: 'nestnote',
    name: 'NestNote',
    tagline: {
      en: 'Shared notes for couples and small households.',
      sk: 'Zdieľané poznámky pre páry a malé domácnosti.',
    },
    description: {
      en: 'NestNote keeps groceries, chores and household ideas in one shared space. Built for two-to-four person homes that have outgrown a messaging thread.\n\nNo accounts required to join — scan a QR code and you are in.',
      sk: 'NestNote drží nákupy, úlohy a nápady pre domácnosť na jednom zdieľanom mieste. Vytvorené pre dvoj- až štvorčlenné domácnosti, ktorým už nestačí chat.\n\nNa pripojenie nepotrebujete účet — stačí naskenovať QR kód.',
    },
    category: 'Lifestyle',
    platform: 'ios',
    icon: '/products/nestnote/icon.png',
    screenshots: [
      '/products/nestnote/screenshot-1.png',
      '/products/nestnote/screenshot-2.png',
    ],
    links: [
      {
        type: 'appStore',
        url: 'https://apps.apple.com/app/id000000002',
      },
    ],
  },
]

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug)
