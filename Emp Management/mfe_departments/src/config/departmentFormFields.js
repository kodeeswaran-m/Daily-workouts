// src/config/departmentFormFields.js

export const departmentFormFields = [
  {
    label: "Department Name",
    name: "name",
    required: true,
  },
  {
    label: "Code",
    name: "code",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    as: "textarea",
    fullWidth: true, // custom property to apply full-width styling
    required: true,
  },
  {
    label: "Manager (Employee ID)",
    name: "manager",
    required: true,
  },
  {
    label: "Assistant Manager (Employee ID)",
    name: "assistantManager",
    required: true,
  },
  {
    label: "Budget",
    type: "number",
    name: "budget",
    required: true,
  },
  {
    label: "Established Date",
    type: "date",
    name: "establishedDate",
    required: true,
  },
  {
    label: "Parent Department ID",
    name: "parentDepartment",
  },
  {
    label: "Sub Department ID",
    name: "subDepartment",
  },
];

