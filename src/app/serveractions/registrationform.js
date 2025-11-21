"use server"

import bcrypt from 'bcryptjs';
import User from '@/app/utils/models/User';
import Connection from '@/app/utils/config/db';
export async function registerUser(formData) {
    await Connection();
    const {username,email,password}=formData;

    if(!username || !email || !password)
    {
       return {success:false,message:"All fields are required."};
    }

    try{
        const existinguser=await User.findOne({email});
        if(existinguser){
            return {success:false,message:"User with this email already exists."};
    }
      const hashedPassword=await bcrypt.hash(password,10);
    const newuser=await new User({
        username,
        email,
        password: hashedPassword
    });
    await newuser.save();
    return {success:true,message:"User registered successfully."};
    } catch (error) {
        console.error("Registration error:", error);
        return {success:false,message:"Registration failed."};
    }
}
