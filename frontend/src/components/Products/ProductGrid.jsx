import React from 'react';
import { Link } from "react-router-dom";

const ProductGrid = ({ products,loading,error }) => {
 if (loading) {
  return (
    <p>Loading products...</p>
  );
 }  
  if (error) {
    return (
      <p className="text-red-500">Error loading products: {error}</p>
    );
  }
  


  return (
    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <div key={index} className="group">
          {/* Image container with aspect ratio */}
          <Link to={`/product/${product._id}`} className="block">
          <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden rounded-xl mb-3">
            <img
              src={product.images[0].url}
              alt={product.images[0].altText}
              className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            {product.name}
          </h3>

          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-black">₹{product.price}</span>
            <span className="line-through text-gray-400 text-sm">₹{product.originalPrice}</span>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
