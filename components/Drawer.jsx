import { Link } from "react-router-dom";
import { MAX_SCHOOLS_FOR_COMPARISON } from "../constants";
import "./Drawer.css";

const Drawer = ({ selectedSchool, onRemove, onClear }) => {
  if (selectedSchool.length === 0) return null;

  const url = `/compare?schools=${selectedSchool.map((s) => s.dbn).join(",")}`;

  return (
    <div className="compare-drawer" data-testid="drawer">
      <div className="drawer-left">
        <span>
          Compare ({selectedSchool.length}/{MAX_SCHOOLS_FOR_COMPARISON})
        </span>

        {selectedSchool.map((s) => (
          <span key={s.dbn} className="chip">
            {s.name}
            <button
              type="button"
              onClick={() => onRemove(s)}
              aria-label={`Remove ${s.name} from comparison`}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="drawer-right">
        <button type="button" onClick={onClear}>
          Clear All
        </button>

        <button type="button" className="primary">
          <Link to={url} className="link">
            Compare schools
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Drawer;
