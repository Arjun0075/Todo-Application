import Todo from "../model/todo.model.js";

export const createTodo = async(req, res) => {
    console.log(req.body)
    if(!req.body.text){
        res.status(400).json({message : "Please enter all mandatory fields"})
        return;
    }

    if(req.body.completed === true || req.body.completed === false){
        const todo = new Todo({
            text : req.body.text,
            completed : req.body.completed,
            user : req.body.user
        }) 
    
        try {
            const newTodo = await todo.save();
            res.status(201).json({message : "Todo Created Successfully", newTodo : newTodo})
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "Error occured while creating todo", newTodo  :newTodo})
        }
    }else {
        res.status(400).json({message : "Please enter all mandatory fields"})
    }
   
}

export const getAllTodo = async(req, res) => {
    try {
        console.log(req.body)
        const allTodo = await Todo.find({ user : req.body.user})
        res.status(200).json({message :"Todo Fetched successfully", allTodo})
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Error occured while fetching todos"})
    }
}

export const updateTodo = async(req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id , req.body , {new : true})
        res.status(201).json({message :"Todo updated successfully", todo})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Error occured todo update"})
    }
}

export const deleteTodo = async(req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({message :"Todo deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Error occured while deleting todo"})
    }
}