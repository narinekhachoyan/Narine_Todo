require('dotenv').config();

const express = require("express");
const app = express();
const port = '4000';

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const { port } = process.env;

const todoRouter = require("./Routes/todo-router");

app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server working on port ${port}`);
});
