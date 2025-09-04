import React from "react";
import Counter from "./Counter";
import { Provider } from "react-redux";
import  store  from "./store";

const CounterDashboard = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default CounterDashboard;
