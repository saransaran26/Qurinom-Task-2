import express from 'express'
import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'
import jwt from 'jsonwebtoken'

const adminRouter = express.Router()


adminRouter.get('/',async(req,res)=>{
    try {
        const datas = await Admin.find()
        if(datas.length <= 0){
            return res.status(400).send("No Admin Found")
        }
        res.status(200).send(datas)
        console.log(datas);
    } catch (error) {
        res.status(500).send(error)
    }
})


adminRouter.post('/register',async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await Admin.findOne({email})
        if(user){
            return res.status(400).send("Admin already registerted")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const updateduser = new Admin({email,password:hashedPassword})
        await updateduser.save()
        res.status(200).send(updateduser)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

adminRouter.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await Admin.findOne({email})
        if(!user){
            return res.status(400).json({ error: "Admin not yet Registered" });
        }
        const matchedpass = await bcrypt.compare(password,user.password)
        if(!matchedpass){
            return res.status(401).json({ error: "Incorrect password" });
        }
        const token = jwt.sign({id:user._id},"GUVI@12")
        const {password:hashedPassword,...rest} = user._doc
        res.cookie('access token',token,{httpOnly:true}).status(200).send(rest)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default adminRouter