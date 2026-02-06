import React, { useState, useEffect, useCallback } from "react";
import {
  useSearchParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { Plus, AlertCircle, X } from "lucide-react";
import { calculateOverallRating } from "../../utils";
import CompareSchoolColumn from "./CompareSchoolColumn";
import ComparisonMetricsTable from "./ComparisonMetricsTable";
import ProgramsTable from "./ProgramsTable";
import AddSchoolModal from "./AddSchoolModal";
import { MAX_SCHOOLS_FOR_COMPARISON } from "../../constants";
import "./ComparePage.css";

const COMPARISON_METRICS = [
  {
    key: "overallRating",
    label: "Overall Rating",
    calculate: calculateOverallRating,
  },
  { key: "academics_score", label: "Academics Score" },
  { key: "climate_score", label: "Climate Score" },
  { key: "progress_score", label: "Progress Score" },
  { key: "ela_proficiency", label: "ELA Proficiency" },
  { key: "math_proficiency", label: "Math Proficiency" },
  { key: "science_proficiency", label: "Science Proficiency" },
  {
    key: "enrollment",
    label: "Enrollment",
    format: (v) => v?.toLocaleString(),
  },
  {
    key: "student_teacher_ratio",
    label: "Student-Teacher Ratio",
    format: (v) => (v ? `${v}:1` : "N/A"),
  },
  {
    key: "economic_need_index",
    label: "Economic Need Index",
    format: (v) => (v ? `${v}%` : "N/A"),
  },
  { key: "student_safety", label: "Student Safety" },
  { key: "student_teacher_trust", label: "Student-Teacher Trust" },
  { key: "student_engagement", label: "Student Engagement" },
  { key: "teacher_quality", label: "Teacher Quality" },
  { key: "teacher_collaboration", label: "Teacher Collaboration" },
  { key: "teacher_leadership", label: "Teacher Leadership" },
  { key: "guardian_satisfaction", label: "Guardian Satisfaction" },
  { key: "guardian_communication", label: "Guardian Communication" },
  { key: "guardian_school_trust", label: "Guardian-School Trust" },
  {
    key: "graduation_rate_4yr",
    label: "4-Year Graduation Rate",
    format: (v) => (v ? `${v}%` : "N/A"),
  },
  {
    key: "college_readiness_rate",
    label: "College Readiness",
    format: (v) => (v ? `${v}%` : "N/A"),
  },
  { key: "sat_avg_total", label: "Average SAT", format: (v) => v ?? "N/A" },
  { key: "ap_course_count", label: "AP Courses", format: (v) => v ?? 0 },
  {
    key: "pta_fundraising_total",
    label: "PTA Fundraising",
    format: (v) => (v ? `$${v.toLocaleString()}` : "N/A"),
  },
  {
    key: "iep_percent",
    label: "IEP %",
    format: (v) => (v ? `${v}%` : "N/A"),
  },
];

const ComparePageLoading = () => (
  <div className="loading-container">
    <div className="loading-spinner" />
    <p>Loading schools...</p>
  </div>
);

const ComparePage = () => {
  const { loading, error, schools = [] } = useOutletContext() ?? {};
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const schoolsParam = searchParams.get("schools");
    if (schoolsParam && schools.length > 0) {
      const dbns = schoolsParam.split(",").filter(Boolean);
      const matched = schools.filter((s) => dbns.includes(s.dbn));
      setSelectedSchools(matched);
    }
  }, [searchParams, schools]);

  const addSchool = useCallback((school) => {
    setSelectedSchools((prev) => {
      if (
        prev.length >= MAX_SCHOOLS_FOR_COMPARISON ||
        prev.some((s) => s.dbn === school.dbn)
      ) {
        return prev;
      }
      return [...prev, school];
    });
    setShowAddModal(false);
  }, []);

  const removeSchool = useCallback((dbn) => {
    setSelectedSchools((prev) => prev.filter((s) => s.dbn !== dbn));
  }, []);

  const onViewDetails = useCallback(
    (dbn) => {
      navigate(`/school/${dbn}`);
    },
    [navigate],
  );

  const clearFilters = useCallback(() => {
    setSelectedSchools([]);
    navigate("/compare");
  }, [navigate]);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  if (loading) {
    return <ComparePageLoading />;
  }

  return (
    <div className="compare-page">
      <div className="compare-header">
        <div className="header-left">
          <h1>Schools Comparison</h1>
          <p>Compare up to 5 schools side by side</p>
        </div>
      </div>

      {selectedSchools.length < 2 && (
        <div className="compare-empty">
          <AlertCircle size={48} className="empty-icon" />
          <h2>Add at least 2 schools to compare</h2>
          <p>Select schools from the search to see a detailed comparison</p>
        </div>
      )}

      <div className="compare-schools-container">
        {selectedSchools.map((school) => (
          <CompareSchoolColumn
            key={school.dbn}
            school={school}
            removeSchool={removeSchool}
            onViewDetails={onViewDetails}
          />
        ))}

        {selectedSchools.length < MAX_SCHOOLS_FOR_COMPARISON && (
          <div className="compare-school-column add-school-column">
            <button
              type="button"
              className="add-school-btn"
              onClick={() => setShowAddModal(true)}
              disabled={loading}
              aria-label="Add school to comparison"
            >
              <Plus size={32} />
              <span>Add School</span>
            </button>
          </div>
        )}
      </div>

      <div className="btn-clear-div">
        <button
          type="button"
          className="btn-clear"
          onClick={clearFilters}
          disabled={selectedSchools.length === 0}
          aria-label="Clear all selected schools"
        >
          <X size={18} />
          Clear Selection
        </button>
      </div>

      {selectedSchools.length >= 2 && (
        <>
          <ComparisonMetricsTable
            selectedSchools={selectedSchools}
            comparisonMetrics={COMPARISON_METRICS}
          />
          <ProgramsTable selectedSchools={selectedSchools} />
        </>
      )}

      <AddSchoolModal
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        selectedSchools={selectedSchools}
        onAddSchool={addSchool}
      />
    </div>
  );
};

export default ComparePage;
