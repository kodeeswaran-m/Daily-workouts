import ReactDOM from "react-dom/client";

import "./index.css";
import React from "react";

const Header= React.lazy(()=>import("remote1/Header"));
const Dashboard= React.lazy(()=>import("remote2/Dashboard"));
const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: host</div>
    <div>Framework: react-19</div>
    <Dashboard/>
    <Header/>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);