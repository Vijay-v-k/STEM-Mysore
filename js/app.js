// ============================================================
// STEM Mysore Dashboard — app logic (vanilla JS, no build step)
// Reads data from js/data.js (BLOCKS, TEAM_MEMBERS, PROGRAMS)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  renderMap();
  renderDistrictSummary();
  renderTeam();
  renderPrograms();
  renderCharts();
  document.getElementById("lastUpdated").textContent =
    "Last updated: " + new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
});

// ---------------- Tabs ----------------
function initTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
      // Chart.js can't size a canvas while its tab panel is display:none,
      // so re-measure once the panel actually becomes visible.
      if (btn.dataset.tab === "programs") {
        [fundChartInstance, reachChartInstance].forEach((c) => c && c.resize());
      }
    });
  });
}

// ---------------- KPI helpers ----------------
function kpiClass(score) {
  if (score >= 75) return "kpi-high";
  if (score >= 60) return "kpi-mid";
  return "kpi-low";
}
function kpiLabel(score) {
  if (score >= 75) return "Strong";
  if (score >= 60) return "Moderate";
  return "Needs Focus";
}

// ---------------- Map tab ----------------
function renderMap() {
  const stage = document.getElementById("mapStage");
  stage.innerHTML = "";

  BLOCKS.forEach((block) => {
    const node = document.createElement("button");
    node.className = "block-node" + (block.id === "mysuru" ? " mysuru" : "");
    node.style.left = block.x + "%";
    node.style.top = block.y + "%";
    node.setAttribute("aria-label", "View details for " + block.name);

    const shape = document.createElement("div");
    shape.className = "block-shape " + kpiClass(block.kpiScore);
    shape.textContent = block.kpiScore;

    const label = document.createElement("span");
    label.className = "block-label";
    label.textContent = block.name.split(" (")[0];

    node.appendChild(shape);
    node.appendChild(label);
    node.addEventListener("click", () => openBlockModal(block));
    stage.appendChild(node);
  });
}

function openBlockModal(block) {
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <h2>${block.name}</h2>
    <p class="modal-sub">Block education snapshot &middot; placeholder data</p>
    <div class="stat-grid">
      <div class="stat-box"><div class="num">${block.schools.toLocaleString()}</div><div class="lbl">Schools</div></div>
      <div class="stat-box"><div class="num">${block.students.toLocaleString()}</div><div class="lbl">Students Enrolled</div></div>
      <div class="stat-box"><div class="num">${block.teachers.toLocaleString()}</div><div class="lbl">Teachers</div></div>
      <div class="stat-box"><div class="num">${block.stemLabs}</div><div class="lbl">STEM Labs</div></div>
      <div class="stat-box"><div class="num">${block.girlsEnrollment}%</div><div class="lbl">Girls' Enrollment</div></div>
      <div class="stat-box"><div class="num">${block.dropoutRate}%</div><div class="lbl">Dropout Rate</div></div>
      <div class="stat-box"><div class="num">${block.literacyRate}%</div><div class="lbl">Literacy Rate</div></div>
      <div class="stat-box"><div class="num">${block.kpiScore}/100</div><div class="lbl">Program KPI Score</div></div>
    </div>
    <span class="kpi-pill ${kpiClass(block.kpiScore)}">${kpiLabel(block.kpiScore)}</span>
  `;
  document.getElementById("modalOverlay").classList.add("open");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}

function renderDistrictSummary() {
  const total = BLOCKS.reduce(
    (acc, b) => {
      acc.schools += b.schools;
      acc.students += b.students;
      acc.teachers += b.teachers;
      acc.stemLabs += b.stemLabs;
      return acc;
    },
    { schools: 0, students: 0, teachers: 0, stemLabs: 0 }
  );
  const el = document.getElementById("districtSummary");
  el.innerHTML = `
    <div class="summary-card"><div class="num">${total.schools.toLocaleString()}</div><div class="lbl">Schools</div></div>
    <div class="summary-card"><div class="num">${(total.students / 1000).toFixed(0)}k</div><div class="lbl">Students</div></div>
    <div class="summary-card"><div class="num">${total.teachers.toLocaleString()}</div><div class="lbl">Teachers</div></div>
    <div class="summary-card"><div class="num">${total.stemLabs}</div><div class="lbl">STEM Labs</div></div>
  `;
}

// ---------------- Team tab ----------------
function renderTeam() {
  const grid = document.getElementById("teamGrid");
  grid.innerHTML = "";
  TEAM_MEMBERS.forEach((member) => {
    const card = document.createElement("div");
    card.className = "team-card";
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundType=gradientLinear`;

    let kpiHtml = "";
    member.kpis.forEach((kpi) => {
      const pct = Math.min(100, Math.round((kpi.achieved / kpi.target) * 100));
      const overClass = pct >= 100 ? "over" : "";
      kpiHtml += `
        <div class="kpi-row">
          <div class="kpi-row-top">
            <span class="kpi-name">${kpi.label}</span>
            <span class="kpi-vals">${kpi.achieved.toLocaleString()}${kpi.unit} / ${kpi.target.toLocaleString()}${kpi.unit} (${pct}%)</span>
          </div>
          <div class="bar-track"><div class="bar-fill ${overClass}" style="width:${pct}%"></div></div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="team-head">
        <img src="${avatar}" alt="${member.name}" />
        <div>
          <h3>${member.name}</h3>
          <p>${member.role} &middot; ${member.block}</p>
        </div>
      </div>
      ${kpiHtml}
    `;
    grid.appendChild(card);
  });
}

// ---------------- Programs tab ----------------
function renderPrograms() {
  const grid = document.getElementById("programsGrid");
  grid.innerHTML = "";
  PROGRAMS.forEach((p) => {
    const card = document.createElement("div");
    card.className = "program-card";
    const reachText = p.reachStudents > 0
      ? `${p.reachSchools} schools / ${p.reachStudents.toLocaleString()} students`
      : `${p.reachSchools} schools`;

    card.innerHTML = `
      <h3>${p.name}</h3>
      <p class="desc">${p.description}</p>
      <div class="util-label"><span>Fund Utilization</span><span>${p.utilization}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${p.utilization}%"></div></div>
      <div class="program-stats" style="margin-top:12px;">
        <div class="pbox"><div class="num">₹${p.fundSpent}L</div><div class="lbl">Spent of ₹${p.fundAllocated}L</div></div>
        <div class="pbox"><div class="num">${reachText}</div><div class="lbl">Reach</div></div>
      </div>
      <div class="impact-note">${p.impact}</div>
    `;
    grid.appendChild(card);
  });
}

// ---------------- Charts ----------------
let fundChartInstance = null;
let reachChartInstance = null;

function renderCharts() {
  const labels = PROGRAMS.map((p) => p.name);

  fundChartInstance = new Chart(document.getElementById("fundChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        { label: "Spent (₹L)", data: PROGRAMS.map((p) => p.fundSpent), backgroundColor: "#2f8a5f" },
        { label: "Allocated (₹L)", data: PROGRAMS.map((p) => p.fundAllocated), backgroundColor: "#e4e7ef" },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
      scales: { x: { ticks: { autoSkip: false, maxRotation: 40, minRotation: 20, font: { size: 10 } } } },
    },
  });

  reachChartInstance = new Chart(document.getElementById("reachChart"), {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data: PROGRAMS.map((p) => p.reachSchools),
          backgroundColor: ["#1d5b3f", "#2f8a5f", "#5cab7f", "#e08a2b", "#e0a92b", "#d1495b"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } } },
    },
  });
}
