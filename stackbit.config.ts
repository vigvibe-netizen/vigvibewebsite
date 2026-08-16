import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';

/* Netlify Create (Stackbit) — visual side-by-side editing.
   Optional: Decap at /admin is wired and working without this file.
   To use it: npm i -D @stackbit/types @stackbit/cms-git @stackbit/cli
              npx stackbit dev   (requires a Netlify account with Create enabled) */

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'custom',
  nodeVersion: '20',
  devCommand: 'npm run dev -- --port {PORT}',
  experimental: { ssg: { logPatterns: { up: ['is ready', 'astro'] } } },
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['src/content'],
      models: [
        {
          name: 'project',
          type: 'page',
          urlPath: '/work/{category}/{slug}',
          filePath: 'src/content/projects/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'client', type: 'string', required: true },
            { name: 'year', type: 'number', required: true },
            { name: 'category', type: 'string', required: true },
            { name: 'categoryLabel', type: 'string', required: true },
            { name: 'summary', type: 'text', required: true },
            { name: 'cover', type: 'image' },
            { name: 'featured', type: 'boolean' },
            { name: 'order', type: 'number' },
            { name: 'seoDescription', type: 'text', required: true }
          ]
        },
        {
          name: 'post',
          type: 'page',
          urlPath: '/blog/{slug}',
          filePath: 'src/content/posts/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'type', type: 'enum', options: ['field-note', 'playbook', 'answer'], required: true },
            { name: 'date', type: 'date', required: true },
            { name: 'readingTime', type: 'string' },
            { name: 'excerpt', type: 'text', required: true },
            { name: 'shortAnswer', type: 'text' },
            { name: 'cover', type: 'image' },
            { name: 'seoDescription', type: 'text', required: true }
          ]
        },
        {
          name: 'service',
          type: 'page',
          urlPath: '/services/{slug}',
          filePath: 'src/content/services/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'h1', type: 'string', required: true },
            { name: 'intro', type: 'text', required: true },
            { name: 'header', type: 'image' },
            { name: 'seoTitle', type: 'string', required: true },
            { name: 'seoDescription', type: 'text', required: true }
          ]
        },
        {
          name: 'answer',
          type: 'data',
          filePath: 'src/content/answers/{slug}.md',
          fields: [
            { name: 'question', type: 'string', required: true },
            { name: 'category', type: 'enum', options: ['Hiring', 'Workflow', 'AI', 'Working together'], required: true },
            { name: 'answer', type: 'text', required: true },
            { name: 'linkHref', type: 'string' },
            { name: 'order', type: 'number' }
          ]
        },
        {
          name: 'download',
          type: 'data',
          filePath: 'src/content/downloads/{slug}.md',
          fields: [
            { name: 'title', type: 'string', required: true },
            { name: 'platform', type: 'enum', options: ['Claude', 'ChatGPT', 'Gemini'], required: true },
            { name: 'type', type: 'string', required: true },
            { name: 'description', type: 'text', required: true },
            { name: 'file', type: 'string' },
            { name: 'externalUrl', type: 'string' }
          ]
        }
      ],
      assetsConfig: {
        referenceType: 'static',
        staticDir: 'public',
        uploadDir: 'images',
        publicPath: '/'
      }
    })
  ]
});
