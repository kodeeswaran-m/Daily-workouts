import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "container/store";
import {
  getPasswordError,
  validateEmail,
  validateName,
  validateConfirmPassword,
  FormControl,
  Spinner
} from "mfe_shared/shared";
import TagManager from "react-gtm-module";

import { Link } from "react-router-dom";
import "../styles/RegisterForm.css";

import { registerFields } from "../config/registerFields";
import { ROUTES, MESSAGES, SIZES } from "../constants";

const RegisterForm = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error: serverError } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    switch (name) {
      case "name":
        setErrors((prev) => ({ ...prev, name: validateName(value) }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
        break;
      case "password":
        setErrors((prev) => ({
          ...prev,
          password: getPasswordError(value),
          confirmPassword: validateConfirmPassword(value, form.confirmPassword),
        }));
        break;
      case "confirmPassword":
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(form.password, value),
        }));
        break;
      default:
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const isFormValid = () => {
    return (
      form.name &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: getPasswordError(form.password),
      confirmPassword: validateConfirmPassword(
        form.password,
        form.confirmPassword
      ),
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );

    setErrors(filteredErrors);

    if (Object.keys(filteredErrors).length > 0) return;

    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      TagManager.dataLayer({
        dataLayer: {
          event: "signup_success",
          user_email: form.email,
          user_name: form.name,
        },
      });
      onRegisterSuccess?.();
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="loginForm">
        <h4 className="loginTitle">{MESSAGES.REGISTER_TITLE}</h4>
        {/* <div className="formGrid"> */}
        {registerFields.map((field) => (
          <div className="formGroup" key={field.name}>
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
        {/* </div> */}

        {serverError && <p className="errorMsg">{serverError}</p>}

        <button
          type="submit"
          className="submitBtn"
          disabled={loading || !isFormValid()}
        >
          {loading
            // ? MESSAGES.REGISTER_BUTTON.LOADING
            ? <Spinner/>
            : MESSAGES.REGISTER_BUTTON.DEFAULT}
        </button>

        <p className="registerText">
          {MESSAGES.LOGIN_TEXT}{" "}
          <Link to={ROUTES.LOGIN} className="registerLink">
            {MESSAGES.LOGIN_LINK}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
