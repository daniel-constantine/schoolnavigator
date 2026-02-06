import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { History, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";
import "./HistoricalTrends.css";
import "./shared/utilities.css";

const ELA_COLOR = "#6366f1";
const MATH_COLOR = "#10b981";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="historical-trends-tooltip">
      <p className="historical-trends-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
};

export const HistoricalTrends = ({ historicalData }) => {
  const chartData = useMemo(() => {
    if (!historicalData?.length) return [];
    return [...historicalData]
      .sort((a, b) => a.year - b.year)
      .map((d) => ({
        year: d.year,
        "ELA Proficiency": d.ela_proficiency,
        "Math Proficiency": d.math_proficiency,
      }));
  }, [historicalData]);

  const years = useMemo(() => chartData.map((d) => d.year), [chartData]);

  if (!chartData.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={History} className="large">
          Historical Trends
        </CardTitle>
        <p className="text-description mt-1">
          ELA, Math proficiency trends from NYS standardized tests over{" "}
          {years.length} years.
        </p>
      </CardHeader>
      <CardContent>
        <div className="historical-trends-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis
                dataKey="year"
                stroke="hsl(215 20% 65%)"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(215 20% 65%)"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="ELA Proficiency"
                stroke={ELA_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey="Math Proficiency"
                stroke={MATH_COLOR}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="historical-trends-table-section">
          <div className="historical-trends-table-container">
            <table className="historical-trends-table">
              <thead>
                <tr className="historical-trends-table-header-row ">
                  <th className="historical-trends-table-subject-header">
                    Subject
                  </th>
                  {years.map((year) => (
                    <th
                      key={year}
                      className="historical-trends-table-year-header"
                    >
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="historical-trends-table-row">
                  <td className="historical-trends-table-subject-cell text-mute">
                    <span
                      className="indicator-dot-sm"
                      style={{
                        backgroundColor: ELA_COLOR,
                        display: "inline-block",
                      }}
                    />
                    ELA
                  </td>
                  {chartData.map((d) => (
                    <td
                      key={d.year}
                      className="historical-trends-table-value-cell text-muted"
                    >
                      <span className="font-semibold">
                        {d["ELA Proficiency"] != null
                          ? `${d["ELA Proficiency"]}%`
                          : "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr className="historical-trends-table-row">
                  <td className="historical-trends-table-subject-cell text-muted">
                    <span
                      className="indicator-dot-sm"
                      style={{
                        backgroundColor: MATH_COLOR,
                        display: "inline-block",
                      }}
                    />
                    Math
                  </td>
                  {chartData.map((d) => (
                    <td
                      key={d.year}
                      className="historical-trends-table-value-cell text-muted"
                    >
                      <span className="font-semibold">
                        {d["Math Proficiency"] != null
                          ? `${d["Math Proficiency"]}%`
                          : "N/A"}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted mt-4">
            Note: 2020-2021 data unavailable due to COVID-19 testing
            cancellations. Trend calculated by comparing earliest and most
            recent available years (2018-2025).
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
