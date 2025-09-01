import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";

// Import remote components dynamically
const Header = React.lazy(() => import("mfe_remote1/Header"));
const Widget = React.lazy(() => import("mfe_remote2/Widget"));

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/header" style={{ marginRight: "10px" }}>Header</Link>
        <Link to="/widget">Widget</Link>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<h2>Welcome to Host App</h2>} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="/header" element={<Header />} />
          <Route path="/widget" element={<Widget />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
