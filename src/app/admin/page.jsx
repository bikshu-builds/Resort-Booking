import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation';
import Addproducts from '../components/Addproducts';

async function page() {
    const session =await auth();
    if (!session || session.role !== 'admin') {
        redirect('/login')
        return <div>Access Denied</div>
    }
  return (
    <div>
        <h1>Admin Dashboard - Holiday Resort</h1>
        <Addproducts/>
    </div>
  )
}

export default page