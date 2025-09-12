import React, { useState } from "react";

export default function FilterListWithoutTransition() {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const bigList = Array.from({ length: 40000 }, (_, i) => `Item ${i + 1}`);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Expensive computation
    const filtered = bigList.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
