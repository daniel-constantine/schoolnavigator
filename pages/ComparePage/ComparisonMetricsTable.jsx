import React, { memo, useCallback } from "react";

function getBestValue(metric, schools) {
  const values = schools
    .map((school) => {
      if (metric.calculate) {
        return metric.calculate(school);
      }
      return school[metric.key];
    })
    .filter((v) => v !== null && v !== undefined);

  if (values.length === 0) return null;
  if (
    metric.key === "student_teacher_ratio" ||
    metric.key === "economic_need_index"
  ) {
    return Math.min(...values);
  }
  return Math.max(...values);
}

const ComparisonMetricsTable = ({ selectedSchools, comparisonMetrics }) => {
  return (
    <div className="comparison-table" data-testid="comparison-metrics-table">
      <h2>Detailed Metrics</h2>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            {selectedSchools.map((school) => (
              <th key={school.dbn}>{school.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonMetrics.map((metric) => {
            const bestValue = getBestValue(metric, selectedSchools);
            return (
              <tr key={metric.key}>
                <td className="metric-label">{metric.label}</td>
                {selectedSchools.map((school) => {
                  const value = metric.calculate
                    ? metric.calculate(school)
                    : school[metric.key];
                  const displayValue = metric.format
                    ? metric.format(value)
                    : (value ?? "N/A");
                  const isBest =
                    value !== null &&
                    value !== undefined &&
                    value === bestValue;

                  return (
                    <td
                      key={school.dbn}
                      className={`row-center ${isBest ? "best-value" : ""}`}
                    >
                      {displayValue}
                      {isBest && value !== "N/A" && (
                        <span className="best-indicator">★</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonMetricsTable;
