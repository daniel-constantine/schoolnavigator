import SCHOOLS_LIST_DATA from "./data/schools.json";
import SCHOOLS_TRENDS_DATA from "./data/schools-trends.json";
import DISTRICT_AVERAGE_DATA from "./data/district-average.json";
import DISTRICT_ADMISSION_HISTORY from "./data/admission-history.json";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const fetchSchools = async () => {
  return SCHOOLS_LIST_DATA;

  const response = await fetch(`${API_BASE_URL}/schools`);

  if (!response.ok) {
    throw new Error(`Failed to fetch schools data`);
  }

  return await response.json();
};

export const fetchSchoolsTrends = async () => {
  return SCHOOLS_TRENDS_DATA;

  const response = await fetch(`${API_BASE_URL}/schools-trends`);

  if (!response.ok) {
    throw new Error(`Failed to fetch trends data`);
  }

  return await response.json();
};

export const fetchDistrictAverage = async () => {
  return DISTRICT_AVERAGE_DATA;

  const response = await fetch(`${API_BASE_URL}/district-average`);

  if (!response.ok) {
    throw new Error(`Failed to fetch district average`);
  }

  return await response.json();
};

export const fetchAdmissionHistory = async () => {
  return DISTRICT_ADMISSION_HISTORY;

  const response = await fetch(`${API_BASE_URL}/admission-history`);

  if (!response.ok) {
    throw new Error(`Failed to fetch admission history`);
  }

  return await response.json();
};
