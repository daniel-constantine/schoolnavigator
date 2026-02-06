import { calculateOverallRating } from "./utils";

// Memoization cache for expensive calculations
const ratingCache = new Map();
const gradeBandCache = new Map();

// Cache overall rating calculations
const getCachedRating = (school) => {
  const key = `${school.dbn}-${school.academics_score}-${school.climate_score}-${school.progress_score}`;
  if (!ratingCache.has(key)) {
    ratingCache.set(key, calculateOverallRating(school));
  }
  return ratingCache.get(key);
};

// Cache grade band parsing
const getCachedGradeBand = (school) => {
  if (!gradeBandCache.has(school.dbn)) {
    gradeBandCache.set(school.dbn, school.grade_band?.toLowerCase() || "");
  }
  return gradeBandCache.get(school.dbn);
};

// Clear caches when needed (call this when data changes)
export const clearFilterCaches = () => {
  ratingCache.clear();
  gradeBandCache.clear();
};

// Optimized grade level filter
const matchesGradeLevel = (school, selectedGradeLevel) => {
  if (selectedGradeLevel === "all") return true;

  const gradeBand = getCachedGradeBand(school);

  switch (selectedGradeLevel) {
    case "prek":
      return (
        school.has_prek ||
        gradeBand.includes("prek") ||
        gradeBand.includes("pre-k") ||
        gradeBand.includes("pk")
      );

    case "3k":
      return (
        school.has_3k || gradeBand.includes("3-k") || gradeBand.includes("3k")
      );

    case "elementary":
      return (
        (school.elementary_enrollment > 0 ||
          gradeBand.includes("k") ||
          /\b[1-5]\b/.test(gradeBand)) &&
        !/\b[6-8]\b/.test(gradeBand) &&
        !gradeBand.includes("9")
      );

    case "middle":
      return (
        (school.middle_enrollment > 0 || /\b[6-8]\b/.test(gradeBand)) &&
        !gradeBand.includes("k") &&
        !gradeBand.includes("9")
      );

    case "k8":
      return gradeBand.includes("k") && /\b[6-8]\b/.test(gradeBand);

    case "high":
      return (
        school.high_school_enrollment > 0 ||
        gradeBand.includes("9") ||
        gradeBand.includes("10") ||
        gradeBand.includes("11") ||
        gradeBand.includes("12")
      );

    default:
      return true;
  }
};

// Optimized dual language filter
const matchesDualLanguage = (school, selectedDualLanguage) => {
  if (selectedDualLanguage === "all") return true;
  if (!school.has_dual_language || !school.dual_language_languages)
    return false;

  const languages = school.dual_language_languages.map((lang) =>
    lang.toLowerCase(),
  );

  switch (selectedDualLanguage) {
    case "has_dual":
      return true;
    case "spanish":
      return languages.includes("spanish");
    case "chinese":
      return languages.some((lang) =>
        ["chinese", "mandarin", "cantonese"].includes(lang),
      );
    case "french":
      return languages.includes("french");
    case "other":
      return !languages.some((lang) =>
        ["spanish", "chinese", "mandarin", "cantonese", "french"].includes(
          lang,
        ),
      );
    default:
      return true;
  }
};

// Optimized IEP filter
const matchesIEP = (school, selectedIEP) => {
  if (selectedIEP === "all") return true;

  const iepPercent = school.iep_percent;

  switch (selectedIEP) {
    case "has_data":
      return iepPercent !== null && iepPercent !== undefined;
    case "low":
      return iepPercent !== null && iepPercent < 15;
    case "medium":
      return iepPercent !== null && iepPercent >= 15 && iepPercent <= 25;
    case "high":
      return iepPercent !== null && iepPercent > 25;
    default:
      return true;
  }
};

// Optimized PTA filter
const matchesPTA = (school, selectedPTA) => {
  if (selectedPTA === "all") return true;

  const ptaTotal = school.pta_fundraising_total;

  switch (selectedPTA) {
    case "has_data":
      return ptaTotal !== null && ptaTotal !== undefined;
    case "100k":
      return ptaTotal >= 100000;
    case "500k":
      return ptaTotal >= 500000;
    case "1m":
      return ptaTotal >= 1000000;
    default:
      return true;
  }
};

