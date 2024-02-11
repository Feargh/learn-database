const express = require("express");
const server = express();
const model = require("./model/tasks.js");

server.use(express.urlencoded({ extended: false }));

server.get("/", (req, res) => {
    const tasks = model.listTasks();
    const list = tasks.map(Task);
    const body = /*html*/ `
      <!doctype html>
      <form method="POST">
        <input id="content" name="content" aria-label="New task" required>
        <button>Add task +</button>
      </form>
      <ul>${list.join("")}</ul>
    `;
    res.send(body);
});

server.post("/", (req, res) => {
  const task = {
    content: req.body.content,
    complete: 0,
  };
  model.createTask(task);
  res.redirect("/");
});

// server.get("/", (req, res) => {
//     const tasks = model.listTasks();
//     const body = /*html*/ `
//       <!doctype html>
//       <form method="POST">
//         <input id="content" name="content" aria-label="New task" required>
//         <button>Add task +</button>
//       </form>
//       <ul>${tasks.map((t) => `<li>${t.content}</li>`).join("")}</ul>
//     `;
//     res.send(body);
// });

server.post("/update", (req, res) => {
    const { action, id } = req.body;
    if (action === "remove") model.removeTask(id);
    if (action === "toggle") model.toggleTask(id);
    res.redirect("/");
});

function Task(task) {
    return /*html*/ `
      <li>
        <form method="POST" action="/update">
          <input type="hidden" name="id" value="${task.id}">
          <button name="action" value="toggle" aria-label="Toggle complete">
            ${task.complete ? "☑︎" : "☐"}
          </button>
          <span style="${task.complete ? "text-decoration: line-through" : ""}">
            ${task.content}
          </span>
          <button name="action" value="remove">&times;</button>
        </form>
      </li>
    `;
}
  
// server.get("/", (req, res) => {
//     const tasks = model.listTasks();
//     const list = tasks.map(Task);
//     const body = /*html*/ `
//       <!doctype html>
//       <form method="POST">
//         <input id="content" name="content" aria-label="New task" required>
//         <button>Add task +</button>
//       </form>
//       <ul>${list.join("")}</ul>
//     `;
//     res.send(body);
// });

module.exports = server;