import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name:String,
    quantity:String,
    price:String,
})

const Product = mongoose.model('Product',ProductSchema)

export default Product