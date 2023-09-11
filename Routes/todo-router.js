const express = require("express");
const router = express.Router();

const {
  createTodo,
  changeStatus,
  changeDetails,
  deleteTodo,
  getAllTodos,
  getCompleted,
} = require("../Controllers/todo-controller");

router.post("/", createTodo);
router.get("/", getAllTodos);
router.put("/complete", changeStatus);
router.put("/:id", changeDetails);
router.delete("/:id", deleteTodo);
router.get("/completed", getCompleted);

module.exports = router;
