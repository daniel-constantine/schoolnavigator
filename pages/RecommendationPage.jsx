import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  MapPin,
  GraduationCap,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import "./RecommendationPage.css";

const TOTAL_STEPS = 4;

const GRADE_OPTIONS = [
  { value: "", label: "Select grade level" },
  { value: "3k", label: "3-K" },
  { value: "prek", label: "Pre-K" },
  { value: "k", label: "Kindergarten" },
  { value: "1-5", label: "Elementary (1-5)" },
  { value: "6-8", label: "Middle School (6-8)" },
  { value: "9-12", label: "High School (9-12)" },
];

const PRIORITIES = [
  { id: "academics", label: "Academic Excellence", icon: TrendingUp },
  { id: "climate", label: "School Climate", icon: Users },
  { id: "diversity", label: "Diversity", icon: Users },
  { id: "distance", label: "Close to Home", icon: MapPin },
  { id: "pta", label: "Strong PTA/Funding", icon: DollarSign },
  { id: "iep", label: "Special Ed Support", icon: GraduationCap },
];

const PROGRAMS = [
  { id: "gt", label: "Gifted & Talented" },
  { id: "dual", label: "Dual Language" },
  { id: "stem", label: "STEM Focus" },
  { id: "arts", label: "Arts Program" },
  { id: "sports", label: "Sports Programs" },
  { id: "afterschool", label: "After-School Care" },
];

const INITIAL_PREFERENCES = {
  location: "",
  gradeLevel: "",
  priorities: [],
  maxDistance: 5,
  minRating: 70,
  programs: [],
  budget: "",
};

const RecommendationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    } else {
      navigate("/", { state: { preferences } });
    }
  }, [step, preferences, navigate]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }, [step]);

  const updatePreference = useCallback((key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  }, []);

  const togglePriority = useCallback((priorityId) => {
    setPreferences((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priorityId)
        ? prev.priorities.filter((p) => p !== priorityId)
        : [...prev.priorities, priorityId],
    }));
  }, []);

  const toggleProgram = useCallback((programId) => {
    setPreferences((prev) => ({
      ...prev,
      programs: prev.programs.includes(programId)
        ? prev.programs.filter((p) => p !== programId)
        : [...prev.programs, programId],
    }));
  }, []);

  return (
    <div className="recommendation-page">
      <div className="recommendation-container">
        <div className="recommendation-header">
          <Sparkles size={48} className="sparkle-icon" />
          <h1>Find Your Perfect School Match</h1>
          <p>
            Answer a few questions to get personalized school recommendations
          </p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
          <p className="step-indicator">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        <div className="recommendation-form">
          {step === 1 && (
            <div className="form-step">
              <h2>Location & Grade Level</h2>
              <p className="step-description">
                Where are you looking and what grade?
              </p>

              <div className="form-group">
                <label>
                  <MapPin size={20} />
                  Your Location (Address or Zip Code)
                </label>
                <input
                  type="text"
                  placeholder="Enter your address or zip code"
                  value={preferences.location}
                  onChange={(e) => updatePreference("location", e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>
                  <GraduationCap size={20} />
                  Grade Level
                </label>
                <select
                  value={preferences.gradeLevel}
                  onChange={(e) =>
                    updatePreference("gradeLevel", e.target.value)
                  }
                  className="form-select"
                >
                  {GRADE_OPTIONS.map((opt) => (
                    <option key={opt.value || "default"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Maximum Distance (miles)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={preferences.maxDistance}
                  onChange={(e) =>
                    updatePreference("maxDistance", e.target.value)
                  }
                  className="form-range"
                />
                <span className="range-value">
                  {preferences.maxDistance} miles
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>What's Most Important to You?</h2>
              <p className="step-description">
                Select your top priorities (choose up to 3)
              </p>

              <div className="priorities-grid">
                {PRIORITIES.map((priority) => {
                  const Icon = priority.icon;
                  const isSelected = preferences.priorities.includes(
                    priority.id
                  );
                  const isDisabled =
                    preferences.priorities.length >= 3 && !isSelected;

                  return (
                    <button
                      key={priority.id}
                      type="button"
                      className={`priority-card ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => togglePriority(priority.id)}
                      disabled={isDisabled}
                    >
                      <Icon size={32} />
                      <span>{priority.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <h2>Special Programs & Features</h2>
              <p className="step-description">
                Any specific programs you're looking for?
              </p>

              <div className="programs-grid">
                {PROGRAMS.map((program) => (
                  <button
                    key={program.id}
                    type="button"
                    className={`program-card ${
                      preferences.programs.includes(program.id)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleProgram(program.id)}
                  >
                    <span>{program.label}</span>
                  </button>
                ))}
              </div>

              <div className="form-group" style={{ marginTop: "2rem" }}>
                <label>Minimum Overall Rating</label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={preferences.minRating}
                  onChange={(e) =>
                    updatePreference("minRating", e.target.value)
                  }
                  className="form-range"
                />
                <span className="range-value">{preferences.minRating}+</span>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <h2>Review Your Preferences</h2>
              <p className="step-description">Here's what you're looking for</p>

              <div className="preferences-summary">
                <div className="summary-item">
                  <strong>Location:</strong>
                  <span>{preferences.location || "Not specified"}</span>
                </div>
                <div className="summary-item">
                  <strong>Grade Level:</strong>
                  <span>{preferences.gradeLevel || "Not specified"}</span>
                </div>
                <div className="summary-item">
                  <strong>Maximum Distance:</strong>
                  <span>{preferences.maxDistance} miles</span>
                </div>
                <div className="summary-item">
                  <strong>Priorities:</strong>
                  <span>
                    {preferences.priorities.length > 0
                      ? preferences.priorities.join(", ")
                      : "None selected"}
                  </span>
                </div>
                <div className="summary-item">
                  <strong>Programs:</strong>
                  <span>
                    {preferences.programs.length > 0
                      ? preferences.programs.join(", ")
                      : "None selected"}
                  </span>
                </div>
                <div className="summary-item">
                  <strong>Minimum Rating:</strong>
                  <span>{preferences.minRating}+</span>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn-secondary"
              >
                Back
              </button>
            )}
            <button type="button" onClick={handleNext} className="btn-primary">
              {step === TOTAL_STEPS ? "Get Recommendations" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationPage;
