"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendercomponents from "../../calendercomponents";
import { bookingActions } from "@/app/serveractions/bookingActions";

export default function Page() {
  const { id } = useParams(); // dynamic id
  const [product, setProduct] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/admin/products/${id}`);
      const data = await res.json();
      setProduct(data.product);
    };

    if (id) getProduct();
  }, [id]);

  if (!product) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
const bookingHandler=async()=>{
  const res=await bookingActions(product,selectedDates);
  if(res.success){
    alert("Booked")
  }
  else{
    alert("Not Booked")
  }

}
const handleDateSelected=(bookingData)=>{
  setSelectedDates(bookingData);
  console.log("Dates selected in Detail Page:", bookingData);

}


  return (
    
    <>
    <Calendercomponents onDateSelected={handleDateSelected} />
    <Link href="/"><button>Back to Home</button></Link>
        <div
      style={{
        width: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>

      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Offer:</strong> {product.offer}</p>
      <p><strong>Category:</strong> {product.amen}</p>
      <button onClick={()=>{
        bookingHandler();
      }}>Book Now</button>
    </div>
    </>
  );
}
