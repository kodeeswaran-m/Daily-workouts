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
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
// import { fetchDepartmentById, clearSelected } from "../store/departmentsSlice";

import "../styles/DepartmentDetails.css";
import { toast, ToastContainer } from "react-toastify";
import "../styles/DepartmentsPage.css";
import EmployeeCarousel from "../components/EmployeeCarousel";

const DepartmentDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selected: department,
    loading,
    error,
  } = useSelector((state) => state.departments);

  const { searchedEmployee: searchedEmployee, error: empError } = useSelector(
    (state) => state.employees
  );
  const [empIdInput, setEmpIdInput] = useState("");

  useEffect(() => {
    dispatch(fetchDepartmentById(id));
    return () => {
      dispatch(clearSelected());
    };
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
      // console.log("sample", resultAction);
      if (assignEmployee.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload || "Employee assigned successfully."
        );
      } else {
        toast.error(resultAction.payload || "Failed to assign employee.");
      }
    }
  };

  const handleUnassign = async () => {
    if (searchedEmployee?._id) {
      const resultAction = await dispatch(
        unassignEmployee({ id, employeeId: searchedEmployee._id })
      );
      if (unassignEmployee.fulfilled.match(resultAction)) {
        toast.success(
          resultAction.payload || "Employee unassigned successfully."
        );
      } else {
        toast.error(resultAction.payload || "Failed to unassign Employee.");
      }
    }
  };

  if (loading) return <p className="dept-loading">Loading department...</p>;

  if (error) {
    return (
      <div className="dept-error-wrapper">
        <p>⚠️ Failed to load department details: {error}</p>
        <button
          className="dept-retry-btn"
          onClick={() => dispatch(fetchDepartmentById(id))}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!department) return null;
  console.log("department", department);
  // console.log("Searched employee",searchedEmployee);
  return (
    <div className="dept-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
      />
      <div className="dept-card">
        <button
          className="dept-back-btn"
          onClick={() => navigate("/departments")}
        >
          <p><ArrowLeft /></p>
        </button>
        <h2 className="dept-title">{department.name}</h2>
        <p className="dept-subtitle">Code: {department.code}</p>
        <p className="dept-description">
          {department.description || "No description provided"}
        </p>

        {/* Info Section */}
        <div className="dept-info-grid">
          <div>
            <h4>Manager</h4>
            <p>
              {department.manager
                ? `${department.manager.firstName} ${department.manager.lastName}`
                : "Not Assigned"}
            </p>
          </div>
          <div>
            <h4>Assistant Manager</h4>
            <p>
              {department.assistantManager
                ? `${department.assistantManager.firstName} ${department.assistantManager.lastName}`
                : "Not Assigned"}
            </p>
          </div>
          <div>
            <h4>Location</h4>
            <p>{department.location || "N/A"}</p>
          </div>
          <div>
            <h4>Budget</h4>
            <p>{department.budget ? `₹${department.budget}` : "N/A"}</p>
          </div>
          <div>
            <h4>Status</h4>
            <p>{department.status}</p>
          </div>
          <div>
            <h4>Established</h4>
            <p>
              {department.establishedDate
                ? new Date(department.establishedDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="dept-section">
          <h3>Search Employee by Employee ID</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={empIdInput}
              onChange={(e) => setEmpIdInput(e.target.value)}
              placeholder="Enter Employee ID"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {empError && <p style={{ color: "red" }}>{empError}</p>}
        </div>

        {searchedEmployee && (
          <div className="dept-section">
            <p>
              {searchedEmployee.firstName} {searchedEmployee.lastName} -{" "}
              {searchedEmployee.jobTitle}
            </p>
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

        <div className="dept-section">
          <h3>Current Projects</h3>
          {department.currentProjects?.length ? (
            <div className="dept-section-cards">
              {department.currentProjects.map((p, i) => (
                <div key={i} className="project-card">
                  <p>{p}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No projects</p>
          )}
        </div>

        <div className="dept-section">
          <h3>Goals</h3>
          {department.goals?.length ? (
            <div className="dept-section-cards">
              {department.goals.map((g, i) => (
                <div key={i} className="goal-card">
                  <p>{g}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No goals</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;
