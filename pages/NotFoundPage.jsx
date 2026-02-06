import React, { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NOT_FOUND_LINKS = [
  { to: "/", label: "Browse Schools" },
  { to: "/recommendation", label: "Get Recommendations" },
  { to: "/map", label: "Map View" },
  { to: "/compare", label: "Compare Schools" },
];

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>

        <div className="not-found-actions">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <button
            type="button"
            onClick={handleGoBack}
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>

        <div className="not-found-links">
          <p>You might be interested in:</p>
          <ul>
            {NOT_FOUND_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
