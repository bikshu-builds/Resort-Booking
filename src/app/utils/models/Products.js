"use server"

import mongoose from "mongoose"

const ProductSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,

    },
    price:{
        type:Number,
        required:true
    },
    offer:{
        type:String,
    },
    amen:{
        type:String,
    },
    image:{
        type:String,
        required:true
    }
})
const Products=mongoose.models.products || mongoose.model("products",ProductSchema)
export default Products;