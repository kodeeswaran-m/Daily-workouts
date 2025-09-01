// mfe-host/src/App.jsx
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const ProductList = React.lazy(() => import("remote1/ProductList"));
const UserList = React.lazy(() => import("remote/UserList"));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav style={{ display: "flex", gap: "1rem", padding: "10px", background: "#eee" }}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Suspense fallback={<p>Loading remote page...</p>}>
          <Routes>
            <Route path="/" element={<h2>Welcome to Host</h2>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
