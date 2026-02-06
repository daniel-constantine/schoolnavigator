import React, { useState } from "react";
import "./AdmissionDemand.css";
import "./shared/utilities.css";
import "./shared/colors.css";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const gradeConfigs = [
  {
    key: "3K",
    label: "3K",
    seatsKey: "3K Seats Available",
    applicantsKey: "3K True Applicants",
    offersKey: "3K Offers",
  },
  {
    key: "Pre-K",
    label: "Pre-K",
    seatsKey: "Pre-K Seats Available",
    applicantsKey: "Pre-K True Applicants",
    offersKey: "Pre-K Offers",
  },
  {
    key: "Kindergarten",
    label: "Kindergarten",
    seatsKey: "Kindergarten Seats Available",
    applicantsKey: "Kindergarten True Applicants",
    offersKey: "Kindergarten Offers",
  },
  {
    key: "Grade 6",
    label: "Grade 6",
    seatsKey: "Grade 6 Seats Available",
    applicantsKey: "Grade 6 True Applicants",
    offersKey: "Grade 6 Offers",
  },
  {
    key: "Grade 9",
    label: "Grade 9",
    seatsKey: "Grade 9 Seats Available",
    applicantsKey: "Grade 9 True Applicants",
    offersKey: "Grade 9 Offers",
  },
];

const getCompetitivenessLevel = (appsPerSeat) => {
  if (appsPerSeat >= 3)
    return { label: "Very Competitive", className: "very-competitive" };
  if (appsPerSeat >= 2)
    return { label: "Competitive", className: "competitive" };
  if (appsPerSeat >= 1.2) return { label: "Moderate", className: "moderate" };
  return { label: "Accessible", className: "accessible" };
};

