import React, { useState } from "react";

 function SearchListWithoutDeferred() {
  const [query, setQuery] = useState("");

  const bigList = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);
  const filteredList = bigList.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchListWithoutDeferred;