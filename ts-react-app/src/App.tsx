import { useActionState, useState, type ChangeEvent } from "react";
import "./App.css";
import Counter from "./components/Counter";
import FetchUsers from "./components/FetchUsers";
import SignUpForm from "./components/Form";
import TodoList from "./components/TodoList";
import ExpenseTracker from "./expenseTracker/ExpenseTracker";
import Button from "./others/Button";
import UserList from "./others/Awaited";
import FormField from "./others/ScenarioBasedCompts/DynamicFormField/FormField";
import ProductList from "./others/ScenarioBasedCompts/useFetch/ProductListPage";
import UserDetailForm from "./others/ScenarioBasedCompts/DynamicFormField/UserDetailForm";
import DynamicListPage from "./others/ScenarioBasedCompts/useFetch/DynamicListPage";
import DataDisplayPage from "./others/ScenarioBasedCompts/DynamicTable/DataDisplayPage";
import NotificationDemo from "./others/ScenarioBasedCompts/Notification/NotificationDemo";
import AuthForm from "./others/ScenarioBasedCompts/AuthForm/AuthForm";
import StepCounter from "./others/MC/StepCounter";
import AccordianDisplay from "./others/MC/Accordian";

function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {/* <Counter/> */}
      {/* <SignUpForm/> */}
      {/* <TodoList/> */}
      {/* <FetchUsers/> */}
      {/* <ExpenseTracker/> */}

      {/* Others */}
      {/* <Button variant={"primary"} onClick={()=>console.log("demo")}  /> */}
      {/* <UserList/> */}
      {/* <UserDetailForm/> */}
      {/* <ProductList/> */}
      {/* <DynamicListPage endpoint="products"/> */}
      {/* <DataDisplayPage endpoint="products"/> */}
      {/* <NotificationDemo/> */}
      {/* <AuthForm mode="login" email="" password="" onSubmit={(formData:any)=>console.log("Form Data", formData)}/> */}

      {/* Others MC */}
      {/* <StepCounter initialValue={0}/> */}
      <AccordianDisplay/>
    </div>
  );
}

export default App;
