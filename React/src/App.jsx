import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Routing from "./Aug-29/Routing";
import BrowserRouterComponent from "./Aug-30/BrowserRouter";
import HashRouterComponent from "./Aug-30/HashRouter";
import ProfilerWithUseCallback from "./Sept-02/ProfilerWithUseCallback";
import ErrorBoundaryComponent from "./Sept-02/ErrorBoundaryComponent";
import ErrorBoundary from "./Sept-02/ErrorBoundary";
import Counter from "./Sept-02/Counter";
import Portals from "./Sept-02/Portals";


export default function App() {
  return (
    <>
      {/* AUG 29 */}
      {/* <Routing/> */}

      {/* AUG 30 */}
      {/* <BrowserRouterComponent/> */}
      {/* <HashRouterComponent/> */}

      {/* SEPT 02 */}
      {/* <ProfilerWithUseCallback/> */}
      {/* <ErrorBoundaryComponent />
      <ErrorBoundaryComponent /> */}
      {/* <ErrorBoundary><Counter/></ErrorBoundary>
      <ErrorBoundary><Counter/></ErrorBoundary> */}
      <Portals/>
     

      </>
  );
}
