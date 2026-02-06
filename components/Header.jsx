import React, { memo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Sparkles, Map, Scale } from "lucide-react";
import "./Header.css";

const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home },
  // {
  //   path: "/recommendation",
  //   label: "Find My Match",
  //   icon: Sparkles,
  //   dataTestId: "recommendation-link",
  // },
  { path: "/map", label: "Map View", icon: Map },
  { path: "/compare", label: "Compare", icon: Scale },
];

const Header = memo(function Header() {
  const location = useLocation();

  const isActive = useCallback(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`),
    [location.pathname],
  );

  return (
    <header className="header" data-testid="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1 className="logo">NYC School Navigator</h1>
        </Link>
        <p className="subtitle">
          Find and compare NYC public, charter, and private schools
        </p>
      </div>

      <div className="header-actions">
        {NAV_LINKS.map(({ path, label, icon: Icon, dataTestId }) => (
          <Link
            key={path}
            to={path}
            className={`header-btn ${isActive(path) ? "active" : ""}`}
            {...(dataTestId ? { "data-testid": dataTestId } : {})}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
});

export default Header;
