// Pagination and loading constants
export const INITIAL_PAGE_SIZE = 20;
export const LOAD_MORE_SIZE = 20;
export const LOAD_MORE_DELAY_MS = 1500;
export const MAX_SCHOOLS_FOR_COMPARISON = 5;
export const MAX_SCHOOLS_FOR_MODAL_DISPLAY = 20;

// Map constants
export const MAP_CENTER = [40.7589, -73.9851];
export const MAP_ZOOM = 13;

// Filter and sort options
export const GRADE_LEVELS = [
  { value: "all", label: "All Grade Levels" },
  { value: "prek", label: "Pre-K Program" },
  { value: "3k", label: "3-K Program" },
  { value: "elementary", label: "Elementary (K-5)" },
  { value: "middle", label: "Middle School (6-8)" },
  { value: "k8", label: "K-8 Schools" },
  { value: "high", label: "High School (9-12)" },
];

export const PROGRAM_OPTIONS = [
  { value: "all", label: "All Programs" },
  { value: "prek", label: "Has Pre-K" },
  { value: "3k", label: "Has 3-K" },
];

export const SCHOOL_TYPE_OPTIONS = [
  { value: "all", label: "All Schools" },
  { value: "has_gt", label: "Has G&T" },
  { value: "citywide_gt", label: "Citywide G&T" },
  { value: "district_gt", label: "District G&T" },
  { value: "specialized_hs", label: "Specialized High Schools" },
];

export const TREND_OPTIONS = [
  { value: "all", label: "All Trends" },
  { value: "improving", label: "Improving" },
  { value: "stable", label: "Stable" },
  { value: "declining", label: "Declining" },
];

export const DUAL_LANGUAGE_OPTIONS = [
  { value: "all", label: "All Schools" },
  { value: "has_dual", label: "Has Dual Language" },
  { value: "spanish", label: "Spanish Dual Language" },
  { value: "chinese", label: "Chinese Dual Language" },
  { value: "french", label: "French Dual Language" },
  { value: "other", label: "Other Languages" },
];

export const PTA_OPTIONS = [
  { value: "all", label: "All Schools" },
  { value: "has_data", label: "Has PTA Data" },
  { value: "100k", label: "$100K+ Raised" },
  { value: "500k", label: "$500K+ Raised" },
  { value: "1m", label: "$1M+ Raised" },
];

export const IEP_OPTIONS = [
  { value: "all", label: "All Schools" },
  { value: "has_data", label: "Has IEP Data" },
  { value: "low", label: "Low IEP (<15%)" },
  { value: "medium", label: "Medium IEP (15-25%)" },
  { value: "high", label: "High IEP (>25%)" },
];

export const SORT_OPTIONS = [
  { value: "overall", label: "Overall" },
  { value: "academics", label: "Academics" },
  { value: "climate", label: "Climate" },
  { value: "progress", label: "Progress" },
  { value: "az", label: "A-Z" },
  { value: "pta", label: "PTA $" },
];

export const ELA_TOOLTIP =
  "Percentage of students who met or exceeded New York State standards on the English Language Arts exam. This measures reading, writing, and comprehension skills.";
export const MATH_TOOLTIP =
  "Percentage of students who met or exceeded New York State standards on the Math exam. This measures mathematical reasoning and problem-solving abilities.";
export const SCIENCE_TOOLTIP =
  "Percentage of students who met or exceeded New York State standards on the Science exam (administered in grades 5 and 8). This measures scientific inquiry, reasoning, and understanding of core concepts.";
export const SCORE_TOOLTIP =
  "Overall score combines test proficiency (average of ELA and Math OR average of graduation rate and college readiness rate - 40% ), school climate (30%), and student progress (30%). Scores 90+ are Outstanding, 80-89 are Strong, 70-79 are Average, below 70 Needs Improvement, and N/A indicates insufficient data to calculate a reliable score.";
export const GRADUATION_TOOLTIP =
  "Percentage of students graduating within 4 years of entering high school.";
export const COLLEGE_READINESS_TOOLTIP =
  "Percentage of students meeting NYC's college and career readiness benchmarks.";
export const AP_COURSE_TOOLTIP =
  "Number of Advanced Placement courses available for college-level study.";
export const SAT_TOOLTIP = "Average SAT score of students at the school.";
export const ENI_TOOLTIP =
  "The Economic Need Index (ENI) represents the percentage of students facing economic hardship at school. This includes students in temporary housing, those living in poverty, or receiving public assistance such as SNAP or TANF. A higher ENI percentage means more students at the school come from economically disadvantaged backgrounds. ENI help parents understand the socioeconomic diversity of the school community and can indicate access to additional support services and funding. School with higher ENI may receive extra resources to support student needs.";

// Score legend items for map
export const SCORE_LEGEND_ITEMS = [
  { className: "score-emerald", label: "90+" },
  { className: "score-yellow", label: "80-89" },
  { className: "score-violet", label: "70-79" },
  { className: "score-red", label: "<70" },
];
