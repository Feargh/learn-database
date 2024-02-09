const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

/**
 * If we do not set DB_FILE env var creates an in-memory temp DB.
 * Otherwise connect to the DB contained in the file we specified (if it exists).
 * If it does not exist create a new DB file and connect to it.
 */
const db = new Database(process.env.DB_FILE);

/**
 * Make sure DB has the right structure by running schema.sql
 * This is responsible for creating the tables and columns we need
 * It should be safe to run every time
 */
const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);


// Insert a new task
const insertTask = db.prepare("INSERT INTO tasks (content) VALUES (?)");
insertTask.run("Eat a banana");

// Query and log all tasks
const selectTasks = db.prepare("SELECT * FROM tasks");
const tasks = selectTasks.all();
console.log(tasks);


// ...
// createTask("Eat a banana");
// const tasks = db.prepare("SELECT * FROM tasks").all();
// console.log(tasks);

// const result = createTask("Send mum flowers");
// console.log(result);

/**
 * Export the DB for use in other files
 */
module.exports = db;