const router = require("express").Router();
const {
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoController");

router.get("/", getTodo);
router.post("/save", saveTodo);
router.patch("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
