import { useState } from "react";
import Button from "./Button";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(0);
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <p>{count}</p>
        <div>
          <Button onClick={handleIncrease} label={"Increase"}/>
          <Button onClick={handleDecrease} label={"decrease"}/>
          <Button onClick={handleReset} label={"Reset"}/>
          {/* <button onClick={handleIncrease}>Increment</button>
          <button onClick={handleDecrease}>Reset</button>
          <button onClick={handleReset}>Decrement</button> */}
        </div>
      </div>
    </div>
  );
};

export default Counter;
