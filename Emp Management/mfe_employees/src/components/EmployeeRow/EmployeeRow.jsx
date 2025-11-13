import React from "react";

const EmployeeRow = ({ employee, onEdit, onDelete, onToggleEmployee, selected }) => {
  if (!employee) return null;
  return (
    <div className={`employee-row ${selected ? "selected" : ""}`}>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggleEmployee(employee._id)}
      />
      <span>{employee.name}</span>
      <span>{employee.department}</span>
      <span>{employee.status}</span>
      <button onClick={() => onEdit(employee)}>Edit</button>
      <button onClick={() => onDelete(employee._id)}>Delete</button>
    </div>
  );
};

export default EmployeeRow;
