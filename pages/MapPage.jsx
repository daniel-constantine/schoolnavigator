import React, { useState, useEffect, useMemo, useCallback } from "react";
import { MapPin } from "lucide-react";
import { applyFilters } from "../filterUtils";
import Filters from "../components/Filters";
import { useOutletContext } from "react-router-dom";
import Map from "../components/Map";
import { getUniqueDistricts } from "../utils";
import { useFilters } from "../hooks/useFilters";
import { SCORE_LEGEND_ITEMS } from "../constants";
import "./MapPage.css";

const MapPage = () => {
  const {
    loading,
    error,
    schools = [],
    schoolsTrends = {},
  } = useOutletContext() ?? {};

  const {
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
    filters,
  } = useFilters();

  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    if (schools.length > 0) {
      const filtered = applyFilters(schools, filters, schoolsTrends);
      setFilteredSchools(filtered);
    }
  }, [schools, filters, schoolsTrends]);

  const districts = useMemo(() => getUniqueDistricts(schools), [schools]);

  return (
    <div className="map-page">
      <div className="map-container">
        <Filters
          districts={districts}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedGradeLevel={selectedGradeLevel}
          setSelectedGradeLevel={setSelectedGradeLevel}
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          selectedSchoolType={selectedSchoolType}
          setSelectedSchoolType={setSelectedSchoolType}
          selectedTrend={selectedTrend}
          setSelectedTrend={setSelectedTrend}
          selectedIEP={selectedIEP}
          setSelectedIEP={setSelectedIEP}
          selectedPTA={selectedPTA}
          setSelectedPTA={setSelectedPTA}
          selectedDualLanguage={selectedDualLanguage}
          setSelectedDualLanguage={setSelectedDualLanguage}
          zipCode={zipCode}
          setZipCode={setZipCode}
        />
        <div className="score">
          <span>Score Legend:</span>
          {SCORE_LEGEND_ITEMS.map(({ className, label }) => (
            <span key={label} className="score-item">
              <span className={className} />
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="map-placeholder">
        {!loading && !error && <Map filteredSchools={filteredSchools} />}
      </div>
    </div>
  );
};

export default MapPage;
