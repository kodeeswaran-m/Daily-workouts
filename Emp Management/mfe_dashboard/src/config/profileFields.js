// src/config/profileFields.js
export const profileFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    disabled: true,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    section: "Change Password" // optional section header
  },
  {
    label: "Old Password",
    name: "oldPassword",
    type: "password",
    placeholder: "Enter old password",
  },
  {
    label: "New Password",
    name: "newPassword",
    type: "password",
    placeholder: "Enter new password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm new password",
  },
];
