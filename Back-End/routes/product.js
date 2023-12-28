import express from 'express'
import Product from '../models/Products.js'

const productRouter = express.Router()


productRouter.post('/postdata',async(req,res)=>{
    const data = new Product(req.body)
    try {
        const saveddata = await data.save()
        res.status(201).send(saveddata)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRouter.get('/',async(req,res)=>{
    try {
        const data = await Product.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRouter.get('/:id',async(req,res)=>{
    try {
        const data = await Product.findById(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)

    }
})

productRouter.put('/:id',async(req,res)=>{
    try {
        const data = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRouter.delete('/:id',async(req,res)=>{
    try {
        const data = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send("Deleted Succesfully")
    } catch (error) {
        res.status(500).send(error)

    }
})

export default productRouter