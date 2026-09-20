# Yunshu Chen — personal website

A bilingual static website. No build step or dependencies.

## Structure

- Home: personal introduction, a real IVUS image and two selected research programmes.
- Work: five numbered chapters. IVUS and LeadCell lead the page; zebrafish analysis, clinical data engineering and open-source tools follow. Monash research retains its affiliation; clinical data work is presented as a project.
- Papers: manuscripts under review and published work, with links to related cases.
- Background: software-engineering background, education, earlier experience, teaching and service.

## Files

- `index.html`: content and translations (`data-en` / `data-zh`).
- `assets/css/site.css`: warm-white and forest-green visual system, responsive layouts and reduced-motion support.
- `assets/js/site.js`: hash routes, language switching, chapter navigation, menus, figure previews, reading progress and contact utilities.
- `assets/images/work/`: original IVUS, LeadCell, tracking, resolution and zebrafish figures. The hero uses a CSS crop of the original IVUS gallery; enlarged figures retain their original images.
- `assets/Yunshu_Chen_CV.pdf` / `assets/Yunshu_Chen_Resume.pdf`: downloadable CVs.

Serve this directory with a static HTTP server for preview, for example `python3 -m http.server 8816 --bind 127.0.0.1`. Work sections have direct links: `#work/ivus`, `#work/cells`, `#work/fish`, `#work/other` and `#work/tools`. Legacy `#projects` and `#experience` links still resolve.

English text is available in the HTML; all four pages are readable without JavaScript. Keep translated attributes and visible fallback text in sync when editing. Figures use a native dialog for enlargement. Technical detail sections use native disclosure controls. Menus and previews support keyboard navigation and focus restoration. Clipboard copying requires a supported secure browser context; the email link remains available.

No build step is needed. Inter and IBM Plex Mono are optional Google Fonts, with local system-font fallbacks.

## Scientific media

- The selected IVUS card uses `ivus-cover.jpg`, an oblique view of the original 3D reconstruction paired with its corresponding ultrasound cross-section. The home hero retains the original ultrasound visual.
- `assets/media/ivus-linked-view.mp4` records the original tool's linked reconstruction and cross-section display. `ivus-spatial.jpg` is its static poster. Exported visuals omit case identifiers and clinical report text; the source report is not part of the site.
- `cell-preannotation.mp4` and its poster show a recent VERO pre-annotation workflow, with the source header removed. The caption explicitly separates this preview from the reported SAM2 benchmark.
- The organoid example is a candidate event: masks are manually annotated, but the automatic track associations and event interpretation await review.
- Videos load on demand, start only when requested, and pause when the reader changes pages. Existing corpus sizes, cohort counts and evaluation results are unchanged by this media update.

Local edits do not publish the website. Review changes before committing and pushing to the configured GitHub Pages branch.

## Content status — 16 September 2026

35 IVUS cases prepared; cardiologist review ongoing. LeadCell is packaged software in use, with an internal laboratory API. Qwen is local; DeepSeek and Gemini are accessed through APIs. Three first-author manuscripts under review: IVUS, tracking and zebrafish segmentation. Tracking uses a project description pending the exact manuscript title. The clinical data project describes confirmed data engineering responsibilities.

The IVUS recording includes lumen, EEM and plaque cross-sectional areas and plaque burden read directly from the source tool for every captured frame. Organoid and image-synthesis research have separate cards; CLE is labelled as annotation in progress. The synthesis image is a user-supplied early example, not a validated result.

## Public profile and résumé scope

The downloadable Research CV and Industry résumé may include PredictX experience. Keep the employer name and role out of the website copy and GitHub profile introduction; retain the clinical data project without an employer attribution on the website.
