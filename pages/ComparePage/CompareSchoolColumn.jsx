import React, { memo } from "react";
import { X, Info, MapPin, LandPlot, School } from "lucide-react";
import { calculateOverallRating, getRatingClass } from "../../utils";
import { SCORE_TOOLTIP } from "../../constants";

const CompareSchoolColumn = ({ school, removeSchool, onViewDetails }) => {
  if (!school) {
    return (
      <div
        className="compare-school-column"
        data-testid="compare-school-column"
      >
        <p>No School Selected</p>
        <p>Select a school to compare</p>
      </div>
    );
  }

  const rating = calculateOverallRating(school);
  const ratingClass = getRatingClass(rating);

  return (
    <div className="compare-school-column" data-testid="compare-school-column">
      <div className="compare-school-header">
        <button
          type="button"
          className="remove-school-btn"
          onClick={() => removeSchool(school.dbn)}
          aria-label="Remove school from comparison"
        >
          <X size={20} />
        </button>

        <div className="school-title">
          <h3 data-testid="school-name">{school.name}</h3>
        </div>

        <div className="badge badge-district">{school.dbn}</div>
        <div className="compare-page-rating">
          <div className={`rating-circle ${ratingClass} compare-rating`}>
            <span className="rating-number compare-rating">
              {rating ?? "N/A"}
            </span>
          </div>
        </div>
        <div
          className="compare-page-rating-label"
          data-tooltip-id="overall-tooltip"
          data-tooltip-content={SCORE_TOOLTIP}
        >
          Overall Score
          <Info size={18} />
        </div>
      </div>

      <div className="compare-school-info">
        <p>
          <MapPin size={14} /> • {school.address}
        </p>
        <p>
          <LandPlot size={14} /> • District {school.district}
        </p>
        <p>
          <School size={14} /> • Grade {school.grade_band}
        </p>
      </div>

      <div className="compare-page-rating">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onViewDetails(school.dbn)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CompareSchoolColumn;
