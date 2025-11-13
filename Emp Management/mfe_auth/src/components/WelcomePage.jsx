import React from "react";
import { Link } from "react-router-dom";
import "../styles/WelcomePage.css";
import { ROUTES, MESSAGES } from "../constants";

const WelcomePage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>{MESSAGES.WELCOME_TITLE}</h1>
        <p>{MESSAGES.APP_DESCRIPTION}</p>

        <div className="welcome-buttons">
          <Link to={ROUTES.LOGIN}>
            <button className="primary-btn">
              {MESSAGES.WELCOME_BUTTONS.LOGIN}
            </button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <button className="secondary-btn">
              {MESSAGES.WELCOME_BUTTONS.REGISTER}
            </button>
          </Link>
        </div>
      </div>

      <div className="welcome-footer">
        <p>{MESSAGES.FOOTER_TEXT(currentYear)}</p>
      </div>
    </div>
  );
};

export default WelcomePage;


