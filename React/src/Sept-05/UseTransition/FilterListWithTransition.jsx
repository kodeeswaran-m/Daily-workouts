import React, { useState, useTransition } from "react";

export default function FilterListWithTransition() {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [isPending, startTransition] = useTransition();
  const bigList = Array.from({ length: 40000 }, (_, i) => `Item ${i + 1}`);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // urgent update (instant typing)

    startTransition(() => {
      // non-urgent update (filtering)
      const filtered = bigList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredList(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Loading...</p>} {/* show spinner while updating */}
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
