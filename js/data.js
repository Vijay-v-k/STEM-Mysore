/**
 * DUMMY / PLACEHOLDER DATA
 * ------------------------------------------------------------------
 * Everything in this file is illustrative sample data, not real
 * figures. Replace each object below with actual data whenever it
 * is available — the rest of the app (map, team, programs tabs)
 * reads only from these three arrays/objects, so no other file
 * needs to change.
 * ------------------------------------------------------------------
 */

// ---------------------------------------------------------------
// 1. BLOCKS (Mysore district taluks) — map tab
// Position x/y are percentages used to place each block on the
// illustrative map. Layout is approximate, not a precise GIS
// boundary — swap for a real GeoJSON/SVG boundary map later.
// ---------------------------------------------------------------
const BLOCKS = [
  {
    id: "hunsur",
    name: "Hunsur",
    x: 18, y: 38,
    schools: 312,
    students: 48250,
    teachers: 1720,
    girlsEnrollment: 49.2,
    dropoutRate: 3.1,
    literacyRate: 71.4,
    stemLabs: 14,
    kpiScore: 68,
  },
  {
    id: "periyapatna",
    name: "Periyapatna",
    x: 8, y: 55,
    schools: 224,
    students: 33110,
    teachers: 1180,
    girlsEnrollment: 48.6,
    dropoutRate: 3.6,
    literacyRate: 69.8,
    stemLabs: 8,
    kpiScore: 61,
  },
  {
    id: "hdkote",
    name: "Heggadadevanakote (H.D. Kote)",
    x: 20, y: 76,
    schools: 268,
    students: 39870,
    teachers: 1340,
    girlsEnrollment: 47.9,
    dropoutRate: 4.8,
    literacyRate: 64.2,
    stemLabs: 6,
    kpiScore: 54,
  },
  {
    id: "sargur",
    name: "Sargur",
    x: 33, y: 82,
    schools: 118,
    students: 16240,
    teachers: 560,
    girlsEnrollment: 48.1,
    dropoutRate: 4.3,
    literacyRate: 65.9,
    stemLabs: 3,
    kpiScore: 52,
  },
  {
    id: "saligrama",
    name: "Saligrama",
    x: 38, y: 46,
    schools: 142,
    students: 21030,
    teachers: 705,
    girlsEnrollment: 49.0,
    dropoutRate: 3.0,
    literacyRate: 72.1,
    stemLabs: 7,
    kpiScore: 66,
  },
  {
    id: "mysuru",
    name: "Mysuru (Urban + Rural)",
    x: 52, y: 52,
    schools: 941,
    students: 186400,
    teachers: 7260,
    girlsEnrollment: 50.3,
    dropoutRate: 1.4,
    literacyRate: 82.6,
    stemLabs: 46,
    kpiScore: 84,
  },
  {
    id: "krnagara",
    name: "Krishnarajanagara (K.R. Nagara)",
    x: 52, y: 24,
    schools: 236,
    students: 34980,
    teachers: 1210,
    girlsEnrollment: 48.8,
    dropoutRate: 3.4,
    literacyRate: 70.5,
    stemLabs: 9,
    kpiScore: 63,
  },
  {
    id: "nanjangud",
    name: "Nanjangud",
    x: 67, y: 66,
    schools: 289,
    students: 44870,
    teachers: 1560,
    girlsEnrollment: 49.4,
    dropoutRate: 2.9,
    literacyRate: 73.0,
    stemLabs: 12,
    kpiScore: 69,
  },
  {
    id: "tnarasipura",
    name: "Tirumakudalu Narasipura (T. Narasipura)",
    x: 80, y: 46,
    schools: 198,
    students: 28960,
    teachers: 990,
    girlsEnrollment: 48.3,
    dropoutRate: 3.3,
    literacyRate: 70.9,
    stemLabs: 7,
    kpiScore: 62,
  },
];

