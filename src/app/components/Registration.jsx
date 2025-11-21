'use client'

import React,{useState} from 'react'
import Connection from '../utils/config/db';
import { registerUser } from '../serveractions/registrationform';
import Link from 'next/link';
import { redirect } from 'next/dist/server/api-utils';
import { Router } from 'next/router';
import { useRouter } from "next/navigation";

function Registration() {
    const [username,setusername]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const router=useRouter()

    const handleSubmit=async(e)=>{
        e.preventDefault();
        Connection();
        const formData={username,email,password};
        console.log(formData);
        const result = await registerUser(formData);
        console.log(result);
        if(result.success){
            alert(result.message);
            setusername('');
            setemail('');
            setpassword('');
            router.push('/login')
            
        }
        else{
            alert(result.message);
        }
    }

  return (
    <div>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setusername(e.target.value)} /><br/>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)} /><br/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)} /><br/>
            <button type="submit">Register</button>
        </form>
        <Link href="/login">Already have an account? Login here</Link>
    </div>
  )
}

export default Registration