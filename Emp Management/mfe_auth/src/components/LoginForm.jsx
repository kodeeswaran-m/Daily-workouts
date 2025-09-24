import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "container/store";
import FormControl from "mfe_shared/FormControl";
import styles from "../styles/LoginForm.module.css";
import { Link } from "react-router-dom";

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "john@example.com",
    password: "mypassword123",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      console.log("Token is ready:", result.payload);
      onLoginSuccess?.();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login</h2>

        <div className={styles.formGroup}>
          {/* <label className={styles.formLabel}>Email</label> */}
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
          {/* <label className={styles.formLabel}>Password</label> */}
          {/* <div className={styles.passwordWrapper}> */}
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Link to="/register" className={styles.registerLink}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import styles from "../styles/LoginForm.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "container/store"; // ✅ coming from container

// const LoginForm = ({ onLoginSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading, error, user, accessToken } = useSelector((state) => state.auth);
//   console.log("user", user, accessToken);
//   const [showPassword, setShowPassword] = useState(false);
//   const [form, setForm] = useState({
//     email: "john@example.com",
//     password: "mypassword123",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login data:", form);

//     try {
//       const resultAction = await dispatch(loginUser(form));

//       if (loginUser.fulfilled.match(resultAction)) {
//         // ✅ successful login
//         onLoginSuccess?.();
//         setForm({ email: "", password: "" });
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className={styles.wrapper}>
//       <form onSubmit={handleSubmit} className={styles.loginForm}>
//         <h2 className={styles.loginTitle}>Login</h2>

//         {/* email */}
//         <div className={styles.formGroup}>
//           <label className={styles.formLabel}>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             className={styles.formInput}
//           />
//         </div>

//         {/* password */}
//         <div className={styles.formGroup}>
//           <label className={styles.formLabel}>Password</label>
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               required
//               className={styles.formInput}
//             />
//             {/* <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={styles.togglePassword}
//             >
//               {showPassword ? "🙈" : "👁️"}
//             </button> */}
//           </div>
//         </div>

//         {/* error message */}
//         {error && <p className={styles.errorMsg}>{error}</p>}

//         {/* submit button */}
//         <button type="submit" className={styles.submitBtn} disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
