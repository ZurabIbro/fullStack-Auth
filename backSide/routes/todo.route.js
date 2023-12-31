const { todosController } = require("../controllers/todos.controller");
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/todos", todosController.getAllTodos);
router.post("/todos",authMiddleware, todosController.createTodo);
router.delete("/todos/:id", authMiddleware, todosController.deleteTodo);


module.exports = router;
