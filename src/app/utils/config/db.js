'use server'
import mongoose from 'mongoose';

const Connection=async()=>{
    try{
        await mongoose.connect(process.env.mongourl);
        console.log("Database connected successfully")
    }catch(err){
        console.log("Database connection failed",err);
    }
}

export default Connection;