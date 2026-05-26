# MBench Project Page

This repository hosts a lightweight static project page for **MBench: A Comprehensive Benchmark on Memory Capability for Video World Models**.


## Files

```text
.
├── index.html          # page content
├── style.css           # VBench-like academic layout
├── script.js           # leaderboard tabs and BibTeX copy button
├── assets/             # MBench figures extracted from the paper plus placeholders
└── .nojekyll           # avoids GitHub Pages Jekyll processing
```

## Update Before Release

1. Replace demo leaderboard values in `script.js` with final results.
2. Update author affiliations and BibTeX in `index.html`.
3. Replace placeholder video panels in the qualitative section with real `.mp4` / `.webm` clips when available.
4. Update repository, paper, dataset, or leaderboard links once public.

## Paper-Derived Assets

- `assets/paper-overview.png`: Figure 1 overview / taxonomy / radar charts.
- `assets/paper-failure-cases.png`: Figure 2 memory failure cases.
- `assets/case-environment.png`: cropped environment consistency row from Figure 2.
- `assets/case-entity.png`: cropped entity consistency row from Figure 2.
- `assets/case-causal.png`: cropped causal consistency row from Figure 2.
- `assets/prompt-suite.png`: Figure 3 prompt and action distribution statistics.

## Local Preview

Open `index.html` directly in a browser, or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
