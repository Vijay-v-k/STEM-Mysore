# STEM Mysore Dashboard

A frontend dashboard for the STEM Mysore program, with three tabs:

1. **Mysore Map** — clickable taluk/block map of Mysore district; clicking a block shows its education snapshot (schools, students, teachers, STEM labs, girls' enrollment, dropout rate, literacy rate, KPI score).
2. **Team & KPIs** — team member profiles with KPI targets vs. achievements.
3. **School Programs** — school improvement programs with utilization, reach, fund spent and impact, plus summary charts.

## Data

[`js/data.js`](js/data.js) is a **mix of real and placeholder data** — every field has an inline `// REAL` or `// PLACEHOLDER` comment so it's clear what to trust today:

- `BLOCKS` (map tab) — schools & students per taluk are real (Govt.-schools sheet, 31 Jul 2025); teachers is real but unverified (source table headers were merged/misaligned); STEM labs, girls' enrollment, dropout rate, literacy rate and KPI score are placeholder.
- `TEAM_MEMBERS` (team tab) — names, roles and (for Madhu R, Shivaraju, Narasimharaju) KPI *targets* are real, from the team's AY 2026-27 KRA doc. All "achieved" values are placeholder — the sheet has annual targets but no monthly-tracked actuals. Hanumanthraju has no KRA table in the sheet, so his KPIs are fully placeholder.
- `PROGRAMS` (programs tab) — program name & fund allocated are real (AY 2026-27 budget lines); utilization, fund spent, reach and impact are placeholder.

Replace placeholder values in that file as real numbers become available — no other file needs to change since the map, team, and program views are all rendered from these three arrays.

The map shapes (`BLOCK_SHAPES` in [`js/app.js`](js/app.js)) are hand-traced polygons approximating the real taluk boundaries/adjacency from the district reference map — illustrative, not GIS-precise.

## Running locally

This is a static site (no build step). Open `index.html` directly in a browser, or serve it locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Tech

Vanilla HTML/CSS/JS + [Chart.js](https://www.chartjs.org/) (via CDN). No framework, no build tooling.

## Deploying updates (GitHub Pages caching)

`index.html` loads `css/style.css`, `js/data.js` and `js/app.js` with a `?v=N` query string. GitHub Pages' CDN (and browsers) cache those files hard by URL, so an edit to one of them can silently not show up for visitors on the live site. **Whenever you edit `style.css`, `data.js` or `app.js`, bump the `?v=` number on its `<script>`/`<link>` tag in `index.html`** so the live site picks up the change immediately.
