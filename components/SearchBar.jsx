import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search schools..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search schools"
      />
    </div>
  );
};

export default SearchBar;
