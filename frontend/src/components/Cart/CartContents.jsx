import { RiDeleteBin3Line } from "react-icons/ri";
import React from 'react'

const CartContents = () => {
      const cartProducts = [
    {   productId: 1,
        name: 'Product 1',
        size:"M",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=1",
        },
    {   productId: 1,
        name: 'Product 1',
        size:"M",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=1",
        },
    {   productId: 1,
        name: 'Product 1',
        size:"M",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=1",
        },
    {   productId: 1,
        name: 'Product 1',
        size:"M",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=1",
        },
    {   productId: 2,
        name: 'Product 2',
        size:"L",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=2",
        },
    {   productId: 3,
        name: 'Product 3',
        size:"M",
        color: "Red",
        quantity: 2,
        price: 15,
        image:"https://picsum.photos/200?random=3",
        },
    
    
    ]
    return (

<div>
  {cartProducts.map((product, index) => (
    <div key={index} className="flex items-start justify-between py-4 border-b border-gray-300">
      <div className="flex items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-24 object-cover mr-4 rounded"
        />
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">
            Size: {product.size} | Color: {product.color}
          </p>
          <div className="flex items-center mt-2">
            <button className="border rounded px-2 py-1 text-xl font-medium">-</button>
            <span className="mx-4">{product.quantity}</span>
            <button className="border rounded px-2 py-1 text-xl font-medium">+</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-medium">${product.price.toLocaleString()}</p>
        <button className="mt-2 text-red-600">
          <RiDeleteBin3Line className="h-6 w-6" />
        </button>
      </div>
    </div>
  ))}
</div>

    );
};

export default CartContents
