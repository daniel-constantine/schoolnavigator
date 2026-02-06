import "./PTAFundraising.css";
import "./shared/utilities.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./shared/Card";
import { CircleDollarSign } from "lucide-react";

export const PTAFundraising = ({ school }) => {
  const total = school.pta_fundraising_total
    ? `$${Number(school.pta_fundraising_total).toLocaleString("en-US")}`
    : "N/A";

  const perStudent = school.pta_per_student
    ? `$${Number(school.pta_per_student).toLocaleString("en-US")}`
    : "N/A";

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={CircleDollarSign} className="large">
          PTA Fundraising
        </CardTitle>
        <CardDescription>
          {`Self-reported PTA/PA income for the  ${school.pta_fundraising_year} school year`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pta-fundraising-columns">
          <div className="pta-fundraising-stat">
            <div className="pta-fundraising-value green-hb">{total}</div>
            <div className="pta-fundraising-label">Total raised</div>
          </div>
          <div className="pta-fundraising-stat">
            <div className="pta-fundraising-value green-hb">{perStudent}</div>
            <div className="pta-fundraising-label">Per student</div>
          </div>
        </div>
        <div className="pta-fundraising-source">
          {`Source: NYC DOE Local Law 171 Report. Self-reported PTA/PA income data
          for the ${school.pta_fundraising_year} school year.`}
        </div>
      </CardContent>
    </Card>
  );
};
