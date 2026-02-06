import {
  School,
  Backpack,
  GraduationCap,
  University,
  Baby,
  Medal,
  Languages,
} from "lucide-react";
import "./StatsBar.css";

const STAT_ITEMS = [
  { key: "total", label: "Total Schools", icon: School },
  { key: "elementary", label: "Elementary", icon: Backpack },
  { key: "middle", label: "Middle", icon: University },
  { key: "highSchool", label: "High School", icon: GraduationCap },
  {
    key: "earlyChildhood",
    label: "3-K/Pre-K",
    icon: Baby,
    getValue: (stats) => stats.has3K + stats.hasPreK,
  },
  { key: "hasGT", label: "G&T", icon: Medal },
  { key: "hasDualLang", label: "Dual Language", icon: Languages },
];

const StatsBar = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="stats-bar" data-testid="stats-bar">
      {STAT_ITEMS.map((item) => {
        const value = item.getValue ? item.getValue(stats) : stats[item.key];
        const Icon = item.icon;

        return (
          <div key={item.key} className="stat-item">
            {Icon && <Icon size={16} />}
            <span>
              <strong>{value}</strong> {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatsBar;
