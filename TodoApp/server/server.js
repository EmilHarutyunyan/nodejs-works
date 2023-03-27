import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Get
app.get("/todos", (req, res) => {
  fs.promises.readFile(path.resolve("todo.json")).then((todos) => {
    res.send(todos);
  });
});

// Save
app.post("/todos", (req, res) => {
  fs.promises
    .writeFile(
      path.resolve("todo.json"),
      JSON.stringify(req.body, undefined, 2)
    )
    .then(() => {
      res.send("success");
    });
});

// Edits
app.put("/todos", (req, res) => {
  const todo = req.body
  const todos = fs.readFileSync(path.resolve("todo.json"));
  const fileTodos = JSON.parse(todos);
  const editTodos = fileTodos.map((item) => {
    if (item.id === todo.id) {
      return todo;
    }
    return item;
  });
  fs.writeFileSync(
    path.resolve("todo.json"),
    JSON.stringify(editTodos, undefined, 2)
  )
  res.json(editTodos);
    
});

// Delete
app.delete("/todos", (req, res) => {
  const todo = req.body;
  const todos = fs.readFileSync(path.resolve("todo.json"));
  const fileTodos = JSON.parse(todos);
  const editTodos = fileTodos.filter((item) => item.id !== todo.id);
  fs.writeFileSync(
    path.resolve("todo.json"),
    JSON.stringify(editTodos, undefined, 2)
  );
  res.json(editTodos);
});
app.listen(3001);
