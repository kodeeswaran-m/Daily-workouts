import { Button, Typography } from "@mui/material";
import { useState } from "react"


function Counter(){
    const [count,setCount]=useState(0);

    if(count===5)
        throw new Error("Counter reached 5.");
    return (
        <>
        <Typography>{count}</Typography>
        <Button variant="contained" onClick={()=>setCount(count+1)}>click me:)</Button>
        </>
    )
}

export default Counter;