import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FormControl } from "mfe_shared/shared";
import { departmentFormFields } from "../config/departmentFormFields";

import { createDepartment, updateDepartment } from "container/store";
import { fetchDepartmentById } from "../../../container/src/store/departmentsSlice";
import "../styles/DepartmentFormPage.css";

import {
  ROUTES,
  MESSAGES,
  LABELS,
  VALIDATION_MESSAGES,
  REQUIRED_FIELDS_ARRAY,
  TOAST_CONFIG,
} from "../constants";

const DepartmentFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchDept = async () => {
        const result = await dispatch(fetchDepartmentById(id));
        const dept = result.payload;
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
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = VALIDATION_MESSAGES.NAME_REQUIRED;
    if (!formData.code) newErrors.code = VALIDATION_MESSAGES.CODE_REQUIRED;
    if (!formData.description)
      newErrors.description = VALIDATION_MESSAGES.DESCRIPTION_REQUIRED;
    if (!formData.location)
      newErrors.location = VALIDATION_MESSAGES.LOCATION_REQUIRED;
    if (!formData.budget)
      newErrors.budget = VALIDATION_MESSAGES.BUDGET_REQUIRED;
    if (!formData.establishedDate)
      newErrors.establishedDate = VALIDATION_MESSAGES.DATE_REQUIRED;
    if (!formData.status)
      newErrors.status = VALIDATION_MESSAGES.STATUS_REQUIRED;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isFormValid = () => {
    // Required fields validation
    const requiredFields = REQUIRED_FIELDS_ARRAY;
    const hasEmptyRequired = requiredFields.some((field) => !formData[field]);

    // Check for errors
    const hasErrors = Object.values(errors).some(Boolean);

    return !hasEmptyRequired && !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (id) {
        const resultAction = await dispatch(
          updateDepartment({ id, data: formData })
        );
        if (updateDepartment.fulfilled.match(resultAction)) {
          toast.success(MESSAGES.UPDATE_SUCCESS);
          navigate(ROUTES.DEPARTMENTS);
        } else {
          toast.error(MESSAGES.UPDATE_FAILURE);
        }
      } else {
        const resultAction = await dispatch(createDepartment(formData));
        if (createDepartment.fulfilled.match(resultAction)) {
          toast.success(MESSAGES.CREATE_SUCCESS);
          navigate(ROUTES.DEPARTMENTS);
        } else {
          toast.error(resultAction.payload || MESSAGES.CREATE_FAILURE);
        }
      }
    } catch {
      toast.error(MESSAGES.GENERIC_ERROR);
    }
  };

  return (
    <div className="department-form-page">
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

      <h2>{id ? LABELS.EDIT_DEPARTMENT : LABELS.ADD_DEPARTMENT}</h2>

      <form className="department-form" onSubmit={handleSubmit}>
        {departmentFormFields.map((field) => (
          <div
            key={field.name}
            className={field.fullWidth ? "form-group full-width" : ""}
          >
            <FormControl
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              as={field.as}
              value={formData[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              required={field.required}
            />
          </div>
        ))}

        {/* Goals */}
        <div className="goals-projects-container">
          <div className="sub-container">
            <label>{LABELS.GOALS}</label>
            {formData.goals.map((goal, idx) => (
              <div key={idx} className="array-field">
                <FormControl
                  value={goal}
                  onChange={(e) =>
                    handleArrayChange("goals", idx, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("goals", idx)}
                >
                  {LABELS.REMOVE}
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayField("goals")}>
              {LABELS.ADD_GOAL}
            </button>
          </div>

          {/* Projects */}
          <div className="sub-container">
            <label>{LABELS.PROJECTS}</label>
            {formData.currentProjects.map((proj, idx) => (
              <div key={idx} className="array-field">
                <FormControl
                  value={proj}
                  onChange={(e) =>
                    handleArrayChange("currentProjects", idx, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeArrayField("currentProjects", idx)}
                >
                  {LABELS.REMOVE}
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField("currentProjects")}
            >
              {LABELS.ADD_PROJECT}
            </button>
          </div>
        </div>

        {/* Status (only for edit mode) */}
        {id && (
          <FormControl
            label={LABELS.STATUS}
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            error={errors.status}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Closed", value: "closed" },
            ]}
            required
          />
        )}

        {/* Location */}
        <FormControl
          label={LABELS.LOCATION}
          name="location"
          value={formData.location}
          onChange={handleChange}
          error={errors.location}
          required
        />

        <div className="form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={!isFormValid()}
          >
            {LABELS.SAVE}
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate(ROUTES.DEPARTMENTS)}
          >
            {LABELS.CANCEL}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentFormPage;
