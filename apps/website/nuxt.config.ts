export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  devServer: {
    port: 3501,
    host: 'app.local',
    https: {
      key: '../../.cert/localhost-key.pem',
      cert: '../../.cert/localhost.pem',
    },
  },
  site: {
    url: 'https://nextorders.ru',
    name: 'NextOrders',
  },
  css: ['~/assets/css/styles.css'],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'ru',
    experimental: {
      autoImportTranslationFunctions: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'en-US': 'en',
      'ru-RU': 'ru',
    },
  },
  ui: {
    colorMode: true,
    fonts: true,
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Lora',
        provider: 'google',
      },
      {
        name: 'Noto Sans',
        provider: 'google',
      },
    ],
  },
  colorMode: {
    storageKey: 'nextorders-color-mode',
  },
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  runtimeConfig: {
    oauth: {
      twitch: {
        clientId: '',
        clientSecret: '',
      },
      yandex: {
        clientId: '',
        clientSecret: '',
      },
      vk: {
        clientId: '',
        clientSecret: '',
      },
      github: {
        clientId: '',
        clientSecret: '',
      },
    },
    yookassa: {
      shopId: '',
      apiKey: '',
    },
    telegram: {
      botToken: '',
      supportId: '',
    },
  },
  modules: [
    'nuxt-auth-utils',
    '@nuxtjs/seo',
    '@nuxt/ui',
    'nuxt-zod-i18n', // must be before i18n
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxt/scripts',
  ],
  routeRules: {
    '/sign-in': { robots: false },
    '/cabinet/**': { robots: false },
    '/_nuxt/**': { robots: false },
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/api/**': { cors: true },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      '0 * * * *': ['space:tariffDebit'],
      '*/10 * * * * *': ['payment:status'],
    },
  },
  experimental: {
    typedPages: true,
  },
  compatibilityDate: '2024-08-18',
})
