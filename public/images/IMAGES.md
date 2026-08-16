# Image slots

Every path below is referenced by the site. Drop real files in `public/images/` using
these exact names and they appear — no code change. Anything missing falls back to a flat
panel or a slot label, so the site builds and deploys with none of them present.

Bands are rendered black and white at build-independent CSS (`grayscale(1)`), so supply
color originals. Export at 2x the listed size, JPEG quality 72–80, then run them through
Squoosh or `sharp`.

## Photo bands (B&W parallax)
| File | Where | Suggested size | Notes |
|---|---|---|---|
| hero-studio.jpg | Home hero | 2000 × 1400 | Real work in progress. Subject weighted right of center — the headline sits left. |
| statement-band.jpg | Home "workflow may be leaking time" | 2400 × 1200 | Wide, calm, low detail in the left third. Parallax band. |
| cta-band.jpg | Every page footer CTA | 2400 × 1000 | Reused site-wide. Keep it quiet. |
| work-header.jpg | /work | 2000 × 900 | |
| services-header.jpg | /services | 2000 × 900 | |
| about-header.jpg | /about | 2000 × 900 | |
| downloads-header.jpg | /downloads | 2000 × 900 | |
| blog-header.jpg | /blog | 2000 × 900 | |

## Portrait
| File | Where | Suggested size |
|---|---|---|
| scott-vigneault-portrait.png | /about sidebar, blog author block | 1200 × 1500 |

## Project covers and galleries
Referenced from the project entries in `src/content/projects/`. Covers are 3:2, roughly
1600 × 1067. Gallery images are full width, 1600px wide minimum.

- top5trends-cover.png, top5trends-spread-1.png, trends-infographic-1.png, top5trends-banner.png
- convergence-cover.png, convergence-slide-1.png, convergence-slide-2.png
- brand-identity-cover.png
- logimat-cover.jpeg
- spotlight-cover.jpg, spotlight-banner.jpg, spotlight-editorial.jpg
- sap-video-cover.png

## Post covers
- post-30-day-playbook.png
- post-intake-form.png
- post-hire-decision.png

## Social
- og-default.jpg — 1200 × 630, used when a page sets no image.

Your existing files in the attached `images/` folder map to most of these. Rename on the
way in (all lowercase, hyphenated, ASCII) or update the paths in the content entries.
