import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash, X, ChevronDown, ChevronUp, Plus, Pencil } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/DepartmentsPage.css";
import {
  fetchDepartments,
  deleteDepartment,
} from "container/store"; // adjust path

import {
  ROUTES,
  LABELS,
  MESSAGES,
  STATUS_OPTIONS,
  TOAST_CONFIG,
} from "../constants";

const DepartmentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: departments, loading, error } = useSelector(
    (state) => state.departments
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialStatus = searchParams.get("status") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [filterByKeyword, setFilterByKeyword] = useState(initialSearch);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  // Debounced search
  useEffect(() => {
    const delay = setTimeout(() => setFilterByKeyword(searchTerm), 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  // Update URL params
  useEffect(() => {
    const params = {};
    if (filterByKeyword) params.search = filterByKeyword;
    if (filterStatus) params.status = filterStatus;
    setSearchParams(params);
  }, [filterByKeyword, filterStatus, setSearchParams]);

  // Fetch departments
  useEffect(() => {
    dispatch(fetchDepartments({ search: filterByKeyword, status: filterStatus }));
  }, [dispatch, filterByKeyword, filterStatus]);

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteDepartment(id));
    if (deleteDepartment.fulfilled.match(resultAction)) {
      toast.success(MESSAGES.DELETE_SUCCESS);
    } else {
      toast.error(MESSAGES.DELETE_FAILURE);
    }
  };

  return (
    <div className="departments-container">
      <ToastContainer {...TOAST_CONFIG} />

      <div className="departments-header">
        <h2>{LABELS.DEPARTMENTS}</h2>
      </div>

      <div className="departments-toolbar">
        <div className="search-filter-group">
          <div className="search-box">
            <input
              type="text"
              placeholder={LABELS.SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdown">
            {filterStatus ? (
              <span className="active-filter">
                {filterStatus}
                <button onClick={() => setFilterStatus("")}>
                  <X size={14} />
                </button>
              </span>
            ) : (
              <button
                className="filter-btn"
                onClick={() => setShowStatusFilter((prev) => !prev)}
              >
                {LABELS.STATUS}{" "}
                {showStatusFilter ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}

            {showStatusFilter && !filterStatus && (
              <div className="filter-menu">
                {STATUS_OPTIONS.map((status) => (
                  <div
                    key={status}
                    className="filter-item"
                    onClick={() => {
                      setFilterStatus(status === LABELS.ALL ? "" : status.toLowerCase());
                      setShowStatusFilter(false);
                    }}
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="toolbar-actions">
          <button className="count-btn">
            {LABELS.COUNT_PREFIX}
            {departments.length < 10 ? `0${departments.length}` : departments.length}
          </button>
          <button className="primary-btn" onClick={() => navigate(ROUTES.ADD_DEPARTMENT)}>
            <Plus /> {LABELS.ADD}
          </button>
        </div>
      </div>

      <div className="department-list">
        {loading && <p>{LABELS.LOADING}</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && departments.length === 0 && <p>{LABELS.NO_DEPARTMENTS}</p>}

        {departments.map((dept) => (
          <div
            key={dept._id}
            className={`department-card ${selectedDept?._id === dept._id ? "selected" : ""}`}
            onClick={() => {
              setSelectedDept(dept);
              navigate(`${ROUTES.DEPARTMENT_DETAILS}/${dept._id}`);
            }}
          >
            <div className="dept-info">
              <h4>{dept.name}</h4>
              <span className={`status ${dept.status}`}>{dept.status}</span>
            </div>

            <div className="dept-details">
              <p>
                <strong>{LABELS.CODE}:</strong> {dept.code || "N/A"}
              </p>
              <p>
                <strong>{LABELS.DESCRIPTION}:</strong> {dept.description || "No description"}
              </p>
              <p>
                <strong>{LABELS.LOCATION}:</strong> {dept.location || "Not specified"}
              </p>
              <p>
                <strong>{LABELS.EMPLOYEES}:</strong> {dept.employees?.length || 0}
              </p>
            </div>

            <div className="dept-actions">
              <button
                className="icon-btn edit-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${ROUTES.EDIT_DEPARTMENT}/${dept._id}`);
                }}
              >
                <Pencil />
              </button>
              <button
                className="icon-btn del-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(dept._id);
                }}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;

