export const getDifferenceText = (score, average) => {
  if (score == "N/A") return "";

  const dif = Math.round(score - average);
  if (dif === 0) {
    return "±0";
  }

  if (dif < 0) {
    return ` ${dif}`;
  }

  return `+${dif}`;
};

export const getDifferenceColor = (score) => {
  if (score.includes("N/A")) return "";

  if (score.includes("+")) return "green-hb";
  if (score.includes("-")) return "red-hb";
  return "";
};

// Map numeric rating to CSS class (green/yellow/purple/red)
export const getRatingClass = (rating) => {
  if (rating == null) return "red";
  if (rating > 90) return "green";
  if (rating > 80) return "yellow";
  if (rating > 70) return "purple";
  return "red";
};

// Calculate overall rating from available scores
// Overall Score = Test Proficiency (40%) + Climate (30%) + Progress (30%)
export const calculateOverallRating = (school) => {
  // For Test Proficiency, use academics_score if available
  // Otherwise try to calculate from ELA and Math proficiency

  const mathElaProficiency =
    (school.ela_proficiency + school.math_proficiency) / 2;
  const collegeProficiency =
    (school.college_readiness_rate + school.graduation_rate_4yr) / 2;
  let testProficiency =
    mathElaProficiency !== 0
      ? mathElaProficiency
      : collegeProficiency !== 0
        ? collegeProficiency
        : null;

  if (testProficiency === null) {
    return null;
  }

  const climate = school.climate_score;
  const progress = school.progress_score;

  // Calculate weighted average, handling missing values
  let totalWeight = 0;
  let weightedSum = 0;

  if (testProficiency !== null) {
    weightedSum += testProficiency * 40;
    totalWeight += 0.4;
  }

  if (climate !== null) {
    weightedSum += climate * 30;
    totalWeight += 0.3;
  }

  if (progress !== null) {
    weightedSum += progress * 30;
    totalWeight += 0.3;
  }

  // If no scores available, return null
  if (totalWeight === 0) return null;

  // Normalize to 100 scale if not all components are available
  const normalizedScore = weightedSum / 100;

  return Math.round(normalizedScore);
};

// Get borough from address
export const getLocation = (address) => {
  if (!address) return "NYC";
  if (address.includes("Brooklyn")) return "Brooklyn";
  if (address.includes("Manhattan")) return "Manhattan";
  if (address.includes("Queens")) return "Queens";
  if (address.includes("Bronx")) return "Bronx";
  if (address.includes("Staten Island")) return "Staten Island";
  return "NYC";
};

// Calculate stats from all schools
export const calculateStats = (schools) => {
  const total = schools.length;
  const elementary = schools.filter(
    (s) =>
      s.elementary_enrollment > 0 ||
      s.grade_band?.includes("K") ||
      s.grade_band?.includes("PK"),
  ).length;
  const middle = schools.filter(
    (s) =>
      s.middle_enrollment > 0 ||
      s.grade_band?.includes("6") ||
      s.grade_band?.includes("7") ||
      s.grade_band?.includes("8"),
  ).length;
  const highSchool = schools.filter(
    (s) =>
      s.high_school_enrollment > 0 ||
      s.grade_band?.includes("9") ||
      s.grade_band?.includes("12"),
  ).length;
  const has3K = schools.filter((s) => s.has_3k).length;
  const hasPreK = schools.filter((s) => s.has_prek).length;
  const hasGT = schools.filter((s) => s.has_gifted_talented).length;
  const hasDualLang = schools.filter((s) => s.has_dual_language).length;

  return {
    total,
    elementary,
    middle,
    highSchool,
    has3K,
    hasPreK,
    hasGT,
    hasDualLang,
  };
};

// Get unique districts from schools
export const getUniqueDistricts = (schools) => {
  const districts = [...new Set(schools.map((school) => school.district))]
    .filter((d) => d !== null)
    .sort((a, b) => a - b);
  return districts;
};

// Get trend info for a school
export const getTrendInfo = (dbn, schoolsTrends) => {
  const trend = schoolsTrends[dbn];
  if (!trend) return null;

  const getTrendIcon = (direction) => {
    switch (direction) {
      case "improving":
        return "↗";
      case "declining":
        return "↘";
      case "stable":
        return "→";
      default:
        return "—";
    }
  };

  const getTrendColor = (direction) => {
    switch (direction) {
      case "improving":
        return "#10b981";
      case "declining":
        return "#ef4444";
      case "stable":
        return "#f59e0b";
      default:
        return "#999";
    }
  };

  return {
    direction: trend.direction,
    changePercent: trend.changePercent,
    yearsAnalyzed: trend.yearsAnalyzed,
    icon: getTrendIcon(trend.direction),
    color: getTrendColor(trend.direction),
    label: trend.direction.charAt(0).toUpperCase() + trend.direction.slice(1),
  };
};

export const formatFundraisingNumber = (value) => {
  const num = Number(value);

  if (num >= 1_000_000) {
    return "$" + (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (num >= 1_000) {
    return "$" + Math.round(num / 1_000) + "K";
  }

  return "$" + String(num);
};

export const formatFundraisingTooltipTitle = (school) => {
  const title = `PTA Fundraising (${school.pta_fundraising_year})`;
  return title;
};

export const formatFundraisingTooltipTotal = (school) => {
  const total = `Total: $${Number(school.pta_fundraising_total).toLocaleString(
    "en-US",
  )} ($${Number(school.pta_per_student).toLocaleString("en-US")}/student)`;
  return total;
};
