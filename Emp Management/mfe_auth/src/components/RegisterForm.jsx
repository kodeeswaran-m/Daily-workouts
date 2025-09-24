import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "container/store";
import FormControl from "mfe_shared/FormControl";
import styles from "../styles/LoginForm.module.css";
import {Link } from "react-router-dom"
const RegisterForm = ({ onRegisterSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "sree",
    email: "sree@gmail.com",
    password: "Sree@1234",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      console.log("Registered successfully:", result.payload.user);
      onRegisterSuccess?.();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Register</h2>

        <div className={styles.formGroup}>
          <FormControl
            label="Name"
            as="input"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            size="md"
          />
        </div>

        <div className={styles.formGroup}>
          <FormControl
            label="Email"
            as="input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            size="md"
          />
        </div>

        <div className={styles.formGroup}>
          <FormControl
            label="Password"
            as="input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            size="md"
          />
        </div>

        {error && <p className={styles.errorMsg}>{error}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className={styles.registerText}>
          Do you want to login?{" "}
          <Link to="/login" className={styles.registerLink}>
            Click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
