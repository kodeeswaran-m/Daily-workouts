import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeById,
  updateEmployee,
  fetchEmployeeByEmployeeId,
} from "container/store";
import { toast, ToastContainer } from "react-toastify";
import "../styles/EmployeeFormPage.css";

const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selected: employee } = useSelector((state) => state.employees);
  const { searchedEmployee, error: empError } = useSelector(
    (state) => state.employees
  );
  const { activeDepartments } = useSelector((state) => state.departments);

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
        department: employee.department?._id || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const contacts = [...formData.emergencyContacts];
    contacts[index][name] = value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata from employeeFormPage : ", formData);
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
      <ToastContainer />
      <h2>{id ? "Update" : "Add"} Employee</h2>

      <form className="employee-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-grid">
          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
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
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Manager lookup */}
          <div className="form-group full-width">
            <label>Manager Employee ID</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                name="managerCode"
                value={formData.managerCode}
                onChange={handleChange}
                placeholder="e.g. ACE0001"
              />
              <button type="button" onClick={handleSearchManager}>
                Search
              </button>
            </div>
            {empError && <p style={{ color: "red" }}>{empError}</p>}
            {searchedEmployee && (
              <p>
                Manager: {searchedEmployee.firstName}{" "}
                {searchedEmployee.lastName} ({searchedEmployee.jobTitle})
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {activeDepartments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Hire Date</label>
            <input
              type="date"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Termination Date</label>
            <input
              type="date"
              name="terminationDate"
              value={formData.terminationDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
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
          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bank Account</label>
            <input
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Tax ID</label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
              <option value="on-leave">On-Leave</option>
            </select>
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Emergency contacts */}
        <h3>Emergency Contacts</h3>
        {formData.emergencyContacts.length > 0 &&
          formData.emergencyContacts.map((contact, index) => (
            <div key={index} className="dynamic-field-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={contact.name}
                onChange={(e) => handleEmergencyChange(index, e)}
              />
              <input
                type="text"
                name="relation"
                placeholder="Relation"
                value={contact.relation}
                onChange={(e) => handleEmergencyChange(index, e)}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={contact.phone}
                onChange={(e) => handleEmergencyChange(index, e)}
              />
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
        <button type="button" className="add-btn" onClick={addEmergencyContact}>
          Add Contact
        </button>

        {/* Skills */}
        <h3>Skills</h3>
        {formData.skills.length > 0 &&
          formData.skills.map((skill, index) => (
            <div key={index} className="dynamic-field-row">
              <input
                type="text"
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
        <button type="button" className="add-btn" onClick={addSkill}>
          Add Skill
        </button>

        {/* Notes */}
        <div className="form-group full-width">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="primary-btn">
          {id ? "Update" : "Save"} Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeFormPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployeeById, updateEmployee } from "container/store";
// import { toast, ToastContainer } from "react-toastify";
// import "../styles/EmployeeFormPage.css";

// const EmployeeFormPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { selected: employee } = useSelector((state) => state.employees);
// console.log("employees from EmployeeFormPage : ", employee);
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     jobTitle: "",
//     hireDate: "",
//     terminationDate: "",
//     employmentType: "full-time",
//     manager: "",
//     dateOfBirth: "",
//     gender: "male",
//     department: "",
//     location: "",
//     salary: "",
//     bankAccount: "",
//     taxId: "",
//     status: "active",
//     role: "employee",
//     emergencyContacts: [{ name: "", relation: "", phone: "" }],
//     skills: [""],
//     notes: "",
//   });

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEmployeeById(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (employee && id) {
//       setFormData({
//         ...employee,
//         hireDate: employee.hireDate ? employee.hireDate.split("T")[0] : "",
//         terminationDate: employee.terminationDate
//           ? employee.terminationDate.split("T")[0]
//           : "",
//         dateOfBirth: employee.dateOfBirth
//           ? employee.dateOfBirth.split("T")[0]
//           : "",
//         skills: employee.skills.length ? employee.skills : [""],
//         emergencyContacts:
//           employee.emergencyContacts.length > 0
//             ? employee.emergencyContacts
//             : [{ name: "", relation: "", phone: "" }],
//       });
//     }
//   }, [employee, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmergencyChange = (index, e) => {
//     const { name, value } = e.target;
//     const contacts = [...formData.emergencyContacts];
//     contacts[index][name] = value;
//     setFormData((prev) => ({ ...prev, emergencyContacts: contacts }));
//   };

//   const handleSkillsChange = (index, e) => {
//     const skills = [...formData.skills];
//     skills[index] = e.target.value;
//     setFormData((prev) => ({ ...prev, skills }));
//   };

//   const addEmergencyContact = () => {
//     setFormData((prev) => ({
//       ...prev,
//       emergencyContacts: [...prev.emergencyContacts, { name: "", relation: "", phone: "" }],
//     }));
//   };

//   const addSkill = () => {
//     setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await dispatch(updateEmployee({ id, data: formData }));
//       toast.success("Employee updated successfully!");
//       navigate("/employees");
//     } catch (err) {
//       toast.error("Failed to update employee.");
//     }
//   };

//   return (
//     <div className="employee-form-page">
//       <ToastContainer />
//       <h2>Update Employee Details</h2>
//       <form className="employee-form" onSubmit={handleSubmit}>
//         <section className="form-group">
//           <label>Employee ID</label>
//           <input
//             type="text"
//             name="employeeId"
//             value={formData.employeeId}
//             onChange={handleChange}
//             required
//           />
//           <label>First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <label>Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//         </section>

//         <section className="form-group">
//           <label>Job Title</label>
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//           />
//           <label>Hire Date</label>
//           <input
//             type="date"
//             name="hireDate"
//             value={formData.hireDate}
//             onChange={handleChange}
//           />
//           <label>Termination Date</label>
//           <input
//             type="date"
//             name="terminationDate"
//             value={formData.terminationDate}
//             onChange={handleChange}
//           />
//           <label>Employment Type</label>
//           <select
//             name="employmentType"
//             value={formData.employmentType}
//             onChange={handleChange}
//           >
//             <option value="full-time">Full-Time</option>
//             <option value="part-time">Part-Time</option>
//             <option value="contract">Contract</option>
//             <option value="intern">Intern</option>
//           </select>
//           <label>Manager ID</label>
//           <input
//             type="text"
//             name="manager"
//             value={formData.manager || ""}
//             onChange={handleChange}
//           />
//         </section>

//         <section className="form-group">
//           <label>Date of Birth</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//           />
//           <label>Gender</label>
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <label>Department ID</label>
//           <input
//             type="text"
//             name="department"
//             value={formData.department || ""}
//             onChange={handleChange}
//           />
//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </section>

//         <section className="form-group">
//           <label>Salary</label>
//           <input
//             type="number"
//             name="salary"
//             value={formData.salary}
//             onChange={handleChange}
//           />
//           <label>Bank Account</label>
//           <input
//             type="text"
//             name="bankAccount"
//             value={formData.bankAccount}
//             onChange={handleChange}
//           />
//           <label>Tax ID</label>
//           <input
//             type="text"
//             name="taxId"
//             value={formData.taxId}
//             onChange={handleChange}
//           />
//           <label>Status</label>
//           <select name="status" value={formData.status} onChange={handleChange}>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="terminated">Terminated</option>
//             <option value="on-leave">On-Leave</option>
//           </select>
//           <label>Role</label>
//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="employee">Employee</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </section>

//         <section className="form-group">
//           <h3>Emergency Contacts</h3>
//           {formData.emergencyContacts.map((contact, index) => (
//             <div key={index} className="sub-group">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={contact.name}
//                 onChange={(e) => handleEmergencyChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="relation"
//                 placeholder="Relation"
//                 value={contact.relation}
//                 onChange={(e) => handleEmergencyChange(index, e)}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={contact.phone}
//                 onChange={(e) => handleEmergencyChange(index, e)}
//               />
//             </div>
//           ))}
//           <button type="button" onClick={addEmergencyContact}>
//             Add Contact
//           </button>
//         </section>

//         <section className="form-group">
//           <h3>Skills</h3>
//           {formData.skills.map((skill, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder="Skill"
//               value={skill}
//               onChange={(e) => handleSkillsChange(index, e)}
//             />
//           ))}
//           <button type="button" onClick={addSkill}>
//             Add Skill
//           </button>
//         </section>

//         <section className="form-group">
//           <label>Notes</label>
//           <textarea
//             name="notes"
//             value={formData.notes}
//             onChange={handleChange}
//           ></textarea>
//         </section>

//         <button type="submit" className="primary-btn">
//           Update Employee
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmployeeFormPage;
