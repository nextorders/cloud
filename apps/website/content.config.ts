import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '1.docs/**/*',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
      }),
    }),
  },
})
