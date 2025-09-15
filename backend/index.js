import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = []; // in-memory array (no DB)

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.json(newTodo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ success: true });
});

// Local dev server
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
