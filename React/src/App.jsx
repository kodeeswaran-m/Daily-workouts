import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Routing from "./Aug-29/Routing";
import BrowserRouterComponent from "./Aug-30/BrowserRouter";
import HashRouterComponent from "./Aug-30/HashRouter";
import ProfilerWithUseCallback from "./Sept-02/ProfilerWithUseCallback";
import ErrorBoundaryComponent from "./Sept-02/ErrorBoundaryComponent";
import ErrorBoundary from "./Sept-02/ErrorBoundary";
import Counter from "./Sept-02/Counter";
import Portals from "./Sept-02/Portals";
import ToggleComponent from "./Sept-03/UseToggle";
import UseFetchComponent from "./Sept-03/UseFetchComponent";
import DashBoard from "./Sept-03/DashBoard";
import RecipesList from "./Sept-04/Async thunk/RecipesList";
import { Provider } from "react-redux";
import store from "./Sept-04/Async thunk/Store";
import CounterDashboard from "./Sept-04/Redux Thunk/CounterDashBoard";
import QuotesList from "./Sept-04/Async thunk/QuotesList";

export default function App() {
  return (
    <>
      {/* SEPT 04 */}
      <Provider store={store}>
        {/* <RecipesList /> */}
        <QuotesList/>
      </Provider>
      {/* <CounterDashboard /> */}

      {/* SEPT 03 */}
      {/* <ToggleComponent/> */}
      {/* <UseFetchComponent/> */}
      {/* <DashBoard/> */}

      {/* SEPT 02 */}
      {/* <ProfilerWithUseCallback/> */}
      {/* <ErrorBoundaryComponent />
      <ErrorBoundaryComponent /> */}
      {/* <ErrorBoundary><Counter/></ErrorBoundary>
      <ErrorBoundary><Counter/></ErrorBoundary> */}
      {/* <Portals/> */}

      {/* AUG 30 */}
      {/* <BrowserRouterComponent/> */}
      {/* <HashRouterComponent/> */}

      {/* AUG 29 */}
      {/* <Routing/> */}
    </>
  );
}
