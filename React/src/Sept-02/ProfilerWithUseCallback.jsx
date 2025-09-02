import { Button } from "@mui/material";
import React, { useState, useCallback, memo, Profiler } from "react";

const ExpensiveChild = memo(({ onClick, label }) => {
  let total = 0;
  for (let i = 0; i < 1000000; i++) {
    total += i;
  }
  return <Button variant="contained" onClick={onClick}>{label}</Button>;
});

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime, 
  interactions 
) {
  console.log(
    `Profiler [${id}] Phase:${phase} actual:${actualDuration.toFixed(
      2
    )} base:${baseDuration.toFixed(2)} start:${startTime.toFixed(
      2
    )} commit:${commitTime.toFixed(2)}`
  );
}

export default function ProfilerWithUseCallback() {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(c => c + 1);
//   const handleClick = useCallback(() => setCount((c) => c + 1), []);

  return (
    <Profiler id="App-Profiler" onRender={onRenderCallback}>
      <div>
        <p>Count: {count}</p>
        <ExpensiveChild onClick={handleClick} label="Increment" /><br/><br/>
        <ExpensiveChild onClick={handleClick} label="Also Increment" />
      </div>
    </Profiler>
  );
}

// import { Profiler, useCallback, useMemo, useState } from "react";
// import { Button } from "@mui/material";

// function ListItems({ items, handleClick }) {

//   const sortedItems = useMemo(() => {
//     return items.sort((a, b) => a.localeCompare(b));
//   }, [items]);

//     // const sortedItems = items.sort((a, b) => a.localeCompare(b));

//   return (
//     <>
//       <ul>
//         {sortedItems.map((element, index) => (
//           <li key={index} onClick={() => handleClick(element)}>
//             {element}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// function ProfilerWithUseCallback() {
//   const [count, setCount] = useState(0);

//   const items = ["Amazon", "Apple", "Alphabet", "Aspire"];

// //   function handleClick(item) {
// //     console.log(`Item ${item} clicked..`);
// //   }

//     const handleClick = useCallback((item) => {
//       console.log("Clicked:", item);
//     }, []);

//   function onRenderChange(
//     id,
//     phase,
//     actualDuration,
//     baseDuration,
//     startTime,
//     commitTime
//   ) {
//     console.log(`id:${id}
// Phase:${phase}
// actualDuration:${actualDuration}
// baseDuration:${baseDuration}
// startTime:${startTime}
// commitTime:${commitTime}

// `);
//   }
//   return (
//     <>
//       <h4>React Example with useCallback and Profiler</h4>
//       <Button variant="contained" onClick={() => setCount(count + 1)}>
//         Increase {count}
//       </Button>
//       <Profiler id="items-List-WithCallback" onRender={onRenderChange}>
//         <ListItems items={items} handleClick={handleClick} />
//       </Profiler>
//     </>
//   );
// }
// export default ProfilerWithUseCallback;
