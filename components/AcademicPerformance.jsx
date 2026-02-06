import "./AcademicPerformance.css";
import "./shared/utilities.css";
import { getDifferenceText, getDifferenceColor } from "../utils";
import { TrendingUp, BookCheck, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";

const AcademicPerformanceCard = ({ title, value, trending, text }) => {
  const trendingColor = getDifferenceColor(trending);

  return (
    <div className="stat-box">
      <dt className="font-medium text-sm">
        {title}
      </dt>
      <div className="flex items-center gap-2">
        <dd className="text-metric">
          {value}
        </dd>
        <span className="academic-performance-parent-container-main-grid-container-main-trending">
          {trendingColor === "green-hb" && <TrendingUp size={14} />}
          {trendingColor === "red-hb" && <TrendingDown size={14} />}
          <span>{trending !== "N/A" && trending}</span>
        </span>
      </div>
      <p className="academic-performance-parent-container-main-grid-container-main-description">
        {text}
      </p>
    </div>
  );
};

const getTableHeader = (school) => {
  const array = [];
  if (school.ela_grade3 !== null || school.math_grade3 != null)
    array.push("Grade 3");
  if (school.ela_grade4 !== null || school.math_grade4 != null)
    array.push("Grade 4");
  if (school.ela_grade5 !== null || school.math_grade5 != null)
    array.push("Grade 5");
  if (school.ela_grade6 !== null || school.math_grade6 != null)
    array.push("Grade 6");
  if (school.ela_grade7 !== null || school.math_grade7 != null)
    array.push("Grade 7");
  if (school.ela_grade8 !== null || school.math_grade8 != null)
    array.push("Grade 8");
  return array;
};

const getEla = (school) => {
  const array = [];
  if (school.ela_grade3 !== null) array.push(school.ela_grade3);
  if (school.ela_grade4 !== null) array.push(school.ela_grade4);
  if (school.ela_grade5 !== null) array.push(school.ela_grade5);
  if (school.ela_grade6 !== null) array.push(school.ela_grade6);
  if (school.ela_grade7 !== null) array.push(school.ela_grade7);
  if (school.ela_grade8 !== null) array.push(school.ela_grade8);
  return array;
};

const getMath = (school) => {
  const array = [];
  if (school.math_grade3 !== null) array.push(school.math_grade3);
  if (school.math_grade4 !== null) array.push(school.math_grade4);
  if (school.math_grade5 !== null) array.push(school.math_grade5);
  if (school.math_grade6 !== null) array.push(school.math_grade6);
  if (school.math_grade7 !== null) array.push(school.math_grade7);
  if (school.math_grade8 !== null) array.push(school.math_grade8);
  return array;
};

const AcademicScoreGrade = ({ school }) => {
  const tableHeaderData = getTableHeader(school);
  const elaData = getEla(school);
  const mathData = getMath(school);
  return (
    <div className="academic-performance-parent-container-secondary-grid-table-container">
      <table className="academic-performance-parent-container-secondary-grid-table">
        <thead>
          <tr className="academic-performance-parent-container-secondary-grid-table-row">
            <th className="academic-performance-parent-container-secondary-grid-table-row-subject">
              Subject
            </th>
            {tableHeaderData.map((each) => (
              <th className="academic-performance-parent-container-secondary-grid-table-row-subject-column">
                {each}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="academic-performance-parent-container-secondary-grid-table-row">
            <td className="academic-performance-parent-container-secondary-grid-table-row-subject-value">
              ELA
            </td>
            {elaData.map((each) => (
              <td className="academic-performance-parent-container-secondary-grid-table-row-value">
                <span className="font-semibold">
                  {each}%
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td>Math</td>

            {mathData.map((each) => (
              <td className="academic-performance-parent-container-secondary-grid-table-row-value">
                <span className="font-semibold">
                  {each}%
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const getPerformanceCard = (school, district) => {
  const result = [];
  result.push({
    title: "ELA Proficiency",
    value: school.ela_proficiency || "N/A",
    trending: getDifferenceText(
      school.ela_proficiency,
      district.elaProficiency,
    ),
    text: "Percentage of students who met or exceeded New York State standards on the English Language Arts exam. This measures reading, writing, andcomprehension skills.",
  });

  result.push({
    title: "Math Proficiency",
    value: school.math_proficiency || "N/A",
    trending: getDifferenceText(
      school.math_proficiency,
      district.mathProficiency,
    ),
    text: "Percentage of students who met or exceeded New York State standards on the Math exam. This measures mathematical reasoning and problem-solving abilities.",
  });

  result.push({
    title: "Science Proficiency",
    value: school.science_proficiency || "N/A",
    trending: "N/A",
    text: "Percentage of students who met or exceeded New York State standards on the Science exam (administered in grades 5 and 8). This measures scientific inquiry, reasoning, and understanding of core concepts.",
  });

  return result;
};

export const AcademicPerformance = ({ school, district }) => {
  const dataPerformanceCard = getPerformanceCard(school, district);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle icon={BookCheck} className="large">
            Academic Performance
          </CardTitle>
          <span className="text-xs text-muted">
            {school.assessment_year} | {school.assessment_source}
          </span>
        </div>
      </CardHeader>
      <CardContent className="academic-performance-parent-container-main">
        <div className="academic-performance-parent-container-main-grid">
          {dataPerformanceCard.map((each) => (
            <AcademicPerformanceCard
              title={each.title}
              value={each.value}
              trending={each.trending}
              text={each.text}
            />
          ))}
        </div>
        <div className="academic-performance-parent-container-secondary-grid">
          <div className="mb-4">
            <h4 className="text-section-header text-muted mb-1">
              Scores by Grade
            </h4>
            <p className="text-description">
              Percentage of students scoring proficient (Level 3+4) on state
              tests in each grade. Data from NYC DOE.
            </p>
          </div>
        </div>
        <AcademicScoreGrade school={school} />
      </CardContent>
    </Card>
  );
};