// ---------------------------------------------------------------
// 2. TEAM MEMBERS — team tab
// KPIs: value achieved so far, target for the period.
// ---------------------------------------------------------------
const TEAM_MEMBERS = [
  {
    name: "Sahil Modi",
    role: "Program Lead",
    block: "District-wide",
    kpis: [
      { label: "Schools Onboarded", achieved: 46, target: 60, unit: "" },
      { label: "Teachers Trained", achieved: 310, target: 400, unit: "" },
      { label: "Field Visits / Month", achieved: 18, target: 20, unit: "" },
    ],
  },
  {
    name: "Anjali Rao",
    role: "STEM Curriculum Coordinator",
    block: "Mysuru",
    kpis: [
      { label: "Labs Set Up", achieved: 9, target: 12, unit: "" },
      { label: "Student Workshops", achieved: 27, target: 30, unit: "" },
      { label: "Learning Outcome Improvement", achieved: 14, target: 20, unit: "%" },
    ],
  },
  {
    name: "Kiran Kumar",
    role: "Block Coordinator",
    block: "Hunsur & Periyapatna",
    kpis: [
      { label: "Schools Visited", achieved: 58, target: 70, unit: "" },
      { label: "Teacher Mentoring Sessions", achieved: 41, target: 50, unit: "" },
      { label: "Parent Meetings", achieved: 12, target: 15, unit: "" },
    ],
  },
  {
    name: "Deepa Nataraj",
    role: "M&E Associate",
    block: "District-wide",
    kpis: [
      { label: "Assessments Conducted", achieved: 3200, target: 4000, unit: "" },
      { label: "Data Reports Published", achieved: 7, target: 8, unit: "" },
      { label: "Dashboards Updated", achieved: 5, target: 6, unit: "" },
    ],
  },
  {
    name: "Farhan Sheikh",
    role: "Block Coordinator",
    block: "H.D. Kote & Sargur",
    kpis: [
      { label: "Schools Visited", achieved: 39, target: 55, unit: "" },
      { label: "Girls' Enrollment Drives", achieved: 6, target: 10, unit: "" },
      { label: "STEM Kits Distributed", achieved: 480, target: 600, unit: "" },
    ],
  },
  {
    name: "Priya Iyengar",
    role: "Community Engagement Officer",
    block: "Nanjangud & T. Narasipura",
    kpis: [
      { label: "Community Events", achieved: 11, target: 12, unit: "" },
      { label: "Volunteers Onboarded", achieved: 64, target: 80, unit: "" },
      { label: "Fund Utilization", achieved: 72, target: 100, unit: "%" },
    ],
  },
];

// ---------------------------------------------------------------
// 3. SCHOOL IMPROVEMENT PROGRAMS — programs tab
// fundSpent / fundAllocated are in ₹ Lakhs.
// ---------------------------------------------------------------
const PROGRAMS = [
  {
    name: "STEM Lab Setup Initiative",
    description: "Establishing hands-on science & robotics labs in government schools.",
    utilization: 76,
    reachSchools: 46,
    reachStudents: 18400,
    fundAllocated: 120,
    fundSpent: 91,
    impact: "Learning outcome scores up 14% in participating schools",
  },
  {
    name: "Teacher Capacity Building",
    description: "Training teachers on activity-based STEM pedagogy and digital tools.",
    utilization: 82,
    reachSchools: 210,
    reachStudents: 0,
    fundAllocated: 65,
    fundSpent: 53,
    impact: "310 teachers certified; classroom engagement up 22%",
  },
  {
    name: "Girls in STEM",
    description: "Scholarships, mentorship and career workshops encouraging girls into STEM streams.",
    utilization: 64,
    reachSchools: 88,
    reachStudents: 5200,
    fundAllocated: 40,
    fundSpent: 26,
    impact: "Girls' STEM stream enrollment up 9 percentage points",
  },
  {
    name: "Digital Learning Access",
    description: "Tablets, offline content libraries and connectivity for remote block schools.",
    utilization: 58,
    reachSchools: 132,
    reachStudents: 21600,
    fundAllocated: 95,
    fundSpent: 55,
    impact: "1,450 devices deployed across H.D. Kote, Sargur and Periyapatna",
  },
  {
    name: "School Infrastructure Upgrade",
    description: "Toilets, drinking water, classroom repairs and playgrounds in priority schools.",
    utilization: 90,
    reachSchools: 64,
    reachStudents: 0,
    fundAllocated: 150,
    fundSpent: 135,
    impact: "64 schools brought up to minimum infrastructure standard",
  },
  {
    name: "Community & Parent Engagement",
    description: "School Management Committee strengthening and parent awareness drives.",
    utilization: 71,
    reachSchools: 300,
    reachStudents: 0,
    fundAllocated: 25,
    fundSpent: 18,
    impact: "64 active volunteers; attendance regularity up 6%",
  },
];
