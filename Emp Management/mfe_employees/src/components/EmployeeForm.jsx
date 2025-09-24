import React, { useState, useEffect } from "react";
import "../styles/EmployeesPage.css";
import { useSelector } from "react-redux";

const departments = ["HR", "Developer", "Finance", "Marketing"]; // Or fetch dynamically

const EmployeeForm = ({ employee = {}, onSubmit, onCancel }) => {
  const { activeDepartments } = useSelector((state) => state.departments);

  const [formData, setFormData] = useState({
    employeeId: "ACE0001",
    jobTitle: "CEO",
    firstName: "Sam",
    lastName: "C S",
    email: "samcs@gmail.com",
    phone: "9597735368",
    status: "active",
    department: "Finance",
    hireDate: "2025-09-19",
    employmentType: "full-time",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        employeeId: employee.employeeId || "",
        jobTitle: employee.jobTitle || "",
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        status: employee.status || "active",
        department: employee.department?.name || "",
        hireDate: employee.hireDate
          ? new Date(employee.hireDate).toISOString().split("T")[0]
          : "", // 👈 Format date for input
        employmentType: employee.employmentType || "full-time",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h3>{employee ? "Update Employee" : "Add Employee"}</h3>
      <form className="employee-form" onSubmit={handleSubmit}>
        {/* Employee ID & Job Title */}
        <div className="form-row">
          <div className="form-group">
            <label>Employee ID *</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* First & Last Name */}
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="form-row">
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Hire Date & Employment Type */}
        <div className="form-row">
          <div className="form-group">
            <label>Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>
        </div>

        {/* Status & Department */}
        <div className="form-row">
          {employee && (
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="terminated">Terminated</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {activeDepartments.map((dept) => (
                <option key={dept._id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {employee ? "Update Employee" : "Add Employee"}
          </button>
          {onCancel && (
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
