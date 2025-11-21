"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function ProductCollection() {
  const [collections, setcollections] = useState([]);

  const collectionHandler = async () => {
    const res = await fetch('/api/admin/add-product');
    const data = await res.json();
    setcollections(data);
  };

  useEffect(() => {
    collectionHandler();
  }, []);

  return (
    <div>
      {collections.length > 0 ? (
        collections.map((item) => (
          <div key={item._id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <img src={item.image} alt={item.title} width="200" />
        <Link href={`components/detail/${item._id}`}>viewProducts
          </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductCollection;
