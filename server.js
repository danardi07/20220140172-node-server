const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // supaya bisa baca body JSON

// Data dummy
let todos = [
  { id: 1, task: "Belajar Node.js" },
  { id: 2, task: "Membuat API" },
];

// Endpoint root
app.get("/", (req, res) => {
  res.json({ message: "Hello from Node.js Server!" });
});

// GET semua tugas
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET tugas by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Tugas tidak ditemukan");
  res.json(todo);
});

// POST tambah tugas
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update tugas
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Tugas tidak ditemukan");

  todo.task = req.body.task;
  res.json(todo);
});

// DELETE hapus tugas
app.delete("/todos/:id", (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send("Tugas tidak ditemukan");

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

