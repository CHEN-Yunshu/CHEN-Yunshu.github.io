# Yunshu Chen — personal website

A bilingual static website. No build step or dependencies.

## Structure

- Home: personal introduction, a real IVUS image and two selected research programmes.
- Work: five numbered chapters. IVUS and LeadCell lead the page; zebrafish analysis, clinical data engineering and open-source tools follow. Monash research retains its affiliation; PredicTx Health is described briefly by role, broad technical area and stack.
- Papers: accepted work, research manuscripts and published work, with distinct status labels and links to related cases.
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
- `cell-preannotation.mp4` and its poster show a recent VERO pre-annotation workflow, with the source header removed. The caption labels this as an earlier preview, separate from the current CellTopo evaluation.
- The organoid example is a candidate event: masks are manually annotated, but the automatic track associations and event interpretation await review.
- Videos load on demand, start only when requested, and pause when the reader changes pages. Older figures are explicitly labelled where the current project has advanced beyond the depicted experiment.

Local edits do not publish the website. Review changes before committing and pushing to the configured GitHub Pages branch.

## Content status — 22 November 2026

- IVUS: full-pullback review, contour editing, geometry measurements, 3D display and annotation exports. The offline Apple Silicon pipeline passed a two-pullback, 5,629-frame engineering test; clinical evaluation remains ongoing. Local Qwen report generation is separate from the offline imaging portability test. Mac/server numerical agreement is not clinical accuracy.
- LeadCell remains software in laboratory use. The newer cell/organoid tracking package is a tested release candidate; division and fusion analysis is ongoing. CellTopo and MitoSync are described as research manuscripts without an unverified submission or acceptance claim.
- Resolution now describes input-scale calibration: three frozen pipelines, eight scales and 17 tasks from 15 source families. This is retrospective benchmark research, not deployment validation.
- FishScope is accepted at IEEE BIBM 2026, not yet labelled as published in proceedings. The current manuscript uses 121 images from 61 fish. Its Python/PyTorch/Gradio research demo is linked at `https://github.com/CHEN-Yunshu/fishscope`; the non-commercial research license is not described as an open-source license.
- GeoCat remains under review after its AAAI 2027 rebuttal. ISCSLP 2022 remains the published entry. No blanket count of manuscripts under review is used.

The IVUS recording shows outputs from the source tool. Physical lengths and volumes require verified calibration. The organoid example remains a candidate event; the zebrafish figure is labelled as an earlier example rather than current performance evidence. The older synthesis figure is omitted from the MitoSync section. CLE remains annotation in progress.

## Public profile and résumé scope

The **PredicTx Health** experience summarises the Machine Learning Engineer role, its broad focus on medical imaging and clinical data engineering, and the technology stack. Downloadable industry and research CVs are available in `assets/`.
