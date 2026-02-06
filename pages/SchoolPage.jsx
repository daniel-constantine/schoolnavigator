import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Minus,
  Star,
  Share2,
  Heart,
  Phone,
  Globe,
  Mail,
  UserRound,
  Calculator,
  MapIcon,
  MapPinCheckIcon,
} from "lucide-react";
import {
  fetchSchools,
  fetchSchoolsTrends,
  fetchAdmissionHistory,
} from "../api";
import {
  calculateOverallRating,
  getLocation,
  getTrendInfo,
  formatFundraisingNumber,
  formatFundraisingTooltipTitle,
  formatFundraisingTooltipTotal,
} from "../utils";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Map from "../components/Map";
import "./SchoolPage.css";
import "react-tabs/style/react-tabs.css";
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
import { ScoreExplanation } from "../components/ScoreExplanation";
import { OverallSnapshot } from "../components/OverallSnapshot";
import { ComponentScore } from "../components/ComponentScore";
import { SchoolEnrollmentDetail } from "../components/SchoolEnrollmentDetail";
import { CheckoutOtherSchool } from "../components/CheckoutOtherSchool";
import { AcademicPerformance } from "../components/AcademicPerformance";
import { HighSchoolOutcome } from "../components/HighSchoolOutcome";
import { PTAFundraising } from "../components/PTAFundraising";
import { StudentDemographic } from "../components/StudentDemographic";
import { SchoolSurvey } from "../components/SchoolSurvey";
import { HistoricalTrends } from "../components/HistoricalTrends";
import { AdmissionDemand } from "../components/AdmissionDemand";
import { SpecialPrograms } from "../components/SpecialPrograms";

const districtToBorough = {
  1: "Manhattan",
  2: "Manhattan",
  3: "Manhattan",
  4: "Manhattan",
  5: "Manhattan",
  6: "Manhattan",

  7: "Bronx",
  8: "Bronx",
  9: "Bronx",
  10: "Bronx",
  11: "Bronx",
  12: "Bronx",

  13: "Brooklyn",
  14: "Brooklyn",
  15: "Brooklyn",
  16: "Brooklyn",
  17: "Brooklyn",
  18: "Brooklyn",
  19: "Brooklyn",
  20: "Brooklyn",
  21: "Brooklyn",
  22: "Brooklyn",
  23: "Brooklyn",

  24: "Queens",
  25: "Queens",
  26: "Queens",
  27: "Queens",
  28: "Queens",
  29: "Queens",
  30: "Queens",

  31: "Staten Island",

  32: "Brooklyn",
};

const SchoolPage = () => {
  const { dbn } = useParams();

  const {
    loading,
    error,
    schools,
    schoolsTrends,
    districtAverage,
    admissionHistory,
  } = useOutletContext();

  const [school, setSchool] = useState(null);
  const [district, setDistrict] = useState(null);
  const [admission, setAdmission] = useState(null);

  useEffect(() => {
    if (
      schools.length > 0 &&
      districtAverage !== null &&
      admissionHistory !== null
    ) {
      const currentSchool = schools.find((s) => s.dbn === dbn);
      const curDistrict = districtAverage[String(currentSchool.district)];
      const curAdmissionHistory = admissionHistory[String(currentSchool.dbn)];
      setSchool(currentSchool);
      setDistrict(curDistrict);
      setAdmission(curAdmissionHistory);
      console.log(curAdmissionHistory);
    }
  }, [schools, districtAverage]);

  return (
    <div className="school-page">
      {!loading && !error && schools.length > 0 && school && district && (
        <>
          <div className="school-page-header">
            <div className="school-page-header-inner">
              <div className="school-page-title-row">
                <h1 className="school-page-title">{school.name}</h1>
              </div>
              <div className="schoolpage-badges">
                <span className="badge badge-district">{school.dbn}</span>
                {school.has_3k && <span className="badge badge-3k">3-K</span>}
                {school.has_prek && (
                  <span className="badge badge-prek">Pre-K</span>
                )}
                {school.grade_band && (
                  <span className="badge badge-grade">
                    Grades {school.grade_band}
                  </span>
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
                {school.district && (
                  <span className="badge badge-eni">
                    District {school.district}
                  </span>
                )}
                {school.district && (
                  <span className="badge badge-eni">
                    {districtToBorough[school.district]}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="school-page-hero">
            <div className="school-page-hero-inner">
              <div className="school-page-hero-left">
                <div className="school-page-map-wrap">
                  <Map
                    filteredSchools={[school]}
                    center={[school.latitude, school.longitude]}
                  />
                </div>
                <p className="school-page-address">
                  <MapPinCheckIcon size={18} />
                  {school.address}
                </p>
                <ul className="school-page-key-details grid grid-cols-4 lg:grid-cols-4">
                  <li>
                    <Phone size={14} />
                    Phone: {school.phone || "Not provided"}
                  </li>
                  <li>
                    <Mail size={14} />
                    Email: {school.email || "Not provided"}
                  </li>
                  <li>
                    <Globe size={14} />
                    Website: {school.website || "Not provided"}
                  </li>
                  <li>
                    <UserRound size={14} />
                    Principal: {school.principal || "Not provided"}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Tabs style={{ margin: "0 1.5rem" }}>
            <TabList>
              <Tab>Overall</Tab>
              <Tab>Academic</Tab>
              <Tab>Student and Parents</Tab>
            </TabList>

            <TabPanel>
              <OverallSnapshot school={school} district={district} />
              <ScoreExplanation />
              <ComponentScore school={school} />
              <SchoolEnrollmentDetail school={school} />
              <AdmissionDemand admissionData={admission} />
              <CheckoutOtherSchool district={district} schools={schools} />
            </TabPanel>

            <TabPanel>
              <AcademicPerformance school={school} district={district} />
              <SpecialPrograms school={school} />
              <HighSchoolOutcome school={school} />
              <HistoricalTrends
                historicalData={schoolsTrends[dbn]?.historicalData}
              />
            </TabPanel>

            <TabPanel>
              <PTAFundraising school={school} />
              <StudentDemographic school={school} district={district} />
              <SchoolSurvey school={school} district={district} />
            </TabPanel>
          </Tabs>

          <div className="flex flex-col items-center text-sm text-muted">
            <div>
              Data from NYC Department of Education School Survey and public
              records.
            </div>
            <div>
              Test scores and demographics: 2021-22 to 2022-23 |
              Climate/Progress: 2023-2024
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SchoolPage;
