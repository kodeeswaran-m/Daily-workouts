import { useState, useRef, useEffect } from "react";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../../styles/FilterDropdown.css";
const FilterDropdown = ({
  activeDepartments,
  filterStatus,
  setFilterStatus,
  filterDepartment,
  setFilterDepartment,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null); // "status" | "department" | null
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilter(false);
        setActiveSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function handleStatusFilterClick(status) {
    setFilterStatus(status === "All" ? "" : status.toLowerCase());
    setShowFilter(false);
  }
  function handleDepartmentFilterClick(deptName="") {
    setFilterDepartment(deptName);
    setShowFilter(false);
  }
  // Count active filters
  const activeFilterCount = (filterStatus ? 1 : 0) + (filterDepartment ? 1 : 0);

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="filter-btn"
        onClick={() => setShowFilter((prev) => !prev)}
      >
        <Filter size={14} /> Filter{" "}
        {showFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {activeFilterCount > 0 && (
          <span className="filter-badge">{activeFilterCount}</span>
        )}
      </button>

      {showFilter && (
        <div className="filter-menu multi-level">
          <div className="filter-main">
            <div
              className={`filter-item ${
                activeSubMenu === "status" ? "active-submenu" : ""
              }`}
              onClick={() =>
                setActiveSubMenu(activeSubMenu === "status" ? null : "status")
              }
            >
              Status
              {activeSubMenu === "status" ? (
                <ChevronLeft size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>

            <div
              className={`filter-item ${
                activeSubMenu === "department" ? "active-submenu" : ""
              }`}
              onClick={() =>
                setActiveSubMenu(
                  activeSubMenu === "department" ? null : "department"
                )
              }
            >
              Department
              {activeSubMenu === "department" ? (
                <ChevronLeft size={14} />
              ) : (
                <ChevronRight size={14} />
              )}
            </div>
          </div>

          {activeSubMenu && (
            <div className="filter-submenu">
              {activeSubMenu === "status" &&
                ["All", "Active", "Inactive"].map((status) => (
                  <div
                    key={status}
                    className={`filter-item ${
                      filterStatus ===
                      (status === "All" ? "" : status.toLowerCase())
                        ? "active-filter"
                        : ""
                    }`}
                    onClick={() => handleStatusFilterClick(status)}
                  >
                    {status}
                  </div>
                ))}

              {activeSubMenu === "department" && (
                <>
                  <div
                    className={`filter-item ${
                      filterDepartment === "" ? "active-filter" : ""
                    }`}
                    onClick={() => handleDepartmentFilterClick("")}
                  >
                    All
                  </div>
                  {activeDepartments.map((dept) => (
                    <div
                      key={dept._id}
                      className={`filter-item ${
                        filterDepartment === dept.name ? "active-filter" : ""
                      }`}
                      onClick={() => handleDepartmentFilterClick(dept.name)}
                    >
                      {dept.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
