import express from "express";
import dotenv from "dotenv";
import mongoose, { get } from "mongoose";
import Todo_router from "./routes/todo.route.js";
import User_router from "./routes/user.route.js";
import cors from "cors"

dotenv.config()
const server = express()
const port = process.env.port || 4001


// Miidlewares
server.use(express.json())
server.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    methods : "GET,POST,PUT, DELETE",
    allowedHeaders : ["Content-Type", "Authorization"]
}))


// Data base connection
try {
    await mongoose.connect(process.env.mongoDBUrl)
    console.log("Mongo Connected")
} catch (error) {
    console.log(error)
}

// routes

server.use("/todo", Todo_router)
server.use("/", User_router)

server.listen(port, () => {console.log("server is running at ", port)})