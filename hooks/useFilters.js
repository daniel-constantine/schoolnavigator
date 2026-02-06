import { useState, useMemo } from "react";

/**
 * Custom hook for managing filter state across pages
 * Eliminates code duplication between HomePage and MapPage
 */
export const useFilters = (initialSortBy = "overall") => {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedGradeLevel, setSelectedGradeLevel] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedSchoolType, setSelectedSchoolType] = useState("all");
  const [selectedTrend, setSelectedTrend] = useState("all");
  const [selectedDualLanguage, setSelectedDualLanguage] = useState("all");
  const [selectedPTA, setSelectedPTA] = useState("all");
  const [selectedIEP, setSelectedIEP] = useState("all");
  const [zipCode, setZipCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(initialSortBy);

  const filters = useMemo(
    () => ({
      searchQuery,
      selectedDistrict,
      selectedGradeLevel,
      selectedProgram,
      selectedSchoolType,
      selectedTrend,
      selectedDualLanguage,
      selectedPTA,
      selectedIEP,
      zipCode,
      sortBy,
    }),
    [
      searchQuery,
      selectedDistrict,
      selectedGradeLevel,
      selectedProgram,
      selectedSchoolType,
      selectedTrend,
      selectedDualLanguage,
      selectedPTA,
      selectedIEP,
      zipCode,
      sortBy,
    ],
  );

  const clearAllFilters = () => {
    setSelectedDistrict("all");
    setSelectedGradeLevel("all");
    setSelectedProgram("all");
    setSelectedSchoolType("all");
    setSelectedTrend("all");
    setSelectedDualLanguage("all");
    setSelectedPTA("all");
    setSelectedIEP("all");
    setZipCode("");
    setSearchQuery("");
  };

  return {
    // State
    selectedDistrict,
    selectedGradeLevel,
    selectedProgram,
    selectedSchoolType,
    selectedTrend,
    selectedDualLanguage,
    selectedPTA,
    selectedIEP,
    zipCode,
    searchQuery,
    sortBy,
    // Setters
    setSelectedDistrict,
    setSelectedGradeLevel,
    setSelectedProgram,
    setSelectedSchoolType,
    setSelectedTrend,
    setSelectedDualLanguage,
    setSelectedPTA,
    setSelectedIEP,
    setZipCode,
    setSearchQuery,
    setSortBy,
    // Computed
    filters,
    // Actions
    clearAllFilters,
  };
};
