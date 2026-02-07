import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/log-section.css";
import LogDisplay from "../display/LogDisplay";

const LOG_CATEGORIES = {
  worker: { label: "Workers", color: "worker" },
  combat: { label: "Combat", color: "combat" },
  movement: { label: "Movement", color: "movement" },
  default: { label: "Default", color: "default" },
};

const LogSection = () => {
  const logs = useSelector((state) => state.logs);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    worker: true,
    combat: true,
    movement: true,
    default: true,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilter && !event.target.closest(".log-filter-container")) {
        setShowFilter(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showFilter]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filteredLogs = logs.filter(
    (log) => selectedCategories[log.category || "default"],
  );

  return (
    <section className="log-section">
      <div className="log-section-header">
        <h2>Log</h2>
        <div className="log-filter-container">
          <button
            className="log-filter-toggle"
            onClick={() => setShowFilter(!showFilter)}
            title="Filter logs"
          >
            ≡
          </button>

          {showFilter && (
            <div className="log-filter-dropdown">
              <div className="log-filter-header">Show Categories</div>
              {Object.entries(LOG_CATEGORIES).map(([key, category]) => (
                <label key={key} className="log-filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories[key]}
                    onChange={() => toggleCategory(key)}
                  />
                  <span
                    className={`log-filter-color-indicator log-entry-${category.color}`}
                  ></span>
                  {category.label}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <LogDisplay filteredLogs={filteredLogs} />
    </section>
  );
};

export default LogSection;
