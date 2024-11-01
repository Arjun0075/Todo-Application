import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    console.log("Register new user")
    try {
        const {username , email , password} = req.body;
        console.log(username , email , password)

        const user = await User.findOne({email : email})
        if(user) {
            res.status(400).json({message : "User already exists"})
            return;
        }
        const hashPassword = await bcrypt.hash(password , 5)
        const newUser = new User ({username , email, password : hashPassword})
        await newUser.save()
        if(newUser) {
            res.status(201).json({message : "User registered successfully"})
        }
    } catch (error) {
        res.status(400).json({message : error})
    }
}


export const login = async (req, res) => {
    console.log("Login a user")

    const {email , password} = req.body
    try {
        if(!email || !password) {
            res.status(400).json({message : "Please enter a email and password"})
            return;
        }
    
        const user = await User.findOne({email}).select("+password")

        console.log(user)
    
        if(!user || !(await bcrypt.compare(password, user.password))){
            res.status(404).json({message : "Please enter valid email or password"})
            return
        }
    
        res.status(200).json({message : "User successfully logged in", user})
    } catch (error) {
        res.status(404).json({message : error})
    }

}

export const logout = (req, res) => {
    console.log("Logout a user")
    res.status(200).json({message :"User logged of successfully"})
}