import React, { memo, useState } from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
import {
  GRADE_LEVELS,
  PROGRAM_OPTIONS,
  SCHOOL_TYPE_OPTIONS,
  TREND_OPTIONS,
  DUAL_LANGUAGE_OPTIONS,
  PTA_OPTIONS,
  IEP_OPTIONS,
} from "../constants";
import "./Filters.css";

const Filters = memo(function Filters({
  districts,
  selectedDistrict,
  setSelectedDistrict,
  selectedGradeLevel,
  setSelectedGradeLevel,
  selectedProgram,
  setSelectedProgram,
  selectedSchoolType,
  setSelectedSchoolType,
  selectedTrend,
  setSelectedTrend,
  selectedIEP,
  setSelectedIEP,
  selectedPTA,
  setSelectedPTA,
  selectedDualLanguage,
  setSelectedDualLanguage,
  zipCode,
  setZipCode,
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <button
        className="filters-toggle"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      <div
        className={`filters-panel ${filtersOpen ? "filters-panel--open" : ""}`}
      >
        <div className="filters" data-testid="filters">
          <select
            className="filter-select"
            data-testid="filter-district"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="all">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                District {district}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-grade-level"
            value={selectedGradeLevel}
            onChange={(e) => setSelectedGradeLevel(e.target.value)}
          >
            {GRADE_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            {PROGRAM_OPTIONS.map((program) => (
              <option key={program.value} value={program.value}>
                {program.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-school-type"
            value={selectedSchoolType}
            onChange={(e) => setSelectedSchoolType(e.target.value)}
          >
            {SCHOOL_TYPE_OPTIONS.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-trend"
            value={selectedTrend}
            onChange={(e) => setSelectedTrend(e.target.value)}
          >
            {TREND_OPTIONS.map((trend) => (
              <option key={trend.value} value={trend.value}>
                {trend.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-dual-language"
            value={selectedDualLanguage}
            onChange={(e) => setSelectedDualLanguage(e.target.value)}
          >
            {DUAL_LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filters-row-2">
          <select
            className="filter-select"
            data-testid="filter-iep"
            value={selectedIEP}
            onChange={(e) => setSelectedIEP(e.target.value)}
          >
            {IEP_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            data-testid="filter-pta"
            value={selectedPTA}
            onChange={(e) => setSelectedPTA(e.target.value)}
          >
            {PTA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="zip-input">
            <MapPin size={16} className="zipcode-icon" />
            <input
              data-testid="zipcode"
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={5}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default Filters;
