import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  createDepartment,
  updateDepartment,
  fetchDepartments,
} from "container/store"; // adjust path
import "../styles/DepartmentFormPage.css"; // reuse your styles
import { fetchDepartmentById } from "../../../container/src/store/departmentsSlice";

const DepartmentFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // for editing

  const [formData, setFormData] = useState({
    name: "JLM",
    code: "JLM001",
    description: "Java Lamp Mobility management",
    manager: "",
    assistantManager: "",
    location: "chennai",
    budget: "200000000",
    establishedDate: "",
    parentDepartment: "",
    subDepartment: "",
    goals: [""],
    currentProjects: [""],
    status: "active",
  });

  // Fetch department if editing
  useEffect(() => {
    if (id) {
      const fetchDept = async () => {
        const result = await dispatch(fetchDepartmentById(id));
        const dept = result.payload;
        // const dept = result.payload.find((d) => d._id === id);
        if (dept) {
          setFormData({
            ...formData,
            ...dept,
            establishedDate: dept.establishedDate
              ? dept.establishedDate.split("T")[0]
              : "",
          });
        }
      };
      fetchDept();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  // Handle simple field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle array fields
  const handleArrayChange = (field, idx, value) => {
    const updated = [...formData[field]];
    updated[idx] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayField = (field, idx) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const resultAction = await dispatch(
          updateDepartment({ id, data: formData })
        );
        if (updateDepartment.fulfilled.match(resultAction)) {
          toast.success("Department updated successfully");
          navigate("/departments");
        } else {
          toast.error("Failed to update department");
        }
      } else {
        const resultAction = await dispatch(createDepartment(formData));
        console.log("resultAction from deptformpage", resultAction);
        if (createDepartment.fulfilled.match(resultAction)) {
          toast.success("Department created successfully");
          navigate("/departments");
        } else {
          toast.error(resultAction.payload||"Failed to create department");
        }
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="department-form-page">
      {" "}
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
      <h2>{id ? "Edit Department" : "Add Department"}</h2>
      <form className="department-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Department Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Manager (Employee ID)</label>
          <input
            type="text"
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Assistant Manager (Employee ID)</label>
          <input
            type="text"
            name="assistantManager"
            value={formData.assistantManager}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Budget</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Established Date</label>
          <input
            type="date"
            name="establishedDate"
            value={formData.establishedDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Parent Department ID</label>
          <input
            type="text"
            name="parentDepartment"
            value={formData.parentDepartment}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Sub Department ID</label>
          <input
            type="text"
            name="subDepartment"
            value={formData.subDepartment}
            onChange={handleChange}
          />
        </div>

        {/* Goals */}
        <div className="form-group">
          <label>Goals</label>
          {formData.goals.map((goal, idx) => (
            <div key={idx} className="array-field">
              <input
                type="text"
                value={goal}
                onChange={(e) =>
                  handleArrayChange("goals", idx, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeArrayField("goals", idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayField("goals")}>
            Add Goal
          </button>
        </div>

        {/* Projects */}
        <div className="form-group">
          <label>Current Projects</label>
          {formData.currentProjects.map((proj, idx) => (
            <div key={idx} className="array-field">
              <input
                type="text"
                value={proj}
                onChange={(e) =>
                  handleArrayChange("currentProjects", idx, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeArrayField("currentProjects", idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("currentProjects")}
          >
            Add Project
          </button>
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            Save
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/departments")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentFormPage;
