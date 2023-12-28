import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Admin from './models/Admin.js'
import User from './models/User.js'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import productRouter from './routes/product.js'

const app = express()
app.use(express.json())
app.use(cors())

const MONGODBURL =
  "mongodb+srv://saranchakravarthy26:saran@mern.btfsbi4.mongodb.net/?retryWrites=true&w=majority";
  
mongoose.connect(MONGODBURL)
.then(()=>console.log("connected to MongoDB"))
.catch((error)=>console.log(error))

// app.get('/',async(req,res)=>{
//     try {
//        const datas = await Admin.find()
//        res.status(200).send(datas) 
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})