import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchDepartmentById,
  clearSelected,
  assignEmployee,
  unassignEmployee,
  fetchEmployeeByEmployeeId,
} from "container/store";
import { ArrowLeft } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

import EmployeeCarousel from "../components/EmployeeCarousel";
import "../styles/DepartmentDetails.css";
import "../styles/DepartmentsPage.css";

import { ROUTES } from "../constants/routes";
import { MESSAGES } from "../constants/messages";
import { TOAST_CONFIG } from "../constants/toastConfig";
import { PLACEHOLDERS } from "../constants/placeholders";
import { LABELS } from "../constants/labels";

const DepartmentDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected: department, loading, error } = useSelector(
    (state) => state.departments
  );
  const { searchedEmployee, error: empError } = useSelector(
    (state) => state.employees
  );

  const [empIdInput, setEmpIdInput] = useState("");

  useEffect(() => {
    dispatch(fetchDepartmentById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  const handleSearch = () => {
    if (empIdInput.trim()) {
      dispatch(fetchEmployeeByEmployeeId(empIdInput));
    }
  };

  const handleAssign = async () => {
    if (searchedEmployee?._id) {
      const resultAction = await dispatch(
        assignEmployee({ id, employeeId: searchedEmployee._id })
      );

      if (assignEmployee.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload || MESSAGES.ASSIGN_SUCCESS);
      } else {
        toast.error(resultAction.payload || MESSAGES.ASSIGN_FAILURE);
      }
    }
  };

  const handleUnassign = async () => {
    if (searchedEmployee?._id) {
      const resultAction = await dispatch(
        unassignEmployee({ id, employeeId: searchedEmployee._id })
      );

      if (unassignEmployee.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload || MESSAGES.UNASSIGN_SUCCESS);
      } else {
        toast.error(resultAction.payload || MESSAGES.UNASSIGN_FAILURE);
      }
    }
  };

  if (loading) return <p className="dept-loading">{MESSAGES.LOADING}</p>;

  if (error) {
    return (
      <div className="dept-error-wrapper">
        <p>{MESSAGES.FETCH_ERROR}{error}</p>
        <button className="dept-retry-btn" onClick={() => dispatch(fetchDepartmentById(id))}>
          {LABELS.RETRY}
        </button>
      </div>
    );
  }

  if (!department) return null;

  return (
    <div className="dept-wrapper">
      <ToastContainer
        position={TOAST_CONFIG.POSITION}
        autoClose={TOAST_CONFIG.AUTO_CLOSE}
        hideProgressBar={TOAST_CONFIG.HIDE_PROGRESS_BAR}
        newestOnTop={TOAST_CONFIG.NEWEST_ON_TOP}
        closeOnClick={TOAST_CONFIG.CLOSE_ON_CLICK}
        rtl={TOAST_CONFIG.RTL}
        pauseOnFocusLoss={TOAST_CONFIG.PAUSE_ON_FOCUS_LOSS}
        draggable={TOAST_CONFIG.DRAGGABLE}
        pauseOnHover={TOAST_CONFIG.PAUSE_ON_HOVER}
        toastClassName={TOAST_CONFIG.CLASS_NAME}
      />

      <div className="dept-card">
        <button className="dept-back-btn" onClick={() => navigate(ROUTES.DEPARTMENTS)}>
          <ArrowLeft />
        </button>

        <h2 className="dept-title">{department.name}</h2>
        <p className="dept-subtitle">Code: {department.code}</p>
        <p className="dept-description">
          {department.description || MESSAGES.NO_DESCRIPTION}
        </p>

        {/* Info Section */}
        <div className="dept-info-grid">
          <div>
            <h4>{LABELS.MANAGER}</h4>
            <p>
              {department.manager
                ? `${department.manager.firstName} ${department.manager.lastName}`
                : MESSAGES.NOT_ASSIGNED}
            </p>
          </div>
          <div>
            <h4>{LABELS.ASSISTANT_MANAGER}</h4>
            <p>
              {department.assistantManager
                ? `${department.assistantManager.firstName} ${department.assistantManager.lastName}`
                : MESSAGES.NOT_ASSIGNED}
            </p>
          </div>
          <div>
            <h4>{LABELS.LOCATION}</h4>
            <p>{department.location || "N/A"}</p>
          </div>
          <div>
            <h4>{LABELS.BUDGET}</h4>
            <p>{department.budget ? `₹${department.budget}` : "N/A"}</p>
          </div>
          <div>
            <h4>{LABELS.STATUS}</h4>
            <p>{department.status}</p>
          </div>
          <div>
            <h4>{LABELS.ESTABLISHED}</h4>
            <p>
              {department.establishedDate
                ? new Date(department.establishedDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Employee Search */}
        <div className="dept-section">
          <h3>{LABELS.SEARCH_EMPLOYEE}</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={empIdInput}
              onChange={(e) => setEmpIdInput(e.target.value)}
              placeholder={PLACEHOLDERS.EMPLOYEE_ID}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {empError && <p style={{ color: "red" }}>{empError}</p>}
        </div>

        {/* Employee Details */}
        {searchedEmployee && (
          <div className="dept-section">
            <p>
              {searchedEmployee.firstName} {searchedEmployee.lastName} -{" "}
              {searchedEmployee.jobTitle}
            </p>
            <p>{searchedEmployee.employeeId || "None"}</p>
            <p>Department: {searchedEmployee.department.name || "None"}</p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={handleAssign}>Assign to Dept</button>
              <button onClick={handleUnassign} style={{ marginLeft: "10px" }}>
                Unassign
              </button>
            </div>
          </div>
        )}

        <EmployeeCarousel employees={department.employees} />

        {/* Projects */}
        <div className="dept-section">
          <h3>{LABELS.CURRENT_PROJECTS}</h3>
          {department.currentProjects?.length ? (
            <div className="dept-section-cards">
              {department.currentProjects.map((p, i) => (
                <div key={i} className="project-card">
                  <p>{p}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{MESSAGES.NO_PROJECTS}</p>
          )}
        </div>

        {/* Goals */}
        <div className="dept-section">
          <h3>{LABELS.GOALS}</h3>
          {department.goals?.length ? (
            <div className="dept-section-cards">
              {department.goals.map((g, i) => (
                <div key={i} className="goal-card">
                  <p>{g}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{MESSAGES.NO_GOALS}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;


