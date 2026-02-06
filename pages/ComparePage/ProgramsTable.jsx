import React, { memo } from "react";

const PROGRAM_ROWS = [
  { key: "has_prek", label: "Pre-K" },
  { key: "has_3k", label: "3-K" },
  { key: "has_gifted_talented", label: "Gifted & Talented" },
  {
    key: "has_dual_language",
    label: "Dual Language",
    format: (school) =>
      school.has_dual_language
        ? `✓ (${school.dual_language_languages?.join(", ") ?? ""})`
        : "—",
  },
];

const ProgramsTable = ({ selectedSchools }) => {
  if (selectedSchools.length === 0) {
    return (
      <div
        className="comparison-table comparison-programs"
        data-testid="programs-table"
      >
        <h3>Programs & Features</h3>
        <p>No schools selected</p>
      </div>
    );
  }

  return (
    <div
      className="comparison-table comparison-programs"
      data-testid="programs-table"
    >
      <h3>Programs & Features</h3>
      <table>
        <thead>
          <tr>
            <th>Program</th>
            {selectedSchools.map((school) => (
              <th key={school.dbn}>{school.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PROGRAM_ROWS.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              {selectedSchools.map((school) => (
                <td key={school.dbn}>
                  {row.format
                    ? row.format(school)
                    : school[row.key]
                      ? "✓"
                      : "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsTable;
