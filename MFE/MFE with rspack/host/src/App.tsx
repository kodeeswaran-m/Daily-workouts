import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import "./index.css";
const Header= React.lazy(()=>import("remote1/Header"));
const Footer= React.lazy(()=>import("remote2/Footer"));
const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: host</div>
    <div>Framework: react-19</div>
    <Suspense fallback={<p>Loading...</p>}>
      <Header/>
      <Footer/>
    </Suspense>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);