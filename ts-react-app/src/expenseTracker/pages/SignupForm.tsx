import React, { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../store/authReducer";
interface FormData {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "sam",
    email: "sam@gmail.com",
    password: "sam@123",
    role: "user",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(signup(formData));
    navigate("/login");
  }
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
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit} autoComplete="off" style={{display:"flex", flexDirection:"column" , gap:" 20px"}}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value={"select"} disabled selected>Select an option</option>
          <option value={"user"}>User</option>
          <option value={"admin"}>Admin</option>
        </select>
        <button type="submit">Sign Up</button>
        <p style={{ marginTop: "15px", fontSize: "14px"}}>Already have an account? <span onClick={()=>navigate("/login")} style={{cursor:"pointer", textDecoration:"underline", color:"#4f3cffff"}}>login here</span></p>
      </form>
    </div>
    </div>
  );
};

export default SignupForm;
