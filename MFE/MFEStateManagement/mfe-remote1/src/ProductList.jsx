// mfe-remote1/src/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Pull thunks from host store (re-exported)
import { fetchProducts } from "mfe_host/store";

export default function ProductList() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading products...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {data.map((p, index) => (
          <li key={p.id}>
            {index+1} - {p.title} — ${p.price} — Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}
