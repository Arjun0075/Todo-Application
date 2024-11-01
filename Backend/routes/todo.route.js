import express from "express"
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controller/todo-controller.js"

const router = express.Router()

router.post("/create", createTodo)

router.post("/", getAllTodo)

router.put("/update/:id" , updateTodo)

router.delete("/delete/:id" , deleteTodo)

export default router