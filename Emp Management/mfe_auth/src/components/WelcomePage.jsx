import React from "react";
import { Link } from "react-router-dom";
import "../styles/WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to EMS</h1>
        <p>Your Employee Management System made easy.</p>

        <div className="welcome-buttons">
          <Link to="/login">
            <button className="primary-btn">Login</button>
          </Link>
          <Link to="/register">
            <button className="secondary-btn">Register</button>
          </Link>
        </div>
      </div>

      <div className="welcome-footer">
        <p>© {new Date().getFullYear()} EMS. All rights reserved.</p>
      </div>
    </div>
  );
};

export default WelcomePage;
