const db = require("../database/db.js");

const insert_task = db.prepare("INSERT INTO tasks (content) VALUES (?)");

function createTask(content) {
  insert_task.run(content);
}

createTask("Eat a banana");
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);

module.exports = { createTask };