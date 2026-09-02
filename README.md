# STEM Mysore Dashboard

A frontend dashboard for the STEM Mysore program, with three tabs:

1. **Mysore Map** — clickable taluk/block map of Mysore district; clicking a block shows its education snapshot (schools, students, teachers, STEM labs, girls' enrollment, dropout rate, literacy rate, KPI score).
2. **Team & KPIs** — team member profiles with KPI targets vs. achievements.
3. **School Programs** — school improvement programs with utilization, reach, fund spent and impact, plus summary charts.

## Data

All data currently in the app is **placeholder / dummy data** for demonstration, defined in [`js/data.js`](js/data.js):

- `BLOCKS` — one entry per Mysore district taluk (map tab)
- `TEAM_MEMBERS` — one entry per team member, each with a list of KPIs (team tab)
- `PROGRAMS` — one entry per school improvement program (programs tab)

Replace the values in that file with real data — no other file needs to change since the map, team, and program views are all rendered from these three arrays.

The map layout (`x`/`y` per block in `BLOCKS`) is an illustrative approximation of relative taluk positions, not a precise GIS boundary map.

## Running locally

This is a static site (no build step). Open `index.html` directly in a browser, or serve it locally:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Tech

Vanilla HTML/CSS/JS + [Chart.js](https://www.chartjs.org/) (via CDN). No framework, no build tooling.
