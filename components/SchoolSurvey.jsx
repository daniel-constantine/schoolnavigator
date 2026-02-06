import "./SchoolSurvey.css";
import "./shared/utilities.css";
import { getDifferenceText, getDifferenceColor } from "../utils";
import { TrendingUp, TrendingDown, ClipboardList } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./shared/Card";

const studentFields = [
  {
    key: "student_safety",
    label: "Safety",
    districtKey: "studentSafety",
  },
  {
    key: "student_teacher_trust",
    label: "Teacher Trust",
    districtKey: "studentTeacherTrust",
  },
  {
    key: "student_engagement",
    label: "Engagement",
    districtKey: "studentEngagement",
  },
];

const teacherFields = [
  {
    key: "teacher_quality",
    label: "Quality",
    districtKey: "teacherQuality",
  },
  {
    key: "teacher_collaboration",
    label: "Collaboration",
    districtKey: "teacherCollaboration",
  },
  {
    key: "teacher_leadership",
    label: "Leadership",
    districtKey: "teacherLeadership",
  },
];

const guardianFields = [
  {
    key: "guardian_satisfaction",
    label: "Satisfaction",
    districtKey: "guardianSatisfaction",
  },
  {
    key: "guardian_communication",
    label: "Communication",
    districtKey: "guardianCommunication",
  },
  {
    key: "guardian_school_trust",
    label: "School Trust",
    districtKey: "guardianSchoolTrust",
  },
];

const SurveyRow = ({ label, value, districtAvg }) => {
  const displayValue = value != null ? `${value}%` : "N/A";
  const trending = value != null ? getDifferenceText(value, districtAvg) : "";
  const trendingColor = trending ? getDifferenceColor(trending) : "";

  return (
    <div className="school-survey-row ">
      <span className="school-survey-label">{label}</span>
      <div className="school-survey-right">
        <span className="school-survey-value">{displayValue}</span>
        <span className="school-survey-trending">
          {trendingColor === "green-hb" && <TrendingUp size={14} />}
          {trendingColor === "red-hb" && <TrendingDown size={14} />}
          <span className={trendingColor}>{trending}</span>
        </span>
      </div>
    </div>
  );
};

const SurveySection = ({ title, description, fields, school, district }) => (
  <div className="school-survey-section">
    <h3 className="school-survey-section-title">{title}</h3>
    <p className="text-xs text-muted mb-2">{description}</p>
    {fields.map((field) => (
      <SurveyRow
        key={field.key}
        label={field.label}
        value={school[field.key]}
        districtAvg={district[field.districtKey]}
      />
    ))}
  </div>
);

export const SchoolSurvey = ({ school, district }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={ClipboardList} className="large">
          NYC School Survey Results
        </CardTitle>
        <CardDescription>
          Annual survey responses from students, teachers, and parents about
          school quality and culture.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SurveySection
          title="Student Responses"
          description="Students' views on safety, teacher trust, and engagement."
          fields={studentFields}
          school={school}
          district={district}
        />
        <SurveySection
          title="Teacher Perspective"
          description="Teachers' views on instruction quality, professional development, and school leadership"
          fields={teacherFields}
          school={school}
          district={district}
        />
        <SurveySection
          title="Guardian Feedback"
          description="How parents/guardians rate their overall satisfaction with the school"
          fields={guardianFields}
          school={school}
          district={district}
        />
      </CardContent>
    </Card>
  );
};
