export const emergencyContactFields = [
  { name: "name", placeholder: "Name" },
  { name: "relation", placeholder: "Relation" },
  { name: "phone", placeholder: "Phone" },
];

export const employeeFormPageFields = (activeDepartments = []) => [
  {
    label: "Employee ID",
    name: "employeeId",
    type: "text",
    required: true,
  },
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    required: true,
  },
  {
    label: "Employment Type",
    name: "employmentType",
    as: "select",
    required: true,
    options: [
      { label: "Full-Time", value: "full-time" },
      { label: "Part-Time", value: "part-time" },
      { label: "Contract", value: "contract" },
      { label: "Intern", value: "intern" },
    ],
  },
  {
    label: "Department",
    name: "department",
    as: "select",
    required: true,
    options: [
      { label: "Select Department", value: "" },
      ...activeDepartments.map((dept) => ({
        label: dept.name,
        value: dept._id,
      })),
    ],
  },
  {
    label: "Job Title",
    name: "jobTitle",
    type: "text",
    required: true,
  },
  {
    label: "Hire Date",
    name: "hireDate",
    type: "date",
    required: true,
  },
  {
    label: "Gender",
    name: "gender",
    as: "select",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    label: "Termination Date",
    name: "terminationDate",
    type: "date",
  },
  {
    label: "Date of Birth",
    name: "dateOfBirth",
    type: "date",
  },
  {
    label: "Location",
    name: "location",
    type: "text",
  },
  {
    label: "Salary",
    name: "salary",
    type: "number",
  },
  {
    label: "Bank Account",
    name: "bankAccount",
    type: "text",
  },
  {
    label: "Tax ID",
    name: "taxId",
    type: "text",
  },
  {
    label: "Status",
    name: "status",
    as: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Terminated", value: "terminated" },
      { label: "On-Leave", value: "on-leave" },
    ],
  },
  {
    label: "Role",
    name: "role",
    as: "select",
    options: [
      { label: "Employee", value: "employee" },
      { label: "Manager", value: "manager" },
      { label: "Admin", value: "admin" },
    ],
  },
];

export const employeeFields = (departments = []) => [
  {
    label: "Employee ID",
    name: "employeeId",
    type: "text",
    required: true,
  },
  {
    label: "Job Title",
    name: "jobTitle",
    type: "text",
    required: true,
  },
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    required: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    pattern: "^\\d*$",
    required: true,
  },
  {
    label: "Hire Date",
    name: "hireDate",
    type: "date",
    required: true,
  },
  {
    label: "Employment Type",
    name: "employmentType",
    as: "select",
    required: true,
    options: [
      { label: "Full-Time", value: "full-time" },
      { label: "Part-Time", value: "part-time" },
      { label: "Contract", value: "contract" },
      { label: "Intern", value: "intern" },
    ],
  },
  {
    label: "Department",
    name: "department",
    as: "select",
    required: true,
    options: [
      { label: "Select Department", value: "" },
      ...departments.map((dept) => ({ label: dept.name, value: dept.name })),
    ],
  },
];
