# Yunshu Chen — Personal Site

Static site. No build step, no dependencies — just open `index.html`.

Built on the [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)
template by codewithsadee (MIT). The original licence is kept in `LICENSE`.

---

## 🔴 Before you publish

**1. Add your CV.** Drop the PDF at `assets/Yunshu_Chen_CV.pdf` — two links
point there (the About page button and the Contact card). Without it those
links 404.

**2. Make `Genius_Labbook` public.** The Genius Labbook project card is
described as open source and links to
`github.com/CHEN-Yunshu/Genius_Labbook`. That link 404s while the repo is
private. Flip it public before sharing the site.

GitHub (`CHEN-Yunshu`), Google Scholar and LinkedIn links are all set.
No placeholders remain except the CV file above.

---

## Publishing to GitHub Pages

**Option A — site at `https://chen-yunshu.github.io`** (recommended, cleanest URL)

```bash
# repo MUST be named exactly CHEN-Yunshu.github.io
git init
git add .
git commit -m "Personal site"
git branch -M main
git remote add origin https://github.com/CHEN-Yunshu/CHEN-Yunshu.github.io.git
git push -u origin main
```
Then: repo → **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Live in ~1 minute.

**Option B — site at `https://chen-yunshu.github.io/portfolio`**

Same steps, any repo name. Everything uses relative paths (`./assets/...`), so it works either way.

`.nojekyll` is already included so GitHub serves the files as-is.

---

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly via `file://` also works, but the icon font
is loaded from a CDN so you need to be online either way.

---

## Structure

```
index.html                  every page lives here (tabs, not separate files)
assets/css/style.css        template styles + a #CUSTOM ADDITIONS block at the end
assets/js/script.js         nav, filters, language switch, email assembly
assets/images/avatar.svg    monogram placeholder — swap for a photo if you want
assets/images/projects/*    12 generated project thumbnails
assets/Yunshu_Chen_CV.pdf   ← you need to add this
```

## How to edit content

**Text** — everything bilingual is a single element carrying both languages:

```html
<p data-i18n data-en="Hello" data-zh="你好">Hello</p>
```

Edit `data-en` and `data-zh`. The visible text between the tags is what
search engines and non-JS visitors see, so keep it matching `data-en`.

**Adding a project** — copy any `<li class="project-item">` block in the
Projects section. `data-category` must be one of `coronary ivus`,
`microscopy`, or `clinical &amp; tools` for the filter to catch it.

**Project thumbnails** — 8 of the 12 cards now use real figures (`.jpg`,
800×600, cropped from `2026-08-14_resume_portfolio/candidates`):

| Card | Source figure |
|---|---|
| GeoCat | `01_geocat_ivus/c_results.png` (GT / Ours / U-Net columns) |
| IVUS-FM | `02_ivus_fm/c_manufacturer_comparison.png` (frame grid) |
| IVUS Agent | `03_ivus_agent/e_reader_ui.png` (reader UI) |
| SAM2 tracking | `05_cell_tracking/d_overlay_sam2_t022.png` |
| Cell resolution | `04_cell_resolution/d_qualitative_overlay.png` |
| Synthesis | `06_synthesis_cell/c_morphodynamic_atlas_0.png` |
| Fish / CAT | `07_fish_segmentation/b_cat_trimap_band.png` |
| Dataset curation | `08_cell_collection_organoid/d_organoid_curated_hero.jpg` |

Four still use generated SVG line art because no candidate figure fitted:
**LeadCell**, **PredictX**, **Genius Labbook**, **Stroke prediction**.
LeadCell is the one worth replacing — a cell instance-segmentation overlay
would sit naturally beside the others. Drop any square-ish image in as
`assets/images/projects/leadorg.jpg` and change that card's `<img src>`
from `.svg` to `.jpg`.

**Repo links** — only Genius Labbook links to a repo; the rest are private and
deliberately unlinked. To add one later, change that card's `<a href="#">` to
the repo URL, add `target="_blank" rel="noopener" class="has-repo"`, and copy
the `<p class="project-repo">` badge from the Genius Labbook card.

**Colour** — the accent is `--orange-yellow-crayola` and the
`--text-gradient-yellow` / `--bg-gradient-yellow-*` variables at the top of
`style.css`. Change those and the whole site follows.

---

## Notes

- The email address is assembled in JavaScript at runtime, so it is not
  present in the HTML source for crawlers to scrape. It still renders as a
  normal clickable `mailto:` link for humans.
- Language choice persists in `localStorage`. English is the default.
- Phone number is deliberately not on the site.

---

## ⚠️ One thing to keep true

The Genius Labbook card says "Open source". Make
`github.com/CHEN-Yunshu/Genius_Labbook` public and that is accurate.

The Cell Resolution benchmark card deliberately does **not** claim open
source — the repo stays private until the paper is out. Once it is published,
you can flip the repo public and change that card's category line back to
`Microscopy · benchmark · open source` / `显微影像 · 基准 · 开源`, and add a
repo badge the same way.
