import { useState, useEffect, useRef } from "react";

interface TodoFormProps {
  onAdd: (title: string) => void;
}

const TodoForm = ({ onAdd }:TodoFormProps) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid grey",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 12px",
          background: "grey",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
