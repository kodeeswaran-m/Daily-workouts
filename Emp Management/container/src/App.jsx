import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { refreshAccessToken, logoutUser } from "./store/authSlice";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import TagManager from "react-gtm-module";
import GTMPageView from "./GTMPageView";
import "./App.css";
import "./setupInterceptors";

// const TrackPageView = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const tagManagerArgs = {
//       dataLayer: {
//         event: "pageview",
//         page: location.pathname,
//       },
//     };
//     TagManager.dataLayer(tagManagerArgs);
//   }, [location]);

//   return null;
// };

const AppContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken, initialized } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!initialized) dispatch(refreshAccessToken());
  }, [dispatch, initialized]);

  const handleLogout = () => dispatch(logoutUser());

  if (!initialized) return <div>Loading...</div>;

  return (
    <>
      <Header user={user} accessToken={accessToken} onLogout={handleLogout} />
      <main className="main-content">
        <AppRoutes navigate={navigate} />
      </main>
    </>
  );
};
const tagManagerArgs = {
  gtmId: "GTM-5D9LHFSC",
};

TagManager.initialize(tagManagerArgs);
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <TrackPageView /> */}
      <GTMPageView />
      <AppContent />
    </BrowserRouter>
  </Provider>
);
