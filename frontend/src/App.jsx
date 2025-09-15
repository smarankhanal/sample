import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!input) return;
    const res = await fetch(import.meta.env.VITE_API_URL + "/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = async (id) => {
    await fetch(import.meta.env.VITE_API_URL + `/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Todo App</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
