import { SORT_OPTIONS } from "../constants";
import "./SortTabs.css";

const SortTabs = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort-tabs">
      <span className="sort-label">Sort:</span>

      {SORT_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`sort-tab ${sortBy === option.value ? "active" : ""}`}
          onClick={() => setSortBy(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortTabs;
