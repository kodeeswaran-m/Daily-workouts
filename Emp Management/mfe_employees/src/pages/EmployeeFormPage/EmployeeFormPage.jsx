import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployee,
  fetchEmployeeByEmployeeId,
} from "container/store";
import { toast, ToastContainer } from "react-toastify";
// import FormControl from "mfe_shared/FormControl";
import { FormControl } from "mfe_shared/shared";

import "../../styles/EmployeeFormPage.css";
import {
  emergencyContactFields,
  employeeFormPageFields,
} from "../../config/employeeFields";
import {ArrowLeft} from "lucide-react";

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected: employee } = useSelector((state) => state.employees);
  const { searchedEmployee, error: empError } = useSelector(
    (state) => state.employees
  );
  const { activeDepartments } = useSelector((state) => state.departments);
  console.log("employee", employee);
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    hireDate: "",
    terminationDate: "",
    employmentType: "full-time",
    manager: "",
    managerCode: "",
    managerFirstName: "",
    managerLastName: "",
    dateOfBirth: "",
    gender: "male",
    department: "",
    location: "",
    salary: "",
    bankAccount: "",
    taxId: "",
    status: "active",
    role: "employee",
    emergencyContacts: [{ name: "", relation: "", phone: "" }],
    skills: [""],
    notes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (employee && id) {
      setFormData({
        ...formData,
        ...employee,
        hireDate: employee.hireDate ? employee.hireDate.split("T")[0] : "",
        terminationDate: employee.terminationDate
          ? employee.terminationDate.split("T")[0]
          : "",
        dateOfBirth: employee.dateOfBirth
          ? employee.dateOfBirth.split("T")[0]
          : "",
        skills: employee.skills.length ? employee.skills : [""],
        emergencyContacts:
          employee.emergencyContacts.length > 0
            ? employee.emergencyContacts
            : [{ name: "", relation: "", phone: "" }],
        manager: employee.manager?._id || "",
        managerCode: employee.manager?.employeeId || "",
        managerFirstName: employee.manager?.firstName || "",
        managerLastName: employee.manager?.lastName || "",
        department: employee.department?._id || "",
      });
    }
  }, [employee, id]);

  const handleSearchManager = () => {
    if (formData.managerCode.trim()) {
      dispatch(fetchEmployeeByEmployeeId(formData.managerCode));
    }
  };

  useEffect(() => {
    if (searchedEmployee?._id) {
      setFormData((prev) => ({ ...prev, manager: searchedEmployee._id }));
    }
  }, [searchedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmergencyChange = (index, e) => {
    const { name, value } = e.target;
    const contacts = formData.emergencyContacts.map((contact, i) =>
      i === index ? { ...contact, [name]: value } : contact
    );
    setFormData((prev) => ({ ...prev, emergencyContacts: contacts }));
  };

  const addEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", relation: "", phone: "" },
      ],
    }));
  };

  const handleSkillsChange = (index, e) => {
    const skills = [...formData.skills];
    skills[index] = e.target.value;
    setFormData((prev) => ({ ...prev, skills }));
  };
  const addSkill = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const validate = () => {
    const newErrors = {};

    if (!/^ACE\d+$/.test(formData.employeeId)) {
      newErrors.employeeId =
        "Employee ID must start with ACE followed by numbers.";
    }

    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must contain at least 2 characters.";
    }

    if (!formData.lastName || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must contain at least 2 characters.";
    }

    if (!/^[a-zA-Z]+\.[a-zA-Z]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email must be in format name.lastname@gmail.com";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits (India).";
    }

    if (!formData.employmentType) {
      newErrors.employmentType = "Please select employment type.";
    }

    if (!formData.department) {
      newErrors.department = "Please select department.";
    }

    if (!formData.jobTitle || formData.jobTitle.trim().length < 2) {
      newErrors.jobTitle = "Job Title must contain at least 2 characters.";
    }

    if (!formData.hireDate) {
      newErrors.hireDate = "Hire Date is required.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(updateEmployee({ id, data: formData }));
      toast.success("Employee updated successfully!");
      navigate("/employees");
    } catch {
      toast.error("Failed to update employee.");
    }
  };

  return (
    <div className="employee-form-page">
      <button className="dept-back-btn" onClick={() => navigate("/employees")}>
        <p>
          <ArrowLeft/>
        </p>
      </button>
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
      />{" "}
      <h2 style={{ fontWeight: "bold" }}>{id ? "Update" : "Add"} Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {employeeFormPageFields(activeDepartments).map((field) => (
            <FormControl
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              type={field.type || "text"}
              as={field.as}
              options={field.options}
              required={field.required}
              error={errors[field.name]}
            />
          ))}

          <FormControl
            label="Manager ID"
            name="managerCode"
            value={formData.managerCode}
            disabled
          />

          <FormControl
            label="Manager Name"
            name="managerName"
            value={`${formData.managerFirstName || ""} ${
              formData.managerLastName || ""
            }`}
            disabled
          />
        </div>

        <h3>Assign Manager</h3>
        <div className="form-inline-group">
          <FormControl
            label="Manager Employee ID"
            name="managerCode"
            value={formData.managerCode}
            onChange={handleChange}
            placeholder="e.g. ACE0001"
          />
          <button
            type="button"
            className="srch-btn"
            onClick={handleSearchManager}
          >
            Assign as Manager
          </button>
        </div>

        {empError && <p style={{ color: "red" }}>{empError}</p>}

        {searchedEmployee && (
          <div className="manager-result">
            <p>
              <strong>
                {searchedEmployee.firstName} {searchedEmployee.lastName}
              </strong>{" "}
              ({searchedEmployee.employeeId}) – {searchedEmployee.jobTitle}{" "}
            </p>
          </div>
        )}

        {/* Emergency contacts */}
        <h3>Emergency Contacts</h3>
        {formData.emergencyContacts.map((contact, index) => (
          <div key={index} className="dynamic-field-row">
            {emergencyContactFields.map((field) => (
              <FormControl
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={contact[field.name]}
                onChange={(e) => handleEmergencyChange(index, e)}
              />
            ))}
            <button
              type="button"
              className="remove-btn"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyContacts: prev.emergencyContacts.filter(
                    (_, i) => i !== index
                  ),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <div className="btn-div">
          <button
            type="button"
            className="add-btn"
            onClick={addEmergencyContact}
          >
            Add Contact
          </button>
        </div>

        {/* Skills */}
        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="dynamic-field-row">
            <FormControl
              placeholder="Skill"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e)}
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  skills: prev.skills.filter((_, i) => i !== index),
                }))
              }
            >
              Remove
            </button>
          </div>
        ))}
        <div className="btn-div">
          <button type="button" className="add-btn" onClick={addSkill}>
            Add Skill
          </button>
        </div>

        {/* Notes */}
        <FormControl
          label="Notes"
          as="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          {id ? "Update" : "Save"} Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeFormPage;
