
export const getPasswordError = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8) return "Password must be at least 8 characters";
  if (password.length > 16) return "Password cannot exceed 16 characters";
  if (!/[A-Z]/.test(password)) return "At least one uppercase letter is required";
  if (!/[a-z]/.test(password)) return "At least one lowercase letter is required";
  if (!/\d/.test(password)) return "At least one number is required";
  if (!/[@$!%*?&]/.test(password))
    return "At least one special character (@$!%*?&) is required";

  return "";
};


export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Enter a valid email (e.g. ajay.sam@gmail.com)";
  return "";
};


export const validateName = (name) => {
  if (!name || !name.trim()) return "Name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (confirmPassword !== password) return "The confirm password does not match the password entered";
  return "";
};
