import React, { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import SortTabs from "../components/SortTabs";
import StatsBar from "../components/StatsBar";
import AIAssistantBanner from "../components/AIAssistantBanner";
import SchoolCard from "../components/SchoolCard";
import Drawer from "../components/Drawer";
import { applyFilters } from "../filterUtils";
import { calculateStats, getUniqueDistricts } from "../utils";
import { useOutletContext } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFilters } from "../hooks/useFilters";
import {
  INITIAL_PAGE_SIZE,
  LOAD_MORE_SIZE,
  LOAD_MORE_DELAY_MS,
  MAX_SCHOOLS_FOR_COMPARISON,
} from "../constants";

const HomePageLoading = () => (
  <div className="loading-container">
    <div className="loading-spinner" />
    <p>Loading schools data...</p>
  </div>
);

const HomePageError = ({ error, onRetry }) => (
  <div className="error-container">
    <p>Failed to load schools: {error}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="retry-button">
        Retry
      </button>
    )}
  </div>
);

const HomePageNoResults = ({ onClearFilters }) => (
  <div className="no-results">
    <p>No schools found matching your filters.</p>
    <button type="button" onClick={onClearFilters} className="retry-button">
      Clear Filters
    </button>
  </div>
);

const HomePage = () => {
  const {
    loading,
    error,
    schools = [],
    schoolsTrends = {},
    loadSchools,
  } = useOutletContext() ?? {};

  const [favorites, setFavorites] = useState(() => new Set());
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [shownSchools, setShownSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState([]);

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
    clearAllFilters,
  } = useFilters();

  useEffect(() => {
    if (schools.length > 0) {
      const filtered = applyFilters(schools, filters, schoolsTrends);
      setFilteredSchools(filtered);
      setShownSchools(filtered.slice(0, INITIAL_PAGE_SIZE));
    }
  }, [schools, filters, schoolsTrends]);

  const toggleFavorite = useCallback((dbn) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(dbn)) next.delete(dbn);
      else next.add(dbn);
      return next;
    });
  }, []);

  const toggleSelected = useCallback((school) => {
    setSelectedSchool((prev) => {
      const exists = prev.some((s) => s.dbn === school.dbn);
      if (exists) return prev.filter((s) => s.dbn !== school.dbn);
      if (prev.length >= MAX_SCHOOLS_FOR_COMPARISON) return prev;
      return [...prev, school];
    });
  }, []);

  const fetchMoreData = useCallback(() => {
    setTimeout(() => {
      setShownSchools((prev) => {
        const nextStart = prev.length;
        const nextSlice = filteredSchools.slice(
          nextStart,
          nextStart + LOAD_MORE_SIZE,
        );
        return nextSlice.length > 0 ? [...prev, ...nextSlice] : prev;
      });
    }, LOAD_MORE_DELAY_MS);
  }, [filteredSchools]);

  const stats = useMemo(
    () => (schools.length > 0 ? calculateStats(schools) : null),
    [schools],
  );

  const districts = useMemo(() => getUniqueDistricts(schools), [schools]);

  const resultsMessage = useMemo(() => {
    if (loading) return "Loading schools...";
    if (error) return `Error: ${error}`;
    return `Showing ${filteredSchools.length} of ${schools.length} schools`;
  }, [loading, error, filteredSchools.length, schools.length]);

  const hasMoreToLoad =
    !loading && !error && shownSchools.length < filteredSchools.length;

  return (
    <div className="container">
      <div className="search-section">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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

        <SortTabs sortBy={sortBy} setSortBy={setSortBy} />

        <StatsBar stats={stats} />

        <AIAssistantBanner />

        <div className="results-count">{resultsMessage}</div>
      </div>

      {loading && <HomePageLoading />}

      {error && <HomePageError error={error} onRetry={loadSchools} />}

      {!loading && !error && filteredSchools.length === 0 && (
        <HomePageNoResults onClearFilters={clearAllFilters} />
      )}

      {!loading && !error && filteredSchools.length > 0 && (
        <InfiniteScroll
          dataLength={shownSchools.length}
          next={fetchMoreData}
          hasMore={hasMoreToLoad}
          loader={<h4>Loading...</h4>}
        >
          <div className="schools-grid">
            {shownSchools.map((school) => (
              <SchoolCard
                key={school.dbn}
                school={school}
                schoolsTrends={schoolsTrends}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                toggleSelected={toggleSelected}
                selectedSchool={selectedSchool}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      <Drawer
        selectedSchool={selectedSchool}
        onRemove={toggleSelected}
        onClear={() => setSelectedSchool([])}
      />
    </div>
  );
};

export default HomePage;
