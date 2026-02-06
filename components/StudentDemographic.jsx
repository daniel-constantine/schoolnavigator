import "./StudentDemographic.css";
import "./shared/utilities.css";
import { getDifferenceText, getDifferenceColor } from "../utils";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";

const raceFields = [
  { key: "hispanic_percent", label: "Hispanic" },
  { key: "black_percent", label: "Black" },
  { key: "white_percent", label: "White" },
  { key: "asian_percent", label: "Asian" },
  { key: "multi_racial_percent", label: "Multi-Racial" },
];

export const StudentDemographic = ({ school, district }) => {
  const eniValue = school.economic_need_index
    ? `${Math.round(school.economic_need_index)}%`
    : "N/A";

  const eniTrending = getDifferenceText(
    school.economic_need_index,
    district.economicNeedIndex,
  );
  const eniTrendingColor = getDifferenceColor(eniTrending);

  const iepValue =
    school.iep_percent != null ? `${school.iep_percent}%` : "N/A";
  const iepTrending = getDifferenceText(
    school.iep_percent,
    district.iepPercent,
  );
  const iepTrendingColor = getDifferenceColor(iepTrending);

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Users} className="large">
          Student Demographics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="student-demographic-columns">
          <div className="student-demographic-stat">
            <dt className="font-medium text-sm">Economic Need Index</dt>
            <div className="flex items-center gap-2">
              <dd className="student-demographic-value">{eniValue}</dd>
              <span className="student-demographic-trending">
                {eniTrendingColor === "green-hb" && <TrendingUp size={14} />}
                {eniTrendingColor === "red-hb" && <TrendingDown size={14} />}
                <span className={eniTrendingColor}>
                  {eniTrending !== "N/A" && eniTrending}
                </span>
              </span>
            </div>
            <p className="student-demographic-label">
              vs. District {district.district} average (
              {district.economicNeedIndex})
            </p>
            <p className="student-demographic-label">
              Percentage of students facing economic hardship. Lower indicates
              fewer students in need.
            </p>
          </div>

          <div className="student-demographic-stat">
            <dt className="font-medium text-sm">IEP Students</dt>
            <div className="flex items-center gap-2">
              <dd className="student-demographic-value">{iepValue}</dd>
              <span className="student-demographic-trending">
                {iepTrendingColor === "green-hb" && <TrendingUp size={14} />}
                {iepTrendingColor === "red-hb" && <TrendingDown size={14} />}
                <span className={iepTrendingColor}>
                  {iepTrending !== "N/A" && iepTrending}
                </span>
              </span>
            </div>
            <p className="student-demographic-label">
              vs. District {district.district} average ({district.iepPercent})
            </p>
            <p className="student-demographic-label">
              Students with Individualized Education Programs for special needs.
            </p>
          </div>
        </div>

        <div className="student-demographic-diversity">
          <h4 className="text-section-header  mb-1">
            Racial & Ethnic Diversity
          </h4>
          <p className="student-demographic-diversity-description">
            Percentage of students by race/ethnicity.
          </p>
          <div className="student-demographic-race-grid">
            {raceFields.map((race) => (
              <div key={race.key} className="student-demographic-race-item">
                <div className="student-demographic-race-value">
                  {school[race.key] != null ? `${school[race.key]}%` : "N/A"}
                </div>
                <div className="student-demographic-race-label">
                  {race.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
