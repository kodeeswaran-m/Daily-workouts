import ReactDOM from "react-dom/client";

import "./index.css";
import Footer from "./Footer";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: remote2</div>
    <div>Framework: react-19</div>
    <Footer/>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);