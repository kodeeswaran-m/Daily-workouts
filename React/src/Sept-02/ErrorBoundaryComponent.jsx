import { Button } from "@mui/material";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

function fallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
function ListComponent() {
  const [isBroke, setIsBroke] = useState(false);
if(isBroke)
throw new Error("Application is Broken..")

  return (
    <>
    <p>List Component</p>
    <Button variant="contained" onClick={()=>setIsBroke(!isBroke)}>broke</Button>
    </>
  );
}

function ErrorBoundaryComponent() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={fallbackComponent}
        onError={(error, info) =>
          console.error("error :", error, "info : ", info)
        }
      >
        <ListComponent />
      </ErrorBoundary>
    </>
  );
}
export default ErrorBoundaryComponent;