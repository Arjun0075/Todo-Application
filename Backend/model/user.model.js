import mongoose, { Schema } from "mongoose";

const userSchema =  mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        select : true
    },
    password : {
        type : String,
        required : true,
        select : true
    }
})

const User = mongoose.model("Users" , userSchema)

export default User;