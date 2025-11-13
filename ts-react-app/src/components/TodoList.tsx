import { useState, type FormEvent } from "react";

interface TodoListItem {
  id: number;
  todo: string;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [todoInput, setTodoInput] = useState<string>("");
  const addTodo = (e:FormEvent) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    const newTodo: TodoListItem = {
      id: Date.now(),
      todo: todoInput,
    };
    setTodoList((prev) => [...prev, newTodo]);
    setTodoInput("")
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          name="todo item"
          placeholder="todo item"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todoList.map((todoitem) => (
          <li>
            {" "}
            {todoitem.id}-{todoitem.todo}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TodoList;