// departmentValidators.js

// 1️⃣ Department Name — at least 3 characters, alphabets & spaces
export const validateDepartmentName = (name) => {
  if (!name || !name.trim()) return "Department Name is required";
  if (!/^[A-Za-z\s]{3,}$/.test(name.trim()))
    return "Department Name must be at least 3 letters and contain only alphabets";
  return "";
};

// 2️⃣ Department Code — uppercase letters, numbers, or hyphens
export const validateDepartmentCode = (code) => {
  if (!code || !code.trim()) return "Code is required";
  if (!/^[A-Z0-9-]+$/.test(code.trim()))
    return "Code must contain only uppercase letters, numbers, or hyphens (e.g., HR-001)";
  if (code.trim().length < 3) return "Code must be at least 3 characters long";
  return "";
};

// 3️⃣ Description — at least 10 characters
export const validateDepartmentDescription = (desc) => {
  if (!desc || !desc.trim()) return "Description is required";
  if (desc.trim().length < 10)
    return "Description must be at least 10 characters long";
  return "";
};

// 4️⃣ Manager ID — must start with ACE followed by numbers
export const validateManagerId = (manager) => {
  if (!manager || !manager.trim()) return "Manager (Employee ID) is required";
  if (!/^ACE\d+$/.test(manager.trim()))
    return "Manager ID must start with 'ACE' followed by numbers (e.g., ACE0001)";
  return "";
};

// 5️⃣ Assistant Manager ID — same pattern as Manager
export const validateAssistantManagerId = (assistantManager) => {
  if (!assistantManager || !assistantManager.trim())
    return "Assistant Manager (Employee ID) is required";
  if (!/^ACE\d+$/.test(assistantManager.trim()))
    return "Assistant Manager ID must start with 'ACE' followed by numbers (e.g., ACE0002)";
  return "";
};

// 6️⃣ Budget — must be a positive number
export const validateBudget = (budget) => {
  if (budget === "" || budget === null) return "Budget is required";
  if (isNaN(budget)) return "Budget must be a valid number";
  if (Number(budget) <= 0) return "Budget must be greater than zero";
  return "";
};

// 7️⃣ Established Date — must be selected and not in the future
export const validateEstablishedDate = (date) => {
  if (!date) return "Established Date is required";
  const selected = new Date(date);
  const today = new Date();
  if (selected > today) return "Established Date cannot be in the future";
  return "";
};
