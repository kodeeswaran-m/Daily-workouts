import React, { useEffect, useState } from "react";
import { login } from "../store/authReducer";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("sam");
  const [password, setPassword] = useState<string>("sam@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  useEffect(() => {
    if (user && isAuthenticated) {
      if (user.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    }
  });

  return (
    <div
      style={{
        display: "flex",
        flex: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1>Login Form</h1>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <span
            onClick={()=>navigate("/signup")}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#4f3cffff",
              }}
            >
              Signup here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
