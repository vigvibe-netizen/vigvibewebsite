# VigVibe.com

Astro + Netlify + Decap CMS. Static build, no server runtime, no framework runtime
shipped to the browser.

Design source: the turn-4 parallax set from the VigVibe mockup canvas (4a home, 4b work
index, 4c "I need…" flow, 4d mobile), on the FlowX color and type system.

## Run it

```bash
cd site
npm install     # also renames the dynamic-route placeholders (see below)
npm run dev     # http://localhost:4321
npm run build   # -> dist/
```

## Deploy

Push to GitHub, then in Netlify: **Add new site → Import an existing project**.
Build settings come from `netlify.toml` (`npm run build`, publish `dist`).

For the CMS at `/admin`, enable in the Netlify dashboard:

1. **Identity** → Enable Identity.
2. **Identity → Services → Git Gateway** → Enable.
3. **Identity → Registration** → Invite only, then invite yourself.

Then visit `https://your-site/admin` and log in. Edits commit to `main`; editorial
workflow means drafts land as PRs, so nothing publishes until you approve it.

## One quirk you need to know

Astro's dynamic routes need `[bracket]` filenames. The tooling this repo was generated
with cannot write brackets, so those three files ship as placeholders:

```
src/pages/work/_dyn.rest-slug.astro      ->  src/pages/work/[...slug].astro
src/pages/services/_dyn.slug.astro       ->  src/pages/services/[slug].astro
src/pages/blog/_dyn.rest-slug.astro      ->  src/pages/blog/[...slug].astro
```

`npm install` runs `scripts/setup-routes.mjs` and renames them. `npm run dev` and
`npm run build` run it too, so it is handled. After the first install you can delete the
script and the `routes` step if you prefer a clean tree — the bracket filenames are the
real ones and they will be committed.

## Structure

```
src/
  content.config.ts        content model — five collections, Zod-validated
  content/
    projects/              work entries -> /work/{category}/{slug}
    posts/                 blog -> /blog/{slug}  (field-note | playbook | answer)
    answers/               the /answers hub, one file per question
    downloads/             Claude Skills, GPTs, Gems
    services/             landing pages -> /services/{slug} (+ root rewrites)
  components/
    PhotoBand.astro        every B&W band; parallax and scrim options
    PageHeader.astro       band + h1 + intro, used by every interior page
    CTABand.astro          the closing "send it over" band
    NeedForm.astro         "I need…" three-step flow
    Newsletter.astro       twice-monthly capture
    ProjectCard.astro / SEO.astro / SiteHeader.astro / SiteFooter.astro
  layouts/Base.astro       head, fonts, header/footer, parallax script
  pages/                   11 routes + /book + 404
public/
  admin/                   Decap CMS (index.html + config.yml)
  images/IMAGES.md         every image slot, named and sized
  robots.txt, llms.txt
```

## Pages

| URL | Source |
|---|---|
| / | `pages/index.astro` |
| /work | `pages/work/index.astro` — client-side category filter |
| /work/{category}/{slug} | dynamic, from `content/projects` |
| /services | `pages/services/index.astro` |
| /services/{slug} | dynamic, from `content/services` |
| /presentation-designer etc. | root rewrites in `netlify.toml` → /services/{slug} |
| /about | Person schema |
| /contact | the "I need…" flow |
| /downloads | platform tabs, featured card |
| /blog | featured latest + grid |
| /blog/{slug} | Article + FAQPage or HowTo schema by post type |
| /answers | FAQPage schema, one page, every question |
| /book | scheduler embed slot |
| /404 | |

## What is deliberately not wired

- **Forms are `mailto:`.** The "I need…" form and the newsletter both open the user's mail
  client to `hello@vigvibe.com`. To move to Netlify Forms: add `netlify` and
  `data-netlify="true"` to the `<form>` in `NeedForm.astro`, drop the submit handler, and
  add a success page. To move the newsletter to an ESP, swap the `action`.
- **Images are placeholders.** See `public/images/IMAGES.md`. Nothing breaks without them.
- **Gated downloads.** Every download links straight to its file. The email gate from the
  mockups is not built; it needs a form provider decision first.
- **Analytics.** Nothing installed. Plausible or Fathom both drop into `Base.astro`.
- **Fonts** load from Google Fonts. Self-host the Mulish/Montserrat woff2 files from the
  FlowX design system before launch and swap the `<link>` in `Base.astro`.
- **Redirects** from the old site: `netlify.toml` has one placeholder for `/portfolio/*`.
  Pull the real URL list from Search Console and map them one to one.

## Editing content

Two ways, both writing the same markdown files:

- **`/admin`** — Decap, wired and ready. Every field in the content model has an editor,
  including image uploads to `public/images`.
- **Netlify Create (Stackbit)** — `stackbit.config.ts` is included for side-by-side visual
  editing. It needs `npm i -D @stackbit/types @stackbit/cms-git @stackbit/cli` and a
  Netlify account with Create enabled. Optional; Decap works without it.

Adding a project, post, download, or answer never means adding a page type.
