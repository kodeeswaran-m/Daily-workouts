import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./slices/counterSlice";
import { Button, Typography } from "@mui/material";
// import { decrement, increment, reset } from "../../slices/counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter.value);

  return (
    <>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Typography>{value}</Typography>

        <div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(increment())}
          >
            increment
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(decrement())}
          >
            decrement
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(reset())}
          >
            reset
          </Button>
        </div>
      </div>
    </>
  );
}

export default Counter;
