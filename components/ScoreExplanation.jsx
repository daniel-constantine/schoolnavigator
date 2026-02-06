import "./ScoreExplanation.css";
import "./shared/utilities.css";
import { Calculator } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";

export const ScoreExplanation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Calculator}>How We Calculate Scores</CardTitle>
      </CardHeader>
      <CardContent className="score-explanation-main">
        <p className="text-sm gray-hb">
          Our Overall Score provides a transparent, data-driven metric combining
          test proficiency with NYC DOE quality indicators.
        </p>
        <div className="bg-muted border rounded-lg p-4 my-4">
          <div className="text-sm font-medium mb-3">Overall Score Formula:</div>
          <div className="score-explanation-main-formula-container-explanation">
            <span className="score-explanation-main-formula-container-explanation-overall">
              Overall Score
            </span>
            <span>= </span>
            <span className="score-explanation-main-formula-container-explanation-test">
              Test Proficiency (40%)
            </span>
            <span>+</span>{" "}
            <span className="score-explanation-main-formula-container-explanation-climate">
              Climate (30%)
            </span>
            <span>+</span>
            <span className="score-explanation-main-formula-container-explanation-progress">
              Progress (30%)
            </span>
          </div>
        </div>

        <div className="score-explanation-main-detail-container">
          <div className="score-explanation-main-detail-container-test">
            <p className="font-medium text-sm">
              Test Proficiency (40% weight)
            </p>
            <p className="score-explanation-main-detail-container-content">
              Average of ELA and Math proficiency percentages from NYS grades
              3-8 standardized tests. Represents the percentage of students
              meeting or exceeding state standards
            </p>
            <p className="score-explanation-main-detail-container-content">
              If ELA and Math proficiency data doesn't exist, we're using
              graduation rate percentage and college readiness percentage.
            </p>
            <p className="score-explanation-main-detail-container-content-secondary">
              Note: This differs from the "Academics" subscore shown below,
              which is a separate NYC DOE quality metric.
            </p>
          </div>

          <div className="score-explanation-main-detail-container-progress">
            <p className="font-medium text-sm">
              Progress Score (30% weight)
            </p>
            <p className="score-explanation-main-detail-container-content">
              NYC DOE metric tracking year-over-year student academic growth.
              Measures how effectively schools help students advance, regardless
              of starting point..
            </p>
          </div>

          <div className="score-explanation-main-detail-container-climate">
            <p className="font-medium text-sm">
              Climate Score (30% weight)
            </p>
            <p className="score-explanation-main-detail-container-content">
              NYC DOE metric measuring school environment via the NYC School
              Survey (students, teachers, parents). Includes rigorous
              instruction, collaborative teachers, supportive environment, and
              trust.
            </p>
          </div>

          <div className="score-explanation-main-detail-container-data-source">
            <p> Data Sources: </p>
            <ul>
              <li>
                ELA/Math proficiency: NYC Open Data (grades 3-8 state test
                results)
              </li>
              <li>
                Climate/Progress scores: NYC Department of Education School
                Survey and Quality Reports
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
