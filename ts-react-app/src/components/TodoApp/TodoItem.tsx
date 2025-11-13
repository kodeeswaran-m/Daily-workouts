import { useState, useRef, useEffect } from "react";
import type { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const editRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing) editRef.current?.focus();
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmed = editValue.trim();
    if (!trimmed) return onDelete(todo.id);
    onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #eee",
        borderRadius: "8px",
        padding: "10px",
        background: todo.completed ? "" : "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            ref={editRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#6b7280" : "#000",
            }}
            onDoubleClick={() => todo.completed === false && setIsEditing(true)}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => setIsEditing(true)}
          disabled={todo.completed === true}
          style={{
            background: "green",
            color: "#fff",
            border: "none",
            padding: "5px 8px",
            borderRadius: "6px",
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: "red",
            color: "#fff",
            border: "none",
            padding: "5px 8px",
            borderRadius: "6px",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
