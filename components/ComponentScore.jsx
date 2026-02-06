import "./ComponentScore.css";
import "./shared/utilities.css";
import { Card, CardContent } from "./shared/Card";

const ScoreCard = ({ title, value, text }) => {
  return (
    <Card className="score-card-container">
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            {title}
          </span>
          <span className="text-metric">
            {value}
          </span>
        </div>
        <div className="score-card-container-progress-bar-background">
          <div
            className="score-card-container-progress-bar-value"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="score-card-container-text">{text}</p>
      </CardContent>
    </Card>
  );
};

export const ComponentScore = ({ school }) => {
  const data = [];

  data.push({
    title: "Academics",
    value: Number(school.academics_score),
    text: "Measures student proficiency in English Language Arts (ELA) and Math based on NYS standardized test results. Higher scores indicate more students meeting state standards.",
  });

  data.push({
    title: "Climate",
    value: Number(school.climate_score),
    text: "Reflects school safety, family engagement, and student support. Based on feedback from students, teachers, and parents about the school environment.",
  });

  data.push({
    title: "Progress",
    value: Number(school.progress_score),
    text: "Tracks student growth and improvement over time. Shows how effectively the school helps students advance academically.",
  });

  return (
    <section className="component-score-container">
      {data.map((each) => (
        <ScoreCard title={each.title} value={each.value} text={each.text} />
      ))}
    </section>
  );
};
