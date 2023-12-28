import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email:String,
    password:String
})

const User = mongoose.model('userlogin',UserSchema)

export default User