import {
  calculateOverallRating,
  getDifferenceText,
  getDifferenceColor,
} from "../utils";
import "./OverallSnapshot.css";
import "./shared/colors.css";
import "./shared/utilities.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./shared/Card";

const getConclusionText = (score) => {
  if (!score) {
    return "N/A";
  }

  if (score >= 80) {
    return "Outstanding";
  } else if (score >= 70) {
    return "Strong";
  }

  return "Needs work";
};

const getScoreColor = (score) => {
  if (score === "N/A") {
    return "gray-hb";
  }

  if (score >= 80) {
    return "green-hb";
  } else if (score >= 70) {
    return "yellow-hb";
  }

  return "red-hb";
};

const Snapshot = ({ title, score, average }) => {
  const difScoreAvg = getDifferenceText(score, average);
  const difScoreColor = getDifferenceColor(difScoreAvg);
  const scoreColor = getScoreColor(score);
  const conclusionText = getConclusionText(score);

  return (
    <div className="border rounded-lg p-4">
      <div className="snapshot-container-title">
        <span className="text-primary font-medium text-sm">{title}</span>
        <div
          className={`indicator-dot ${scoreColor}`}
        ></div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-metric-xl ${scoreColor}`}>{score}</span>
        <span className={`font-medium text-sm ${difScoreColor}`}>
          {difScoreAvg}
        </span>
      </div>
      <div className="text-description mt-1">District average: {average}</div>
      <div className="text-description mt-1">{conclusionText}</div>
    </div>
  );
};

const extractSchoolDistrict = (school, district) => {
  const result = [];

  result.push({
    title: "Overall",
    score: calculateOverallRating(school) || "N/A",
    average: Math.round(district.overallScore),
  });

  result.push({
    title: "Academics",
    score: school.academics_score,
    average: Math.round(district.academicsScore),
  });

  result.push({
    title: "Climate",
    score: school.climate_score,
    average: Math.round(district.climateScore),
  });

  result.push({
    title: "Progress",
    score: school.progress_score,
    average: Math.round(district.progressScore),
  });
  return result;
};

export const OverallSnapshot = ({ school, district }) => {
  const data = extractSchoolDistrict(school, district);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overall Snapshot</CardTitle>
        <CardDescription>Performance across key metrics</CardDescription>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted overall-snapshot-container-score-container">
          <div className="flex items-center gap-1">
            <div className="indicator-dot color-dot-green"></div>
            <span>80+ Outstanding</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="indicator-dot color-dot-yellow"></div>
            <span>70-79 Strong</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="indicator-dot color-dot-red"></div>
            <span>{"<70 Needs Work"}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="indicator-dot color-dot-gray"></div>
            <span>N/A insuficient data</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overall-snapshot-container-main">
        <div className="grid gap-4 lg:grid-cols-4 ">
          {data.map((each) => (
            <Snapshot
              title={each.title}
              score={each.score}
              average={each.average}
            ></Snapshot>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
