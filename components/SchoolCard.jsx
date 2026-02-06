import "./SchoolCard.css";
import {
  Heart,
  Info,
  MapPin,
  Phone,
  Globe,
  GraduationCap,
  Users,
  TrendingUp,
  LandPlot,
  ArrowBigRight,
  Check,
  Plus,
} from "lucide-react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import {
  calculateOverallRating,
  getLocation,
  getTrendInfo,
  getRatingClass,
  formatFundraisingNumber,
  formatFundraisingTooltipTitle,
  formatFundraisingTooltipTotal,
} from "../utils";
import {
  ELA_TOOLTIP,
  MATH_TOOLTIP,
  SCIENCE_TOOLTIP,
  GRADUATION_TOOLTIP,
  COLLEGE_READINESS_TOOLTIP,
  SAT_TOOLTIP,
  AP_COURSE_TOOLTIP,
  SCORE_TOOLTIP,
  ENI_TOOLTIP,
} from "../constants";
import { Link } from "react-router-dom";

const SchoolCard = ({
  school,
  schoolsTrends,
  favorites,
  toggleFavorite,
  toggleSelected,
  selectedSchool,
}) => {
  const overallRating = calculateOverallRating(school);
  const location = getLocation(school.address);
  const trendInfo = getTrendInfo(school.dbn, schoolsTrends);

  return (
    <div className="school-card">
      <div className="school-header">
        <div className="school-title">
          <h3 data-testid="school-name">{school.name}</h3>
        </div>
        <div className="school-rating">
          <button
            className={`favorite-btn ${
              favorites.has(school.dbn) ? "active" : ""
            }`}
            onClick={() => toggleFavorite(school.dbn)}
            data-testid="favorite-button"
          >
            <Heart
              size={18}
              fill={favorites.has(school.dbn) ? "currentColor" : "none"}
            />
          </button>
          <div className={`rating-circle ${getRatingClass(overallRating)}`}>
            <span className="rating-number">{overallRating || "N/A"}</span>
          </div>
        </div>
      </div>

      <div className="school-badges">
        <span className="badge badge-district">{school.dbn}</span>
        {school.has_3k && <span className="badge badge-3k">3-K</span>}
        {school.has_prek && <span className="badge badge-prek">Pre-K</span>}
        {school.grade_band && (
          <span className="badge badge-grade">{school.grade_band}</span>
        )}
        {school.pta_fundraising_total && (
          <div
            className="badge badge-enrollment"
            data-tooltip-id="pta-fundraising-tooltip"
            data-tooltip-content={formatFundraisingTooltipTitle(school)}
            data-tooltip-total={formatFundraisingTooltipTotal(school)}
          >
            {formatFundraisingNumber(school.pta_fundraising_total)}
          </div>
        )}
        {school.economic_need_index && (
          <span
            className="badge badge-eni"
            data-tooltip-id="eni-tooltip"
            data-tooltip-content={ENI_TOOLTIP}
          >
            {Math.round(school.economic_need_index)}% ENI
          </span>
        )}
        {trendInfo && (
          <span
            className="badge badge-trend"
            style={{
              backgroundColor: `${trendInfo.color}20`,
              color: trendInfo.color,
              borderColor: trendInfo.color,
            }}
          >
            {trendInfo.icon} {trendInfo.label}
          </span>
        )}
        {school.has_dual_language && (
          <span className="badge badge-trend">Dual Lang</span>
        )}
        {school.has_gifted_talented && (
          <span className="badge badge-trend">{`${
            school.gt_program_type.charAt(0).toUpperCase() +
            school.gt_program_type.slice(1).toLowerCase()
          } G&T`}</span>
        )}
        {school.is_specialized_hs && (
          <span className="badge badge-trend">Specialized High School</span>
        )}

        <div
          className="rating-label"
          data-tooltip-id="overall-tooltip"
          data-tooltip-content={SCORE_TOOLTIP}
        >
          Overall
          <Info size={14} />
        </div>
      </div>

      {school.ela_proficiency !== null ||
      school.math_proficiency !== null ||
      school.science_proficiency !== null ? (
        <div className="school-scores">
          {
            <div className="score-item">
              <div className="score-circle">
                <CircularProgressbar
                  value={school.ela_proficiency || 0}
                  maxValue={100}
                  text={`${school.ela_proficiency || "N/A"}`}
                  styles={{
                    path: {
                      stroke: "#10b981",
                    },
                    text: {
                      fontSize: "32px",
                      fill: "#ffffff",
                    },
                  }}
                />
              </div>
              <div className="score-label">
                <span className="score-dot"></span>
                ELA
              </div>
              <Info
                size={14}
                className="score-info"
                data-tooltip-id="ela-tooltip"
                data-tooltip-content={ELA_TOOLTIP}
              />
            </div>
          }

          {
            <div className="score-item">
              <div className="score-circle">
                <CircularProgressbar
                  value={school.math_proficiency || 0}
                  maxValue={100}
                  text={`${school.math_proficiency || "N/A"}`}
                  styles={{
                    text: {
                      fontSize: "32px",
                      fill: "#ffffff",
                    },
                  }}
                />
              </div>
              <div className="score-label">
                <span className="score-dot score-dot-blue"></span>
                Math
              </div>
              <Info
                size={14}
                className="score-info"
                data-tooltip-id="math-tooltip"
                data-tooltip-content={MATH_TOOLTIP}
              />
            </div>
          }

          {
            <div className="score-item">
              <div className="score-circle">
                <CircularProgressbar
                  value={school.science_proficiency || 0}
                  maxValue={100}
                  text={`${school.science_proficiency || "N/A"}`}
                  styles={{
                    path: {
                      stroke: "#f59e0b",
                    },
                    text: {
                      fontSize: "32px",
                      fill: "#ffffff",
                    },
                  }}
                />
              </div>
              <div className="score-label">
                <span className="score-dot score-dot-orange"></span>
                Science
              </div>
              <Info
                size={14}
                className="score-info"
                data-tooltip-id="science-tooltip"
                data-tooltip-content={SCIENCE_TOOLTIP}
              />
            </div>
          }
        </div>
      ) : null}

      {school.graduation_rate_4yr ||
      school.college_readiness_rate ||
      school.sat_avg_total ||
      school.ap_course_count ? (
        <div className="second-school-info-section">
          {school.graduation_rate_4yr && (
            <div className="second-score-item">
              <div className="score-circle">
                <CircularProgressbarWithChildren
                  value={school.graduation_rate_4yr}
                  maxValue={100}
                  styles={{
                    path: {
                      stroke: "#6522a1",
                    },
                  }}
                >
                  <GraduationCap size={14} />
                  <span>
                    <strong>{school.graduation_rate_4yr}%</strong>
                  </span>
                </CircularProgressbarWithChildren>
              </div>
              <div
                className="score-label"
                data-tooltip-id="graduation-tooltip"
                data-tooltip-content={GRADUATION_TOOLTIP}
              >
                Graduation %
              </div>
            </div>
          )}

          {school.college_readiness_rate && (
            <div className="second-score-item">
              <div className="score-circle">
                <CircularProgressbarWithChildren
                  value={school.college_readiness_rate}
                  maxValue={100}
                  styles={{
                    path: {
                      stroke: "#32baad",
                    },
                  }}
                >
                  <TrendingUp size={14} />
                  <span>
                    <strong>{school.college_readiness_rate}%</strong>
                  </span>
                </CircularProgressbarWithChildren>
              </div>
              <div
                className="score-label"
                data-tooltip-id="college-readiness-tooltip"
                data-tooltip-content={COLLEGE_READINESS_TOOLTIP}
              >
                College Ready
              </div>
            </div>
          )}

          {school.sat_avg_total && (
            <div className="second-score-item">
              <div className="score-circle">
                <CircularProgressbarWithChildren
                  value={school.sat_avg_total}
                  maxValue={1600}
                  styles={{
                    path: {
                      stroke: "#a14e22",
                    },
                  }}
                >
                  <Users size={14} />
                  <span>
                    <strong>{school.sat_avg_total}</strong>
                  </span>
                </CircularProgressbarWithChildren>
              </div>
              <div
                className="score-label"
                data-tooltip-id="sat-tooltip"
                data-tooltip-content={SAT_TOOLTIP}
              >
                SAT Avg
              </div>
            </div>
          )}

          {school.ap_course_count !== null &&
            school.ap_course_count !== undefined && (
              <div className="second-score-item">
                <div className="score-circle">
                  <CircularProgressbarWithChildren
                    value={school.ap_course_count}
                    maxValue={30}
                    styles={{
                      path: {
                        stroke: "#5c5551",
                      },
                    }}
                  >
                    <GraduationCap size={14} />
                    <span>
                      <strong>{school.ap_course_count}</strong>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div
                  className="score-label"
                  data-tooltip-id="ap-tooltip"
                  data-tooltip-content={AP_COURSE_TOOLTIP}
                >
                  AP Courses
                </div>
              </div>
            )}
        </div>
      ) : null}

      <div className="school-footer">
        <div className="school-info">
          <MapPin size={14} />
          <span>{location}</span>
          <span className="separator">·</span>
          <>
            <LandPlot strokeWidth={1.5} />
            <span>District {school.district}</span>
          </>
          {school.student_teacher_ratio && (
            <>
              <span className="separator">·</span>
              <Users size={14} />
              <span>{school.student_teacher_ratio}:1</span>
            </>
          )}
          {school.phone && (
            <>
              <span className="separator">·</span>
              <Phone size={14} />
              <span>{school.phone}</span>
            </>
          )}
          {school.website && (
            <>
              <span className="separator">·</span>
              <Globe size={14} />
              <span>Website</span>
            </>
          )}
        </div>
        <div className="school-actions">
          <button
            className={`action-btn ${
              selectedSchool.some((s) => s.dbn === school.dbn) ? "selected" : ""
            }`}
            onClick={() => toggleSelected(school)}
          >
            {selectedSchool.some((s) => s.dbn === school.dbn) ? (
              <>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Check size={14} className="check-icon" /> <div>Added</div>
                </span>
              </>
            ) : (
              <>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Plus size={14} />
                  <div>Compare</div>
                </span>
              </>
            )}
          </button>
          <button className="action-btn-icon">
            <Link to={`/school/${school.dbn}`} target="_blank" className="link">
              <ArrowBigRight size={14} />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

SchoolCard.displayName = "SchoolCard";

export default SchoolCard;
