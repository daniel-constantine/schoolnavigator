import React, { useState, useEffect, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import { calculateOverallRating } from "../../utils";
import { useOutletContext } from "react-router-dom";
import {
  MAX_SCHOOLS_FOR_MODAL_DISPLAY,
  MAX_SCHOOLS_FOR_COMPARISON,
} from "../../constants";

const AddSchoolModal = ({ isOpen, onClose, selectedSchools, onAddSchool }) => {
  const { loading, schools = [] } = useOutletContext() ?? {};
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredSchools = useMemo(() => {
    if (!searchQuery.trim()) return schools;
    const q = searchQuery.toLowerCase();
    return schools.filter(
      (school) =>
        school.name?.toLowerCase().includes(q) ||
        school.dbn?.toLowerCase().includes(q),
    );
  }, [schools, searchQuery]);

  const handleAddSchool = useCallback(
    (school) => {
      const atLimit = selectedSchools.length >= MAX_SCHOOLS_FOR_COMPARISON;
      const alreadyAdded = selectedSchools.some((s) => s.dbn === school.dbn);
      if (!atLimit && !alreadyAdded) {
        onAddSchool(school);
        onClose();
        setSearchQuery("");
      }
    },
    [selectedSchools, onAddSchool, onClose],
  );

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      data-testid="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-school-modal-title"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="modal-header">
          <h2 id="add-school-modal-title">Add School to Compare</h2>
          <button type="button" onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <input
            type="text"
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="modal-search"
            autoFocus
            aria-label="Search schools"
          />

          <div className="schools-list">
            {loading ? (
              <p>Loading schools...</p>
            ) : filteredSchools.length === 0 ? (
              <p>No schools found matching your search.</p>
            ) : (
              filteredSchools
                .slice(0, MAX_SCHOOLS_FOR_MODAL_DISPLAY)
                .map((school) => {
                  const isSelected = selectedSchools.some(
                    (s) => s.dbn === school.dbn,
                  );
                  const rating = calculateOverallRating(school);

                  return (
                    <div
                      key={school.dbn}
                      role="button"
                      tabIndex={0}
                      className={`school-option ${isSelected ? "disabled" : ""}`}
                      onClick={() => !isSelected && handleAddSchool(school)}
                      onKeyDown={(e) => {
                        if (
                          (e.key === "Enter" || e.key === " ") &&
                          !isSelected
                        ) {
                          e.preventDefault();
                          handleAddSchool(school);
                        }
                      }}
                    >
                      <div>
                        <h4>{school.name}</h4>
                        <p>
                          {school.dbn} • District {school.district}
                        </p>
                      </div>
                      {rating != null && (
                        <span className="school-rating-compare">{rating}</span>
                      )}
                      {isSelected && (
                        <span className="selected-badge">Added</span>
                      )}
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchoolModal;
