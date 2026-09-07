// ============================================================
// Science Activities tab — live data from the "STEM Observation –
// CRP Mysore" Google Form response sheet (read-only, client-side).
//
// Data source: Google's public "gviz" CSV endpoint for the sheet.
// This ONLY returns data once the sheet's sharing is set to
// "Anyone with the link: Viewer" — until then every fetch fails and
// the tab shows an explanatory notice instead of silently breaking.
// ============================================================

const SCIENCE_SHEET_ID = "1PatX5Yh4CdmXQucsvANqKN5116xqP88s_qi9AWEE55U";
const SCIENCE_GID = "1260072416";
const SCIENCE_CSV_URL =
  `https://docs.google.com/spreadsheets/d/${SCIENCE_SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SCIENCE_GID}`;
const SCIENCE_REFRESH_MS = 60000; // poll every 60s for new form responses

// Column layout of the response sheet (0-indexed). The form asks
// "SELECT THE CLUSTERS" once per block via conditional branching, so
// the sheet has 8 near-duplicate columns (2-9) and only one is
// non-empty per row — whichever matches the row's chosen block.
const COL = {
  timestamp: 0,
  block: 1,
  clusterFirst: 2,
  clusterLast: 9,
  udise: 10,
  school: 11,
  grade: 12,
  activityCount: 13,
  activityNames: 14,
  students: 15,
  suggestions: 16,
  photo: 17,
  month: 18,
};

// Fixed categorical order (assigned to blocks in sorted order, never
// re-cycled per render) so a block keeps its color across filters.
const SCIENCE_PALETTE = [
  "#1d5b3f", "#2f8a5f", "#5cab7f", "#e08a2b", "#e0a92b",
  "#d1495b", "#8a6fd6", "#2b6cb0", "#946200", "#4a5568",
];

let scienceInitialized = false;
let scienceRecords = [];
let scienceTimer = null;
let scienceCharts = { block: null, students: null, trend: null, cluster: null };

function initScienceTab() {
  if (scienceInitialized) return;
  scienceInitialized = true;

  document.getElementById("blockFilter").addEventListener("change", renderScienceView);
  document.getElementById("monthFilter").addEventListener("change", renderScienceView);
  document.getElementById("scienceRefreshBtn").addEventListener("click", () => loadScienceData(true));
  document.getElementById("scienceResetBtn").addEventListener("click", () => {
    document.getElementById("blockFilter").value = "";
    document.getElementById("monthFilter").value = "";
    renderScienceView();
  });

  loadScienceData(true);
  scienceTimer = setInterval(() => loadScienceData(false), SCIENCE_REFRESH_MS);
}

async function loadScienceData(showSpinner) {
  const notice = document.getElementById("scienceNotice");
  const refreshBtn = document.getElementById("scienceRefreshBtn");
  if (showSpinner) refreshBtn.textContent = "↻ Refreshing…";

  try {
    const res = await fetch(SCIENCE_CSV_URL + "&_ts=" + Date.now(), { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const csvText = await res.text();
    if (/^\s*<!doctype html>/i.test(csvText) || /accounts\.google\.com/i.test(csvText)) {
      throw new Error("SHEET_NOT_PUBLIC");
    }

    const parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true });
    scienceRecords = parsed.data.slice(1).map(parseScienceRow).filter(Boolean);

    notice.hidden = true;
    document.getElementById("scienceLiveBadge").hidden = false;
    document.getElementById("scienceSyncedAt").textContent =
      "Last synced: " + new Date().toLocaleTimeString();
    populateScienceFilters();
    renderScienceView();
  } catch (err) {
    document.getElementById("scienceLiveBadge").hidden = true;
    notice.hidden = false;
    notice.innerHTML =
      `<strong>Live data unavailable.</strong> This sheet is still private, so the ` +
      `published dashboard can't read it. Ask <strong>Madhu R</strong> (sheet owner) to open ` +
      `Share → General access → <strong>"Anyone with the link" → Viewer</strong> on the ` +
      `"STEM OBSERVATION – CRP MYSORE" sheet. No code change is needed — this tab will ` +
      `start showing live data automatically once that's done.`;
  } finally {
    if (showSpinner) refreshBtn.textContent = "↻ Refresh now";
  }
}

