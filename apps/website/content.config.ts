import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: '1.docs/**/*',
        schema: z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
        }),
      }),
    ),
  },
})
