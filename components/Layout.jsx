import { useState, useEffect, useCallback, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Tooltip } from "react-tooltip";
import {
  fetchDistrictAverage,
  fetchSchools,
  fetchSchoolsTrends,
  fetchAdmissionHistory,
} from "../api";
import { clearFilterCaches } from "../filterUtils";
import "./Layout.css";

const TOOLTIP_STYLE = { maxWidth: "300px" };

const TOOLTIP_IDS = [
  "overall-tooltip",
  "ela-tooltip",
  "math-tooltip",
  "science-tooltip",
  "graduation-tooltip",
  "college-readiness-tooltip",
  "ap-tooltip",
  "sat-tooltip",
  "eni-tooltip",
];

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schools, setSchools] = useState([]);
  const [schoolsTrends, setSchoolsTrends] = useState({});
  const [districtAverage, setDistrictAverage] = useState([]);
  const [admissionHistory, setAdmissionHistory] = useState({});

  const loadSchools = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSchools();
      setSchools(data);
      clearFilterCaches();
    } catch (err) {
      setError(err.message);
      console.error("Error fetching schools:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTrends = useCallback(async () => {
    try {
      const data = await fetchSchoolsTrends();
      setSchoolsTrends(data);
    } catch (err) {
      console.warn("Error fetching trends:", err);
    }
  }, []);

  const loadDistrictAverage = useCallback(async () => {
    try {
      const data = await fetchDistrictAverage();
      setDistrictAverage(data);
    } catch (err) {
      console.warn("Error fetching district average:", err);
    }
  }, []);

  const loadAdmissionHistory = useCallback(async () => {
    try {
      const data = await fetchAdmissionHistory();
      setAdmissionHistory(data);
    } catch (err) {
      console.warn("Error fetching admission history:", err);
    }
  }, []);

  useEffect(() => {
    loadSchools();
    loadTrends();
    loadDistrictAverage();
    loadAdmissionHistory();
  }, [loadSchools, loadTrends, loadDistrictAverage, loadAdmissionHistory]);

  const outletContext = useMemo(
    () => ({
      loading,
      error,
      schools,
      schoolsTrends,
      districtAverage,
      admissionHistory,
    }),
    [loading, error, schools, schoolsTrends, districtAverage, admissionHistory],
  );

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <Outlet context={outletContext} />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2026 NYC School Navigator. All rights reserved.</p>

          <div className="footer-links">
            <p>Data from NYC Department of Education</p>
          </div>
        </div>
      </footer>

      {TOOLTIP_IDS.map((id) => (
        <Tooltip key={id} id={id} style={TOOLTIP_STYLE} />
      ))}
      <Tooltip
        id="pta-fundraising-tooltip"
        style={TOOLTIP_STYLE}
        render={({ content, activeAnchor }) => (
          <div>
            <h3>{content}</h3>
            <p>{activeAnchor?.getAttribute("data-tooltip-total") || "N/A"}</p>
            <p style={{ fontSize: "12px" }}>
              Source: NYC DOE Local Law 171 Report
            </p>
          </div>
        )}
      />
    </div>
  );
};

export default Layout;
