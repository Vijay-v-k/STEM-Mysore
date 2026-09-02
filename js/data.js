/**
 * DATA — mix of REAL figures (from the team's Google Sheet) and
 * PLACEHOLDER figures (not yet tracked / not found in the sheet).
 * Each field below is commented REAL or PLACEHOLDER so it's obvious
 * what to trust today vs. what still needs real input. The rest of
 * the app (map, team, programs tabs) reads only from these three
 * arrays, so replacing a placeholder here is the only change needed.
 * ------------------------------------------------------------------
 */

// ---------------------------------------------------------------
// 1. BLOCKS (Mysore district taluks) — map tab
// schools / students are REAL, from the Govt.-schools block-wise
// sheet ("update 31.07.2025"). teachers is REAL but UNVERIFIED — the
// source table's headers were merged/misaligned, so double check
// before relying on it. girlsEnrollment / dropoutRate / literacyRate
// / stemLabs / kpiScore were not in the sheet — still PLACEHOLDER.
// "Mysore" here sums the sheet's Mysore North + Rural + South rows.
// Shape/position on screen is drawn in the SVG in index.html
// (#mapSvg) — each polygon maps to a block below via BLOCK_SHAPES
// (js/app.js) keyed by id.
// ---------------------------------------------------------------
const BLOCKS = [
  {
    id: "krnagara",
    name: "Krishnarajanagara (K.R. Nagara)",
    schools: 253, // REAL
    students: 10917, // REAL
    teachers: 952, // REAL, unverified
    girlsEnrollment: 48.8, // PLACEHOLDER
    dropoutRate: 3.4, // PLACEHOLDER
    literacyRate: 70.5, // PLACEHOLDER
    stemLabs: 9, // PLACEHOLDER
    kpiScore: 63, // PLACEHOLDER
  },
  {
    id: "periyapatna",
    name: "Periyapatna",
    schools: 288, // REAL
    students: 14365, // REAL
    teachers: 956, // REAL, unverified
    girlsEnrollment: 48.6, // PLACEHOLDER
    dropoutRate: 3.6, // PLACEHOLDER
    literacyRate: 69.8, // PLACEHOLDER
    stemLabs: 8, // PLACEHOLDER
    kpiScore: 61, // PLACEHOLDER
  },
  {
    id: "hunsur",
    name: "Hunsur",
    schools: 312, // REAL
    students: 17356, // REAL
    teachers: 1259, // REAL, unverified
    girlsEnrollment: 49.2, // PLACEHOLDER
    dropoutRate: 3.1, // PLACEHOLDER
    literacyRate: 71.4, // PLACEHOLDER
    stemLabs: 14, // PLACEHOLDER
    kpiScore: 68, // PLACEHOLDER
  },
  {
    id: "mysuru",
    name: "Mysore",
    schools: 370, // REAL (North 76 + Rural 253 + South 41)
    students: 30657, // REAL (North 8,095 + Rural 19,742 + South 2,820)
    teachers: 5859, // REAL, unverified (North 1,982 + Rural 2,724 + South 1,153)
    girlsEnrollment: 50.3, // PLACEHOLDER
    dropoutRate: 1.4, // PLACEHOLDER
    literacyRate: 82.6, // PLACEHOLDER
    stemLabs: 46, // PLACEHOLDER
    kpiScore: 84, // PLACEHOLDER
  },
  {
    id: "tnarasipura",
    name: "T. Narasipura",
    schools: 254, // REAL
    students: 14858, // REAL
    teachers: 1093, // REAL, unverified
    girlsEnrollment: 48.3, // PLACEHOLDER
    dropoutRate: 3.3, // PLACEHOLDER
    literacyRate: 70.9, // PLACEHOLDER
    stemLabs: 7, // PLACEHOLDER
    kpiScore: 62, // PLACEHOLDER
  },
  {
    id: "nanjangud",
    name: "Nanjangud",
    schools: 288, // REAL
    students: 22592, // REAL
    teachers: 1232, // REAL, unverified
    girlsEnrollment: 49.4, // PLACEHOLDER
    dropoutRate: 2.9, // PLACEHOLDER
    literacyRate: 73.0, // PLACEHOLDER
    stemLabs: 12, // PLACEHOLDER
    kpiScore: 69, // PLACEHOLDER
  },
  {
    id: "hdkote",
    name: "Heggadadevanakote (H.D. Kote)",
    schools: 329, // REAL
    students: 17246, // REAL
    teachers: 931, // REAL, unverified
    girlsEnrollment: 47.9, // PLACEHOLDER
    dropoutRate: 4.8, // PLACEHOLDER
    literacyRate: 64.2, // PLACEHOLDER
    stemLabs: 6, // PLACEHOLDER
    kpiScore: 54, // PLACEHOLDER
  },
];

