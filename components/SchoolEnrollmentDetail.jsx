import { Users } from "lucide-react";
import "./SchoolEnrollmentDetail.css";
import "./shared/utilities.css";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";

export const SchoolEnrollmentDetail = ({ school }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Users} className="large">
          School Details
        </CardTitle>
      </CardHeader>
      <CardContent className="school-enrollment-detail-main-container">
        <dl className="school-enrollment-detail-main-container-description">
          <div>
            <dt className="text-muted text-sm">
              Total Enrollment
            </dt>
            <dd className="font-semibold text-lg">
              {school.enrollment}
            </dd>
            <div className="mt-2 text-sm">
              {school.elementary_enrollment && (
                <div className="flex justify-between">
                  <span className="text-muted">
                    K-5 (Elementary)
                  </span>
                  <span className="font-medium tabular-nums">
                    {school.elementary_enrollment}
                  </span>
                </div>
              )}

              {school.middle_enrollment && (
                <div className="flex justify-between">
                  <span className="text-muted">
                    Grade 6-8 (Middle School)
                  </span>
                  <span className="font-medium tabular-nums">
                    {school.middle_enrollment}
                  </span>
                </div>
              )}

              {school.high_school_enrollment && (
                <div className="flex justify-between">
                  <span className="text-muted">
                    Grade 9-12 (High School)
                  </span>
                  <span className="font-medium tabular-nums">
                    {school.high_school_enrollment}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <dt className="text-muted text-sm">
              Grade Span
            </dt>
            <dd className="font-semibold text-lg">
              {school.grade_band}
            </dd>
          </div>
          <div>
            <dt className="text-muted text-sm">
              Student-Teacher Ration
            </dt>
            <dd className="font-semibold text-lg">
              {school.student_teacher_ratio}:1
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};
