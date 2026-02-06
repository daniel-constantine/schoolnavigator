import "./CheckoutOtherSchool.css";
import "./shared/colors.css";
import "./shared/utilities.css";
import { useParams } from "react-router-dom";
import { calculateOverallRating } from "../utils";
import { School } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";

export const CheckoutOtherSchool = ({ district, schools }) => {
  const { dbn } = useParams();

  const filteredSchool = schools.filter((school) => {
    if (school.district === district.district && school.dbn !== dbn) {
      return school;
    }
  });

  const data = filteredSchool.map((school) => {
    return {
      ...school,
      overallRating: calculateOverallRating(school),
    };
  });

  const sortedData = [...data].sort(
    (a, b) => b.overallRating - a.overallRating,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={School} className="large">
          Check Out Other Schools in District {district.district}
        </CardTitle>
      </CardHeader>
      <CardContent className="checkout-other-school-main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sortedData.map((school) => (
            <a
              href={`/school/${school.dbn}`}
              target="_blank"
              className="checkout-other-school-main-container-list-link"
              key={school.dbn}
            >
              <div className="checkout-other-school-main-list-item">
                <div className="checkout-other-school-main-list-item-school-container">
                  <div className="checkout-other-school-main-list-item-name">
                    {school.name}
                  </div>
                  <div className="checkout-other-school-main-list-item-address">
                    <span>{school.dbn}</span>
                    <span>• Grades {school.grade_band} </span>
                  </div>
                </div>
                <div className="checkout-other-school-main-list-item-color-container">
                  <div
                    className={`indicator-dot-lg ${school.overallRating >= 80 ? "bg-green-hb" : school.overallRating >= 70 ? "bg-yellow-hb" : "bg-red-hb"}`}
                  ></div>
                  <span className="tabular-nums font-bold">
                    {school.overallRating || "N/A"}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
