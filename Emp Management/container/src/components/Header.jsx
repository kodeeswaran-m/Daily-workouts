import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import TagManager from "react-gtm-module";

import { ROUTES } from "../constants/appRoutes";
import { APP_LABELS } from "../constants/appLabels";
import { ICONS } from "../constants/appIcons";
import { APP_CONFIG } from "../constants/appConfig";

const Header = ({ user, accessToken, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { USERS, MENU, CLOSE, PROFILE } = ICONS;
console.log("user",user);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  return (
    <header className="header">
      <div className="header-container" onClick={() => navigate(ROUTES.ROOT)}>
        <USERS />
        <h1 className="header-title main-title desktop-only">
          {APP_LABELS.TITLE_FULL}
        </h1>
        <h1 className="header-title main-title mobile-only">
          {APP_LABELS.TITLE_SHORT}
        </h1>
      </div>

      {user && accessToken ? (
        <>
          {/* Desktop navigation */}
          <nav className="nav-menu desktop-only">
            <NavLink to={ROUTES.DASHBOARD} className="nav-link">
              {APP_LABELS.NAV_LINKS.DASHBOARD}
            </NavLink>
            <NavLink to={ROUTES.EMPLOYEES} className="nav-link">
              {APP_LABELS.NAV_LINKS.EMPLOYEES}
            </NavLink>
            <NavLink to={ROUTES.DEPARTMENTS} className="nav-link">
              {APP_LABELS.NAV_LINKS.DEPARTMENTS}
            </NavLink>
          </nav>

          {/* Menu toggle (mobile) */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <CLOSE /> : <MENU />}
          </button>

          {/* Profile Dropdown */}
          <div className="avatar-container desktop-only" ref={profileRef}>
            <button
              className="avatar-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <PROFILE size={APP_CONFIG.PROFILE_ICON_SIZE} />
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link
                  to={ROUTES.USER_PROFILE}
                  onClick={() => setIsProfileOpen(false)}
                  className="profile-link"
                >
                  <p className="profile-name">{user?.name}</p>
                  <p className="profile-email">{user?.email}</p>
                </Link>
                <button
                  onClick={() => {
                    const tagManagerArgs = {
                      dataLayer: {
                        event: "logout_click",
                        user_name: user?.name,
                        user_email: user?.email,
                        timestamp: new Date().toISOString(),
                      },
                    };
                    TagManager.dataLayer(tagManagerArgs);
                    onLogout();
                  }}
                  className="logoutBtn"
                >
                  {APP_LABELS.AUTH.LOGOUT}
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          {location.pathname === ROUTES.LOGIN ? (
            <Link to={ROUTES.REGISTER}>
              <button className="login-btn">{APP_LABELS.AUTH.REGISTER}</button>
            </Link>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <button className="login-btn">{APP_LABELS.AUTH.LOGIN}</button>
            </Link>
          )}
        </div>
      )}

      {/* Mobile sidebar */}
      {isMenuOpen && user && accessToken && (
        <div className="side-menu open">
          <div
            className="header-container header-mble"
            onClick={() => navigate(ROUTES.ROOT)}
          >
            <USERS />
            <h3 className="header-title">{APP_LABELS.TITLE_SHORT}</h3>
          </div>
          <NavLink
            to={ROUTES.DASHBOARD}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {APP_LABELS.NAV_LINKS.DASHBOARD}
          </NavLink>
          <NavLink
            to={ROUTES.EMPLOYEES}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {APP_LABELS.NAV_LINKS.EMPLOYEES}
          </NavLink>
          <NavLink
            to={ROUTES.DEPARTMENTS}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {APP_LABELS.NAV_LINKS.DEPARTMENTS}
          </NavLink>

          <div className="avatar-container mobile-only">
            <button
              className="avatar-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <PROFILE size={APP_CONFIG.PROFILE_ICON_SIZE} />
            </button>
            <div className={`sidebar-dropdown ${isProfileOpen ? "open" : ""}`}>
              <p className="profile-name">{user?.name}</p>
              <p className="profile-email">{user?.email}</p>
              <button
                onClick={() => {
                  const tagManagerArgs = {
                    dataLayer: {
                      event: "logout_click",
                      user_name: user?.name,
                      user_email: user?.email,
                      timestamp: new Date().toISOString(),
                    },
                  };
                  TagManager.dataLayer(tagManagerArgs);

                  onLogout();
                }}
                className="logoutBtn"
              >
                {APP_LABELS.AUTH.LOGOUT}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
