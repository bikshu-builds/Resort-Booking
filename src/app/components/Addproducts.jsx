'use client'
import React, { useState } from "react";
import { ProductAction } from "../serveractions/productAction";

function Addproducts() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);
  const [amen, setAmen] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    const recordDetails={title,price,description,offer,amen,image}
 const data=new FormData();
  data.append("title",title);
  data.append("price",price);
  data.append("description",description);
  data.append("offer",offer);
  data.append("amen",amen);
  data.append("image",image);
    try {
      const response = await fetch('/api/admin/add-product', {
        method: "POST",
        body: data
      });
      if (response.status === 200) {
        alert("Product added successfully");
      }
      else{
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  };

  const buttonStyle = {
    padding: "12px 20px",
    marginTop: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const formStyle = {
    width: "400px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ ...inputStyle, height: "80px" }}
      ></textarea>

      <input
        type="text"
        placeholder="Offer"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Amenities"
        value={amen}
        onChange={(e) => setAmen(e.target.value)}
        style={inputStyle}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Add Product
      </button>
    </form>
  );
}

export default Addproducts;