function parseScienceRow(cols) {
  if (!cols || cols.length < 15 || !cols[COL.block]) return null;

  let cluster = "";
  for (let i = COL.clusterFirst; i <= COL.clusterLast; i++) {
    if (cols[i] && cols[i].trim()) { cluster = cols[i].trim(); break; }
  }

  const activityCountRaw = parseInt(cols[COL.activityCount], 10);
  const studentsRaw = parseInt(cols[COL.students], 10);
  const date = new Date(cols[COL.timestamp]);

  return {
    timestamp: cols[COL.timestamp] || "",
    date: isNaN(date.getTime()) ? null : date,
    block: cols[COL.block].trim(),
    cluster: cluster || "—",
    udise: (cols[COL.udise] || "").trim(),
    school: (cols[COL.school] || "").trim() || "—",
    grade: (cols[COL.grade] || "").trim(),
    activityCount: isNaN(activityCountRaw) ? 1 : activityCountRaw, // blank field = at least 1 activity happened
    students: isNaN(studentsRaw) ? 0 : studentsRaw,
    month: (cols[COL.month] || "").trim(),
  };
}

function populateScienceFilters() {
  const blockSel = document.getElementById("blockFilter");
  const monthSel = document.getElementById("monthFilter");
  const prevBlock = blockSel.value;
  const prevMonth = monthSel.value;

  const blocks = [...new Set(scienceRecords.map((r) => r.block))].sort();
  const months = [...new Set(scienceRecords.map((r) => r.month).filter(Boolean))].sort();

  blockSel.innerHTML = '<option value="">All Blocks</option>' +
    blocks.map((b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join("");
  monthSel.innerHTML = '<option value="">All Months</option>' +
    months.map((m) => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join("");

  if (blocks.includes(prevBlock)) blockSel.value = prevBlock;
  if (months.includes(prevMonth)) monthSel.value = prevMonth;
}

function scienceBlockColor(block, sortedBlocks) {
  const idx = sortedBlocks.indexOf(block);
  return SCIENCE_PALETTE[idx % SCIENCE_PALETTE.length];
}

function renderScienceView() {
  const selectedBlock = document.getElementById("blockFilter").value;
  const selectedMonth = document.getElementById("monthFilter").value;

  const byMonth = selectedMonth
    ? scienceRecords.filter((r) => r.month === selectedMonth)
    : scienceRecords;
  const scoped = selectedBlock
    ? byMonth.filter((r) => r.block === selectedBlock)
    : byMonth;

  renderScienceKpis(scoped);
  renderScienceBlockCharts(byMonth);
  renderScienceTrendChart(scoped);
  renderScienceClusterChart(scoped, selectedBlock);
  renderScienceTable(scoped);
}

function renderScienceKpis(rows) {
  const totalActivities = rows.reduce((s, r) => s + r.activityCount, 0);
  const totalStudents = rows.reduce((s, r) => s + r.students, 0);
  const schools = new Set(rows.map((r) => r.udise || r.school)).size;
  const blocksReporting = new Set(rows.map((r) => r.block)).size;

  document.getElementById("scienceKpis").innerHTML = `
    <div class="summary-card"><div class="num">${totalActivities.toLocaleString()}</div><div class="lbl">Activities Logged</div></div>
    <div class="summary-card"><div class="num">${totalStudents.toLocaleString()}</div><div class="lbl">Students Reached</div></div>
    <div class="summary-card"><div class="num">${schools.toLocaleString()}</div><div class="lbl">Schools Visited</div></div>
    <div class="summary-card"><div class="num">${blocksReporting}</div><div class="lbl">Blocks Reporting</div></div>
  `;
}

function renderScienceBlockCharts(rows) {
  const blocks = [...new Set(rows.map((r) => r.block))].sort();
  const activityByBlock = blocks.map((b) =>
    rows.filter((r) => r.block === b).reduce((s, r) => s + r.activityCount, 0)
  );
  const studentsByBlock = blocks.map((b) =>
    rows.filter((r) => r.block === b).reduce((s, r) => s + r.students, 0)
  );
  const colors = blocks.map((b) => scienceBlockColor(b, blocks));

  if (scienceCharts.block) scienceCharts.block.destroy();
  scienceCharts.block = new Chart(document.getElementById("scienceBlockChart"), {
    type: "bar",
    data: { labels: blocks, datasets: [{ label: "Activities", data: activityByBlock, backgroundColor: colors, borderRadius: 4 }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { autoSkip: false, maxRotation: 30, minRotation: 0, font: { size: 10.5 } } }, y: { beginAtZero: true } },
    },
  });

  if (scienceCharts.students) scienceCharts.students.destroy();
  scienceCharts.students = new Chart(document.getElementById("scienceStudentsChart"), {
    type: "bar",
    data: { labels: blocks, datasets: [{ label: "Students", data: studentsByBlock, backgroundColor: colors, borderRadius: 4 }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { ticks: { autoSkip: false, maxRotation: 30, minRotation: 0, font: { size: 10.5 } } }, y: { beginAtZero: true } },
    },
  });
}

function renderScienceTrendChart(rows) {
  const byDay = new Map(); // "yyyy-mm-dd" -> { label, total }
  rows
    .filter((r) => r.date)
    .forEach((r) => {
      const key = r.date.getFullYear() + "-" + (r.date.getMonth() + 1) + "-" + r.date.getDate();
      const label = r.date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      if (!byDay.has(key)) byDay.set(key, { label, total: 0, sortKey: r.date.getTime() });
      byDay.get(key).total += r.activityCount;
    });
  const days = [...byDay.values()].sort((a, b) => a.sortKey - b.sortKey);

  if (scienceCharts.trend) scienceCharts.trend.destroy();
  scienceCharts.trend = new Chart(document.getElementById("scienceTrendChart"), {
    type: "line",
    data: {
      labels: days.map((d) => d.label),
      datasets: [{
        label: "Activities reported",
        data: days.map((d) => d.total),
        borderColor: "#1d5b3f",
        backgroundColor: "rgba(47,138,95,0.12)",
        fill: true,
        tension: 0.25,
        pointRadius: 4,
        pointBackgroundColor: "#1d5b3f",
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });
}

function renderScienceClusterChart(rows, selectedBlock) {
  document.getElementById("scienceClusterTitle").textContent = selectedBlock
    ? `Top Clusters — ${selectedBlock}`
    : "Top Clusters (All Blocks)";

  const totals = new Map();
  rows.forEach((r) => totals.set(r.cluster, (totals.get(r.cluster) || 0) + r.activityCount));
  const top = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  if (scienceCharts.cluster) scienceCharts.cluster.destroy();
  scienceCharts.cluster = new Chart(document.getElementById("scienceClusterChart"), {
    type: "bar",
    data: {
      labels: top.map(([name]) => name),
      datasets: [{ label: "Activities", data: top.map(([, v]) => v), backgroundColor: "#e08a2b", borderRadius: 4 }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
    },
  });
}

function renderScienceTable(rows) {
  const sorted = [...rows].sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0)).slice(0, 25);
  document.querySelector("#scienceTable tbody").innerHTML = sorted.map((r) => `
    <tr>
      <td>${r.date ? r.date.toLocaleDateString() : escapeHtml(r.timestamp)}</td>
      <td>${escapeHtml(r.block)}</td>
      <td>${escapeHtml(r.cluster)}</td>
      <td>${escapeHtml(r.school)}</td>
      <td>${escapeHtml(r.grade)}</td>
      <td>${r.activityCount}</td>
      <td>${r.students}</td>
      <td>${escapeHtml(r.month) || "—"}</td>
    </tr>
  `).join("") || `<tr><td colspan="8" class="muted">No submissions match the current filters.</td></tr>`;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

window.initScienceTab = initScienceTab;
