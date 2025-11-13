import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById, clearSelected } from "container/store";
import { ArrowLeft } from "lucide-react";
import "../../styles/EmployeeDetails.css";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selected: employee,
    loading,
    error,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  if (loading) return <p className="emp-loading">Loading employee...</p>;
  if (error) return <p className="emp-error">⚠️ {error}</p>;
  if (!employee) return null;

  return (
    <div className="emp-details-wrapper">
      <div className="emp-card">
        <button
          className="dept-back-btn"
          onClick={() => navigate("/employees")}
        >
          <p>
            <ArrowLeft />
          </p>
        </button>
        <div className="emp-header">
          <img
            src={`https://i.pravatar.cc/150?u=${employee.email}`}
            alt="avatar"
            className="emp-avatar"
          />
          <div>
            <h2>
              {employee.firstName} {employee.lastName}
            </h2>
            <p className="emp-job">{employee.jobTitle || "N/A"}</p>
            <span className={`emp-status ${employee.status}`}>
              {employee.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="emp-info-grid">
          <div>
            <h4>Email</h4>
            <p>{employee.email}</p>
          </div>
          <div>
            <h4>Phone</h4>
            <p>{employee.phone || "N/A"}</p>
          </div>
          <div>
            <h4>Department</h4>
            <p>{employee.department?.name || "N/A"}</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>{employee.location || "N/A"}</p>
          </div>
          <div>
            <h4>Hire Date</h4>
            <p>
              {employee.hireDate
                ? new Date(employee.hireDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <h4>Employment Type</h4>
            <p>{employee.employmentType}</p>
          </div>
          <div>
            <h4>Salary</h4>
            <p>{employee.salary ? `₹${employee.salary}` : "N/A"}</p>
          </div>
          <div>
            <h4>Role</h4>
            <p>{employee.role}</p>
          </div>
        </div>

        {/* Personal Info */}
        {/* <div className="emp-section">
          <h3>Personal Information</h3>
          <p>
            <strong>DOB:</strong>{" "}
            {employee.dateOfBirth
              ? new Date(employee.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {employee.gender || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {employee.address?.street},{" "}
            {employee.address?.city}, {employee.address?.state},{" "}
            {employee.address?.country}
          </p>
        </div> */}

        {/* Skills */}
        <div className="emp-section">
          <h3>Skills</h3>
          {employee.skills?.length ? (
            <ul className="skills-list">
              {employee.skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          ) : (
            <p>No skills added</p>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="emp-section">
          <h3>Emergency Contacts</h3>
          {employee.emergencyContacts?.length ? (
            <ul className="contacts-list">
              {employee.emergencyContacts.map((c, i) => (
                <li key={i}>
                  <strong>{c.name}</strong> ({c.relation}) - {c.phone}
                </li>
              ))}
            </ul>
          ) : (
            <p>No emergency contacts</p>
          )}
        </div>

        {/* Notes */}
        {employee.notes && (
          <div className="emp-section">
            <h3>Notes</h3>
            <p>{employee.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
