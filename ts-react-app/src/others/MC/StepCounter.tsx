import { useRef, useState } from "react";
import DynamicButton from "./DynamicButton";
interface CounterProps {
  initialValue: number;
}

const StepCounter = ({ initialValue = 0 }: CounterProps) => {
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(1);

  const ref = useRef<HTMLInputElement | null>(null);

  const handleIncrement = () => {
    if (count + step >= 100) setCount(100);
    else setCount((previous) => previous + step);
  };
  const handleDecrement = () => {
    if (count - step <= 0) setCount(0);
    else setCount((previous) => previous - step);
  };
  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) setStep(value);
  };
  return (
    <div>
      <p>{count}</p>
      {/* <button disabled={count >= 100 ? true : false} onClick={handleIncrement}>
        Increment
      </button>
      <button disabled={count <= 0 ? true : false} onClick={handleDecrement}>
        Decrement
      </button> */}
      <DynamicButton
        variant="primary"
        label="Increament"
        disabled={count >= 100 ? true : false}
        onClick={handleIncrement}
      />
      <DynamicButton
        variant="primary"
        label="Decreament"
        disabled={count <= 0 ? true : false}
        onClick={handleDecrement}
      />

      <p>Current Step value : {step}</p>
      <input type="number" ref={ref} value={step} onChange={handleStepChange} />
    </div>
  );
};

export default StepCounter;
