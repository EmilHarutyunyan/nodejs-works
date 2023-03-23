import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", (req, res) => {
  fs.promises.readFile(path.resolve("todo.json")).then((todos) => {
    res.send(todos);
  });
});

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

app.listen(3001);
