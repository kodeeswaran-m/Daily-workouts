import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import PublicRoute from "./components/publicRoute";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProtectedRoute from "./components/protectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

const ExpenseTracker = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute><LoginForm/></PublicRoute>}></Route>
        <Route path="/signup" element={<PublicRoute><SignupForm/></PublicRoute>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute roles={["user"]}><Dashboard/></ProtectedRoute>}></Route>
        <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard/></ProtectedRoute>}></Route>
        <Route path="*" element={<LoginForm/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default ExpenseTracker;
