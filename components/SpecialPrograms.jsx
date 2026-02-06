import "./SpecialPrograms.css";
import "./shared/utilities.css";
import { Card, CardHeader, CardTitle, CardContent } from "./shared/Card";
import { Sparkles } from "lucide-react";

export const SpecialPrograms = ({ school }) => {
  const hasDualLanguage = school.has_dual_language;
  const hasGT = school.has_gifted_talented;

  if (!hasDualLanguage && !hasGT) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Sparkles} className="large">
          Special Programs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="special-programs-section">
          {hasDualLanguage && (
            <div className="special-programs-program">
              <span className="special-programs-badge dual-language">
                Dual Language Program
              </span>
              {school.dual_language_languages?.length > 0 && (
                <>
                  <span className="text-sm text-muted">Languages offered:</span>
                  <div className="flex flex-wrap gap-2">
                    {school.dual_language_languages.map((lang) => (
                      <span
                        key={lang}
                        className="special-programs-language-tag"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </>
              )}
              <p className="special-programs-description">
                Students learn academic content in two languages, developing
                bilingual and biliterate skills.
              </p>
            </div>
          )}
          {hasGT && (
            <div className="special-programs-program">
              <span className="special-programs-badge gifted-talented">
                {school.gt_program_type
                  ? `${school.gt_program_type.replace(/^\s*\w/, (c) => c.toUpperCase())} G&T Program`
                  : "Gifted & Talented Program"}
              </span>
              <p className="special-programs-description">
                {school.gt_program_type === "district"
                  ? "District program serving academically advanced students within the district."
                  : school.gt_program_type === "citywide"
                    ? "Citywide program open to academically advanced students across New York City."
                    : "Program designed for academically advanced students."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
