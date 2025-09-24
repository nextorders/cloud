export default defineNitroConfig({
  compatibilityDate: '2025-09-01',
  srcDir: 'server',
  routeRules: {
    '/**': {
      cors: true,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'access-control-allow-headers': 'Content-Type, Authorization',
      },
    },
  },
})
