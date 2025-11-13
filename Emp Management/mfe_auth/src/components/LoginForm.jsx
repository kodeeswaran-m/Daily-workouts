import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "container/store";
import {
  getPasswordError,
  validateEmail,
  FormControl,
  Spinner
} from "mfe_shared/shared";
import TagManager from "react-gtm-module";

import { loginFields } from "../config/loginFields";
import "../styles/LoginForm.css";

import { ROUTES, MESSAGES, SIZES } from "../constants";

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: getPasswordError(value),
      }));
    } else if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = getPasswordError(form.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isFormValid = () => {
    return form.email && form.password && !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      TagManager.dataLayer({
        dataLayer: {
          event: "login_success",
          user_email: form.email,
        },
      });
      onLoginSuccess?.();
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">{MESSAGES.LOGIN_TITLE}</h2>

        {loginFields.map((field) => (
          <div className="form-group" key={field.name}>
            <FormControl
              label={field.label}
              as="input"
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              size={SIZES.INPUT}
              error={errors[field.name]}
              required={field.required}
            />
          </div>
        ))}

        {serverError && <p className="error-msg">{serverError}</p>}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading || !isFormValid()}
        >
          {loading
            // ? MESSAGES.LOGIN_BUTTON.LOADING
            ? <Spinner/>
            : MESSAGES.LOGIN_BUTTON.DEFAULT}
        </button>

        <p className="register-text">
          {MESSAGES.REGISTER_TEXT}{" "}
          <Link to={ROUTES.REGISTER} className="register-link">
            {MESSAGES.REGISTER_LINK}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
