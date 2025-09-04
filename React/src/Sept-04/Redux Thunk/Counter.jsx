import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementAsync } from "./store";

const Counter = () => {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>+ Increment</button>
      <button onClick={() => dispatch(decrement())}>- Decrement</button>
      <button onClick={() => dispatch(incrementAsync())}>
        + Increment Async (1s)
      </button>
    </div>
  );
};

export default Counter;