// Optimized sorting function
const sortSchools = (schools, sortBy) => {
  switch (sortBy) {
    case "overall": {
      return schools.sort((a, b) => {
        const ratingA = getCachedRating(a) || 0;
        const ratingB = getCachedRating(b) || 0;
        return ratingB - ratingA;
      });
    }
    case "academics":
      return schools.sort(
        (a, b) => (b.academics_score || 0) - (a.academics_score || 0),
      );
    case "climate":
      return schools.sort(
        (a, b) => (b.climate_score || 0) - (a.climate_score || 0),
      );
    case "progress":
      return schools.sort(
        (a, b) => (b.progress_score || 0) - (a.progress_score || 0),
      );
    case "az":
      return schools.sort((a, b) => a.name.localeCompare(b.name));
    case "pta":
      return schools.sort(
        (a, b) =>
          (b.pta_fundraising_total || 0) - (a.pta_fundraising_total || 0),
      );
    default:
      return schools;
  }
};

export const applyFilters = (schools, filters, schoolsTrends) => {
  // Use filter chaining instead of creating new arrays repeatedly
  let filtered = schools;

  // Early return if no filters
  const hasActiveFilters =
    filters.searchQuery.trim() !== "" ||
    filters.selectedDistrict !== "all" ||
    filters.selectedGradeLevel !== "all" ||
    filters.selectedProgram !== "all" ||
    filters.selectedSchoolType !== "all" ||
    filters.selectedTrend !== "all" ||
    filters.selectedDualLanguage !== "all" ||
    filters.selectedPTA !== "all" ||
    filters.selectedIEP !== "all" ||
    filters.zipCode.trim() !== "";

  if (hasActiveFilters) {
    // Pre-process search query once
    const searchLower = filters.searchQuery.toLowerCase();
    const searchZip = filters.zipCode.trim();
    const selectedDistrictNum =
      filters.selectedDistrict !== "all"
        ? parseInt(filters.selectedDistrict)
        : null;

    filtered = schools.filter((school) => {
      // Search query filter
      if (
        searchLower &&
        !(
          school.name.toLowerCase().includes(searchLower) ||
          school.dbn.toLowerCase().includes(searchLower) ||
          school.address?.toLowerCase().includes(searchLower)
        )
      ) {
        return false;
      }

      // District filter
      if (
        selectedDistrictNum !== null &&
        school.district !== selectedDistrictNum
      ) {
        return false;
      }

      // Grade level filter
      if (!matchesGradeLevel(school, filters.selectedGradeLevel)) {
        return false;
      }

      // Program filter
      if (filters.selectedProgram !== "all") {
        if (filters.selectedProgram === "prek" && !school.has_prek)
          return false;
        if (filters.selectedProgram === "3k" && !school.has_3k) return false;
      }

      // School type filter (G&T)
      if (filters.selectedSchoolType !== "all") {
        if (
          filters.selectedSchoolType === "has_gt" &&
          !school.has_gifted_talented
        )
          return false;
        if (
          filters.selectedSchoolType === "citywide_gt" &&
          (!school.has_gifted_talented ||
            school.gt_program_type?.toLowerCase() !== "citywide")
        )
          return false;
        if (
          filters.selectedSchoolType === "district_gt" &&
          (!school.has_gifted_talented ||
            school.gt_program_type?.toLowerCase() !== "district")
        )
          return false;
        if (
          filters.selectedSchoolType === "specialized_hs" &&
          !school.is_specialized_hs
        )
          return false;
      }

      // Trend filter
      if (filters.selectedTrend !== "all") {
        const trendData = schoolsTrends[school.dbn];
        if (!trendData || trendData.direction !== filters.selectedTrend)
          return false;
      }

      // Dual language filter
      if (!matchesDualLanguage(school, filters.selectedDualLanguage)) {
        return false;
      }

      // PTA filter
      if (!matchesPTA(school, filters.selectedPTA)) {
        return false;
      }

      // IEP filter
      if (!matchesIEP(school, filters.selectedIEP)) {
        return false;
      }

      // Zip code filter
      if (
        searchZip &&
        searchZip.length === 5 &&
        school.zip_code?.toString().trim() !== searchZip
      ) {
        return false;
      }

      return true;
    });
  }

  // Sort the results
  return sortSchools([...filtered], filters.sortBy);
};
