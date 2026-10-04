# Malta Expat Guide

Source for [maltaexpatguide.com](https://maltaexpatguide.com), a guide for foreign nationals moving to or living in Malta. It is a plain static site served by GitHub Pages from the `main` branch.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `getting-started.html`, `safety.html` | Single-page sections |
| `<section>/index.html` | Section overview (e.g. `expat-info/index.html`) |
| `<section>/<guide>.html` | Individual guides |
| `assets/site.css` | Site theme: colours, fonts, layout |
| `assets/site.js` | Header, "All sections" menu, footer and guide sidebar/pager |
| `assets/content.css` | Tailwind utility styles used inside guide articles (generated) |
| `404.html`, `sitemap.xml`, `robots.txt` | Not-found page and search-engine files |

## Adding or renaming a guide

1. Copy an existing guide in the same folder and edit its `<title>`, description, `og:` tags, hero and article.
2. Add it to the `SECTIONS` list at the top of `assets/site.js` so it appears in the menu, sidebar and pager.
3. Add a card for it in that section's `index.html`.
4. Add its URL to `sitemap.xml`.

When uploading through the GitHub website, check that each file's path keeps its folder (e.g. `expat-info/new-guide.html`, `assets/site.css`).

## Styles inside articles

Articles use [Tailwind](https://tailwindcss.com/docs) classes such as `text-slate-600` or `bg-blue-50`. `assets/content.css` contains only the classes the pages use. It is rebuilt automatically by the "Build content CSS" GitHub Action on every push, so a newly used class starts working a minute or so after you commit. To build it locally:

```sh
npx tailwindcss@3.4 -c tailwind.config.js -i assets/content.src.css -o assets/content.css --minify
```

Don't edit `assets/content.css` by hand; edit `assets/site.css` for theme changes.
