import { useEffect, useState } from "react";
import type { Todo } from "./types";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
const STORAGE_KEY = "todos";

const TodoApp= () => {
  const [tasks, setTasks] = useState<Todo[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "20px",
        background: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>To-Do List</h2>
      <TodoForm onAdd={addTask} />
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {tasks.length ? (
          tasks.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
        ) : (
          <li style={{ textAlign: "center", color: "#6b7280" }}>
            No tasks added yet! Add one above
          </li>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;
