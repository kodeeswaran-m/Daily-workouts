import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authReducer";
import type { RootState } from "../store/store";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

interface Expense {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
}

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const stored = localStorage.getItem("expenses");
    return stored
      ? JSON.parse(stored)
      : [
          // { id: 1, type: "income", category: "Salary", amount: 25000 },
          // { id: 2, type: "expense", category: "RENT", amount: 6000 },
          // { id: 3, type: "expense", category: "Food", amount: 5000 },
        ];
  });

  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalIncome - totalExpense;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || Number(amount) <= 0) return alert("Invalid data");
    const newExpense: Expense = {
      id: Date.now(),
      type,
      category,
      amount: Number(amount),
    };
    setExpenses([...expenses, newExpense]);
    setCategory("");
    setAmount("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleRemove = (id: number) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(filteredExpenses);
  };
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2>Welcome, {user?.username}</h2>
          <h4>Role: {user?.role}</h4>
          <h3>Total Remaining: ₹{remaining}</h3>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <form onSubmit={handleAddExpense}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(String(e.target.value))}
          style={{
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
        />
        <button type="submit">Add</button>
      </form>

      {/* <ul style={{ listStyleType: "none" }}>
        {expenses.map((expense) => (
          <div>
            <li key={expense.id}>
              {expense.type === "income" ? (
                <BanknoteArrowUp />
              ) : (
                <BanknoteArrowDown />
              )}
              {expense.category}: ₹{expense.amount}
            </li>
            <button onClick={()=>handleRemove(expense.id)}>remove</button>
          </div>
        ))}
      </ul> */}
      {expenses.length!==0 && (
        <table
          style={{ width: "100%", backgroundColor: "white", margin: "10px" }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#bebebeff",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px" }}>Type</th>
              <th style={{ padding: "12px" }}>Category</th>
              <th style={{ padding: "12px" }}>Amount</th>
              <th style={{ padding: "12px" }}></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                style={{
                  borderBottom: "1px solid #fff",
                  backgroundColor:
                    expense.type === "income" ? "#b9f2d4ff" : "#ffd2d2ff",
                }}
              >
                <td>{expense.type}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>
                  <button
                    onClick={() => handleRemove(expense.id)}
                    style={{ backgroundColor: "grey", border: "none" }}
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import type { RootState } from "../store/store";
// import { logout } from "../store/authReducer";

// const Dashboard = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout=() => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h2>Welcome - {user?.username}</h2>
//       <h4>Role:{user?.role}</h4>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Dashboard;
