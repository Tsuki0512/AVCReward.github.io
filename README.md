# AVC-Reward Project Page

A static, English-language project page for the AVC-Reward paper. It uses native HTML, CSS, and JavaScript and can be published with GitHub Pages.

## Preview locally

From the repository root, run:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Assets

The paper figures and result tables are rendered as PNG images in `assets/figures/` and loaded directly by the page. The case-study videos used by the page are kept in their original `ref/` subfolders and loaded on demand by the browser. `SITE_COPY.md` contains the page text in editable form.
