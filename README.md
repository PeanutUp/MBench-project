# MBench Project Page Template

This is a lightweight static project-page template for **MBench: A Comprehensive Benchmark on Memory Capability for Video World Models**.

## Files

```text
.
├── index.html          # page content
├── style.css           # visual theme
├── script.js           # tabs, leaderboard, copy button
├── assets/             # replace these placeholders with paper figures/videos
└── .nojekyll           # avoids GitHub Pages Jekyll processing
```

## What you should replace first

1. `YOUR_ARXIV_OR_PAPER_LINK`
2. `YOUR_DATASET_LINK`
3. `YOUR_HF_SPACE_OR_LEADERBOARD`
4. author list and affiliations
5. `assets/teaser.mp4`
6. `assets/taxonomy.svg` or replace with your final Figure 1
7. demo numbers in `script.js`
8. BibTeX in `index.html`

## Recommended assets

- `assets/teaser.mp4`: compressed demo video, ideally under 20 MB.
- `assets/figure1.png`: taxonomy + radar overview from the paper.
- `assets/failure_entity.mp4`, `failure_environment.mp4`, `failure_causal.mp4`: short failure cases.
- `assets/leaderboard.json`: optional, if you later want to load data dynamically.

## Local preview

Open `index.html` directly in your browser, or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.



## Color theme

The main theme variables are in `style.css`:

```css
--violet: #6d4aa4;
--violet-deep: #3d2568;
--teal: #5fc6ba;
--rose: #e891a8;
--amber: #f2c67d;
```

They are designed to match the purple section headings and pastel taxonomy colors in the current LaTeX draft.
