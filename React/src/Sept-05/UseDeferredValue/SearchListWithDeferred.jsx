import React, { useState, useDeferredValue } from "react";

function SearchListWithDeferred() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // lagging version of query

  const bigList = Array.from({ length: 20000 }, (_, i) => `Item ${i + 1}`);
  const filteredList = bigList.filter((item) =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {query !== deferredQuery && <p>Loading...</p>}
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchListWithDeferred;