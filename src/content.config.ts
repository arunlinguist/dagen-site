import { defineCollection, z } from 'astro:content';

// Minimal schemas just to register the collections and avoid deprecation warnings.
// You can tighten these later if you want validation on frontmatter / data.
const services = defineCollection({
  type: 'content',
  schema: z.object({}), // no required frontmatter fields for now
});

const data = defineCollection({
  type: 'data',
  schema: z.any(), // accept any shape of data
});

export const collections = {
  services,
  data,
};