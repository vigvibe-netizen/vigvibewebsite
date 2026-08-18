import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = [
  'campaigns', 'design-layout', 'brand-identity', 'logos', 'infographics',
  'presentations', 'websites', 'motion', 'events', 'ai-illustration'
] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number().optional(),
    category: z.enum(categories),
    categoryLabel: z.string(),
    summary: z.string(),
    cover: z.string().default(''),
    gallery: z.array(z.object({ src: z.string(), caption: z.string().default('') })).default([]),
    role: z.string().default(''),
    deliverables: z.array(z.string()).default([]),
    results: z.array(z.object({ figure: z.string(), label: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    seoDescription: z.string()
  })
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['field-note', 'playbook', 'answer']),
    date: z.coerce.date(),
    readingTime: z.string(),
    excerpt: z.string(),
    shortAnswer: z.string().default(''),
    cover: z.string().default(''),
    tags: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    steps: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    draft: z.boolean().default(false),
    seoDescription: z.string()
  })
});

const answers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/answers' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['Hiring', 'Workflow', 'AI', 'Working together']),
    answer: z.string(),
    linkLabel: z.string().default('Read the full answer →'),
    linkHref: z.string().default(''),
    priority: z.boolean().default(false),
    order: z.number().default(99)
  })
});

const downloads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/downloads' }),
  schema: z.object({
    title: z.string(),
    platform: z.enum(['Claude', 'ChatGPT', 'Gemini']),
    type: z.string(),
    fileLabel: z.string().default('.zip'),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    contents: z.array(z.string()).default([]),
    file: z.string().default(''),
    externalUrl: z.string().default(''),
    downloadCount: z.number().default(0),
    featured: z.boolean().default(false),
    comingSoon: z.boolean().default(false),
    order: z.number().default(99)
  })
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string(),
    eyebrow: z.string().default(''),
    h1: z.string(),
    intro: z.string(),
    priority: z.boolean().default(false),
    header: z.string().default(''),
    whatYouGet: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    process: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    priceNote: z.string().default(''),
    order: z.number().default(99),
    seoTitle: z.string(),
    seoDescription: z.string()
  })
});

export const collections = { projects, posts, answers, downloads, services };
