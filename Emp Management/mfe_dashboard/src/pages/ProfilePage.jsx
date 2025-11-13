import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "container/store";
import {
  FormControl,
  validateEmail,
  getPasswordError,
  validateConfirmPassword,
} from "mfe_shared/shared";
import { profileFields } from "../config/profileFields";
import "../styles/ProfilePage.css";
import { User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import {
  PROFILE_MESSAGES,
  PROFILE_UI,
  TOAST_OPTIONS,
} from "../constants/profileConstants";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: user?.email || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        break;
      case "newPassword":
        setErrors((prev) => ({
          ...prev,
          newPassword: value ? getPasswordError(value) : "",
          confirmPassword: form.confirmPassword
            ? validateConfirmPassword(value, form.confirmPassword)
            : "",
        }));
        break;
      case "confirmPassword":
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(form.newPassword, value),
        }));
        break;
      case "oldPassword":
        setErrors((prev) => ({
          ...prev,
          oldPassword:
            form.newPassword && !value
              ? PROFILE_MESSAGES.OLD_PASSWORD_REQUIRED
              : "",
        }));
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(form.email),
      newPassword: form.newPassword ? getPasswordError(form.newPassword) : "",
      confirmPassword: form.newPassword
        ? validateConfirmPassword(form.newPassword, form.confirmPassword)
        : "",
      oldPassword:
        form.newPassword && !form.oldPassword
          ? PROFILE_MESSAGES.OLD_PASSWORD_REQUIRED
          : "",
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, v]) => v)
    );
    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = { id: user?.id, email: form.email };
      if (form.oldPassword || form.newPassword || form.confirmPassword) {
        Object.assign(payload, {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        });
      }

      const resultAction = await dispatch(updateProfile(payload));
      if (updateProfile.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message || PROFILE_MESSAGES.SUCCESS);
        setForm((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setErrors({});
      } else if (updateProfile.rejected.match(resultAction)) {
        toast.error(resultAction.payload || PROFILE_MESSAGES.FAILURE);
      }
    } catch (err) {
      toast.error(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <ToastContainer
        position={TOAST_OPTIONS.POSITION}
        autoClose={TOAST_OPTIONS.AUTO_CLOSE}
      />
      <h2 className="header-tag">{PROFILE_UI.HEADER}</h2>
      <div className="profile-image-section">
        <User className="profile-img" />
      </div>

      <form onSubmit={handleUpdate} className="profile-form">
        {profileFields.map((field, index) =>
          field.section ? (
            <hr key={index} />
          ) : (
            <FormControl
              key={field.name}
              label={field.label}
              as="input"
              type={field.type}
              value={field.name === "name" ? user?.name || "" : form[field.name]}
              disabled={field.disabled}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              size="md"
              error={errors[field.name]}
              autoComplete="off"
            />
          )
        )}

        <button type="submit" disabled={loading} className="update-btn">
          {loading ? PROFILE_UI.BUTTON_UPDATING : PROFILE_UI.BUTTON_UPDATE}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;


