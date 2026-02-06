import "./HighSchoolOutcome.css";
import "./shared/utilities.css";
import "./shared/colors.css";
import {
  Medal,
  GraduationCap,
  BookOpenCheck,
  FolderKanban,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./shared/Card";

const GraduationRates = ({ grad_rate }) => {
  return (
    <div>
      <h4 className="text-section-header flex items-center gap-2 mb-3">
        <GraduationCap />
        Graduation Rates
      </h4>
      <div className="graduation-grid">
        <div className="stat-box">
          <div className="flex items-center gap-2">
            <div className="indicator-dot-sm bg-green-hb"></div>
            <dt className="font-medium text-sm">
              4-Year Graduation Rate
            </dt>
          </div>
          <dd className="graduation-grid-container-number">{grad_rate}%</dd>
          <p className="graduation-grid-container-description">
            Percentage of students graduating within 4 years of entering high
            school.
          </p>
        </div>
      </div>
    </div>
  );
};

const SATPerformance = ({ school }) => {
  const data = [];
  data.push({ title: "Math", value: school.sat_avg_math });
  data.push({ title: "Reading", value: school.sat_avg_reading });
  data.push({ title: "Total", value: school.sat_avg_total });

  return (
    <div className="sat-performance-container">
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-section-header flex items-center gap-2">
          <BookOpenCheck /> SAT Performance
        </h4>
        <div className="sat-performance-container-header-title-disclaimer-title">
          2012 Data
        </div>
      </div>
      <div className="sat-performance-container-header-title-disclaimer-content">
        <p className="sat-performance-container-header-title-disclaimer-text">
          This SAT data is from 2012 and may not reflect current school
          performance. NYC DOE no longer publishes school-level SAT data.
        </p>
      </div>
      <div className="sat-performance-container-main">
        {data.map((each) => (
          <div className="sat-performance-container-main-content">
            <p className="text-metric text-muted">
              {each.value}
            </p>
            <p className="text-xs text-muted">
              {each.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CollegePreparation = ({ college_readiness_rate, ap_course }) => {
  return (
    <div>
      <h4 className="text-section-header flex items-center gap-2 mb-3">
        <FolderKanban />
        College Preparation
      </h4>
      <div className="graduation-grid">
        <div className="stat-box">
          <div className="flex items-center gap-2">
            <div className="indicator-dot-sm bg-green-hb"></div>
            <dt className="font-medium text-sm">
              College & Career Readiness
            </dt>
          </div>
          <dd className="graduation-grid-container-number">
            {college_readiness_rate}%
          </dd>
          <p className="graduation-grid-container-description">
            Percentage of students meeting NYC's college and career readiness
            benchmarks
          </p>
        </div>
        <div className="stat-box">
          <div className="flex items-center gap-2">
            <div className="indicator-dot-sm bg-green-hb"></div>
            <dt className="font-medium text-sm">
              AP Courses Offered
            </dt>
          </div>
          <dd className="graduation-grid-container-number">{ap_course}</dd>
          <p className="graduation-grid-container-description">
            Number of Advanced Placement courses available for college-level
            study
          </p>
        </div>
      </div>
    </div>
  );
};

const SpecializedSchool = () => {
  return (
    <div className="specialized-hs-container">
      <div className="specialized-hs-container-content">
        <Star />
        <div>
          <p className="specialized-hs-container-text">
            Specialized High School
          </p>
          <p className="specialized-hs-container-explanation">
            This is one of New York City's nine specialized high schools.
            Admission requires passing the Specialized High Schools Admissions
            Test (SHSAT) or meeting audition requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export const HighSchoolOutcome = ({ school }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Medal} className="large">
          High School Outcomes
        </CardTitle>
        <CardDescription>
          Key metrics for evaluating high school success: graduation rates,
          standardized test performance, and college preparation.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <GraduationRates grad_rate={school.graduation_rate_4yr} />
        <SATPerformance school={school} />
        <CollegePreparation
          college_readiness_rate={school.college_readiness_rate}
          ap_course={school.ap_course_count}
        />
        {school.is_specialized_hs && <SpecializedSchool />}
      </CardContent>
    </Card>
  );
};