const GradeSection = ({ gradeConfig, admissionData }) => {
  const seats = admissionData[gradeConfig.seatsKey];
  const applicants = admissionData[gradeConfig.applicantsKey];
  const offers = admissionData[gradeConfig.offersKey];

  // Skip if data is N/A or missing
  if (seats === "N/A" || !seats || seats === "0") {
    return null;
  }

  const seatsNum = parseFloat(seats);
  const applicantsNum = parseFloat(applicants);
  const offersNum = parseFloat(offers);

  // Calculate metrics
  const appsPerSeat =
    applicantsNum > 0 && seatsNum > 0
      ? (applicantsNum / seatsNum).toFixed(1)
      : "N/A";

  const offerRate =
    applicantsNum > 0 && offersNum > 0
      ? Math.round((offersNum / applicantsNum) * 100)
      : "N/A";

  // Calculate estimated fill rate (offers / seats * 100)
  const estFillRate =
    seatsNum > 0 && offersNum > 0
      ? Math.round((offersNum / seatsNum) * 100)
      : null;

  const competitiveness =
    appsPerSeat !== "N/A"
      ? getCompetitivenessLevel(parseFloat(appsPerSeat))
      : { label: "N/A", className: "" };

  return (
    <div className="admission-grade-section bg-muted">
      <div className="flex justify-between items-center">
        <h3
          className="text-lg font-semibold text-foreground"
          style={{ margin: 0 }}
        >
          {gradeConfig.label}{" "}
          <span className="text-sm text-muted font-normal">(2025-2026)</span>
        </h3>
        <span className={`admission-badge ${competitiveness.className}`}>
          {competitiveness.label}
        </span>
      </div>

      <div className="grid gap-4 admission-metrics">
        <div className="admission-metric">
          <div className="text-xs text-muted">Seats</div>
          <div className="admission-metric-value font-bold tabular-nums">
            {seats}
          </div>
        </div>

        <div className="admission-metric">
          <div className="text-xs text-muted mb-1">Applicants</div>
          <div className="admission-metric-value font-bold tabular-nums">
            {applicants !== "N/A" ? applicants : "N/A"}
          </div>
        </div>

        <div className="admission-metric">
          <div className="text-xs text-muted mb-1">Apps/Seat</div>
          <div className="admission-metric-value font-bold tabular-nums">
            {appsPerSeat}
          </div>
        </div>

        <div className="admission-metric">
          <div className="text-xs text-muted mb-1">Offer Rate</div>
          <div className="admission-metric-value font-bold tabular-nums">
            {offerRate !== "N/A" ? `${offerRate}%` : "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdmissionDemand = ({ admissionData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!admissionData) {
    return null;
  }

  // Check if there's any valid data to display
  const hasData = gradeConfigs.some((config) => {
    const seats = admissionData[config.seatsKey];
    return seats && seats !== "N/A" && seats !== "0";
  });

  if (!hasData) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Info} className="large">
          Admissions & Demand
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col admission-sections-gap">
          {gradeConfigs.map((config) => (
            <GradeSection
              key={config.key}
              gradeConfig={config}
              admissionData={admissionData}
            />
          ))}
        </div>

        <div className="admission-info-section ">
          <button
            className="admission-info-toggle text-sm font-medium transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>How is this data calculated?</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isExpanded && (
            <div className="flex flex-col mt-4 admission-info-gap">
              <div className="flex flex-col ">
                <h4
                  className="text-sm font-semibold text-foreground"
                  style={{ margin: 0 }}
                >
                  Data Sources
                </h4>
                <p
                  className="admission-info-text text-muted"
                  style={{ margin: 0 }}
                >
                  Data is sourced from NYC DOE Local Law 72 "Student
                  Applications, Admissions and Offers" reports, which provide
                  official data on seats, applicants, and offers for each
                  school.
                </p>
              </div>

              <div className="flex flex-col ">
                <h4
                  className="text-sm font-semibold text-foreground"
                  style={{ margin: 0 }}
                >
                  Key Metrics
                </h4>
                <ul className="flex flex-col  admission-info-list">
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Applicants:</strong>{" "}
                    Unique applicants who ranked this school (not raw
                    application count, since families apply to multiple schools)
                  </li>
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Apps per Seat:</strong>{" "}
                    Unique Applicants ÷ Seats Available
                  </li>
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Offer Rate:</strong>{" "}
                    Offers Made ÷ Unique Applicants
                  </li>
                  {/* <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Est. Fill Rate:</strong>{" "}
                    Uses Bayesian-smoothed historical yield to estimate how full
                    the school will be
                  </li> */}
                </ul>
              </div>

              <div className="flex flex-col ">
                <h4
                  className="text-sm font-semibold text-foreground"
                  style={{ margin: 0 }}
                >
                  Competitiveness Levels
                </h4>
                <ul className="flex flex-col admission-info-list">
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">
                      Very Competitive:
                    </strong>{" "}
                    3+ applicants per seat
                  </li>
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Competitive:</strong>{" "}
                    2-3 applicants per seat
                  </li>
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Moderate:</strong> 1.2-2
                    applicants per seat
                  </li>
                  <li className="text-muted admission-info-list-item">
                    <strong className="text-foreground">Accessible:</strong>{" "}
                    Less than 1.2 applicants per seat
                  </li>
                </ul>
              </div>

              <div className="flex flex-col ">
                <h4
                  className="text-sm font-semibold text-foreground"
                  style={{ margin: 0 }}
                >
                  How Admissions Work
                </h4>
                <p
                  className="admission-info-text text-muted"
                  style={{ margin: 0 }}
                >
                  NYC uses a centralized matching algorithm. Families rank
                  schools by preference, and each program has priority groups
                  (zone, sibling, in-district). If more applicants than seats
                  within a priority group, random numbers determine who gets
                  offers.
                </p>
              </div>
              <div className="flex flex-col source-data">
                <Link
                  to="https://infohub.nyced.org/reports/government-reports/student-applications-admissions-and-offers"
                  target="_blank"
                  className="text-xs text-muted mt-4"
                >
                  View Source Data
                </Link>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
