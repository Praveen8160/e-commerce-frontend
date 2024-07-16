import React from "react";
import { Link } from "react-router-dom";
export default function Categoriescard({ product }) {
  return (
    <div className="bg-white hover:scale-110 transition duration-700 rounded-md overflow-hidden shadow-xl">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        </div>
      </Link>
    </div>
  );
}
