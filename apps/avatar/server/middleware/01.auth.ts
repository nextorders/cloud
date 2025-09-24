export default defineEventHandler(async (event) => {
  if (event.method === 'OPTIONS') {
    // Allow preflight
  }
})