// ---------------------------------------------------------------
// 2. TEAM MEMBERS — team tab
// Names, roles and focus areas are real. For Madhu R, Shivaraju and
// Narasimharaju, KPI "target" values are REAL — pulled from their
// AY 2026-27 KRA (Key Result Area) doc in the sheet, which states
// them as annual % thresholds. The sheet has no monthly-tracked
// actuals column, so every "achieved" value below is PLACEHOLDER
// (illustrative progress) until real tracking data comes in.
// Hanumanthraju has no KRA table in the sheet (only meeting-log
// mentions of STEM Lab school visits) — his KPIs are fully
// PLACEHOLDER.
//
// Note: the sheet also has a full KRA for a "Vijay" (funder
// reporting, budget, Shikshagraha comms, DIKSHA proposal) — not one
// of the 4 people named for this dashboard, so left out for now.
// ---------------------------------------------------------------
const TEAM_MEMBERS = [
  {
    name: "Madhu R",
    role: "Government Liaisoning & Morning Assembly Program",
    block: "District-wide",
    kpis: [
      // target = REAL (KRA: "ensure 100% assembly implementation")
      { label: "Monthly Assembly Implementation", achieved: 78, target: 100, unit: "%" },
      // target = REAL (KRA: "at least 80% student engagement every month")
      { label: "Student Engagement in Assembly", achieved: 61, target: 80, unit: "%" },
      // target = REAL (KRA: "at least 80% of programme schools conduct structured morning assemblies")
      { label: "Programme Schools w/ Structured Assemblies", achieved: 54, target: 80, unit: "%" },
    ],
  },
  {
    name: "Shivaraju",
    role: "STEM at Scale",
    block: "District-wide",
    kpis: [
      // target = REAL (KRA: "achieve 80% DRG Operational Integration")
      { label: "DRG Operational Integration", achieved: 47, target: 80, unit: "%" },
      // target = REAL (KRA: "90% workshop attendance")
      { label: "Workshop Attendance", achieved: 68, target: 90, unit: "%" },
      // target = REAL (KRA: "District Science Mela — at least 70% of schools exhibit student-led projects")
      { label: "Schools Exhibiting at Science Mela", achieved: 31, target: 70, unit: "%" },
    ],
  },
  {
    name: "Narasimharaju",
    role: "Parent Engagement Initiative",
    block: "District-wide",
    kpis: [
      // target = REAL (KRA: "at least 60% of programme schools conduct one PEI activity every month")
      { label: "Schools Conducting Monthly PEI Activity", achieved: 34, target: 60, unit: "%" },
      // target = REAL (KRA: "at least 30% of schools showcase one practice via Pragathi Hejje")
      { label: "Schools Showcased via Pragathi Hejje", achieved: 11, target: 30, unit: "%" },
      // fully placeholder — no third metric in the KRA doc
      { label: "Parent Meetings Conducted", achieved: 32, target: 45, unit: "" },
    ],
  },
  {
    name: "Hanumanthraju",
    role: "STEM Lab Schools",
    block: "District-wide",
    kpis: [
      { label: "STEM Labs Set Up", achieved: 46, target: 70, unit: "" },
      { label: "Schools Onboarded", achieved: 58, target: 90, unit: "" },
      { label: "Teachers Trained on Lab Usage", achieved: 130, target: 200, unit: "" },
    ],
  },
];

// ---------------------------------------------------------------
// 3. SCHOOL IMPROVEMENT PROGRAMS — programs tab
// name + fundAllocated are REAL, from the AY 2026-27 budget lines in
// the sheet (fundAllocated is in ₹ Lakhs). utilization, reach and
// fundSpent are PLACEHOLDER — the sheet has budget lines but no
// utilization/reach/spend-so-far rollup per program. impact text is
// PLACEHOLDER/illustrative.
// ---------------------------------------------------------------
const PROGRAMS = [
  {
    name: "Quest Alliance STEM Kits (every HPS school)",
    description: "₹5,000 STEM kit provided to every Higher Primary School in the district.",
    utilization: 74, // PLACEHOLDER
    reachSchools: 955, // REAL (district HPS school count from the block-wise sheet)
    reachStudents: 0,
    fundAllocated: 50, // REAL (AY 2026-27 budget; ₹21L in 2025-26)
    fundSpent: 37, // PLACEHOLDER
    impact: "Every HPS school in the district equipped with a STEM kit (target)",
  },
  {
    name: "BRC Revival",
    description: "Reviving 2 Block Resource Centres as hubs for teacher support and training.",
    utilization: 60, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 10, // REAL (AY 2026-27 budget; ₹11L in 2025-26)
    fundSpent: 6, // PLACEHOLDER
    impact: "2 BRCs revived as active teacher-support hubs (target)",
  },
  {
    name: "CRP Workshops",
    description: "2 workshops for Cluster Resource Persons on STEM pedagogy and monitoring.",
    utilization: 80, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 4, // REAL (AY 2026-27 budget)
    fundSpent: 3.2, // PLACEHOLDER
    impact: "CRPs equipped to mentor schools on STEM pedagogy",
  },
  {
    name: "District Level Science Mela",
    description: "District-wide science exhibition for student-led STEM projects.",
    utilization: 55, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 3, // REAL (AY 2026-27 budget)
    fundSpent: 1.7, // PLACEHOLDER
    impact: "Target: 70% of participating schools exhibit student-led projects",
  },
  {
    name: "Block-Level Science Mela",
    description: "Taluk-level science exhibitions feeding into the district Science Mela.",
    utilization: 62, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 1.8, // REAL (AY 2026-27 budget)
    fundSpent: 1.1, // PLACEHOLDER
    impact: "Feeder events building toward the District Science Mela",
  },
  {
    name: "Science Block-Level Training",
    description: "Block-level training for teachers on activity-based science instruction.",
    utilization: 70, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 1, // REAL (AY 2026-27 budget)
    fundSpent: 0.7, // PLACEHOLDER
    impact: "Teachers trained on activity-based science instruction",
  },
  {
    name: "DRG Workshop",
    description: "District Resource Group workshop supporting STEM programme integration.",
    utilization: 65, // PLACEHOLDER
    reachSchools: 0,
    reachStudents: 0,
    fundAllocated: 0.5, // REAL (AY 2026-27 budget)
    fundSpent: 0.3, // PLACEHOLDER
    impact: "DRG members aligned on STEM programme rollout",
  },
];
