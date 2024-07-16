import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Productcard({ product }) {
  const [values, setValues] = useState([]);

  const addToCart = () => {
    const newvalue = {
      id: product._id,
      img: product.image,
      pname: product.title,
      description: product.description,
      price: product.price,
    };

    setValues((prevValues) => {
      const updatedValues = [...prevValues, newvalue];
      localStorage.setItem("Products", JSON.stringify(updatedValues));
      toast.success("Product added to cart!");
      return updatedValues;
    });
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("Products"));
    if (cart && cart.length > 0) {
      setValues(cart);
    }
  }, []);

  return (
    <div className="bg-white hover:scale-110 transition duration-700 rounded-lg mt-24 overflow-hidden shadow-xl">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-fill"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
        <h3 className="text-xl font-semibold mb-2">
          <span>₹</span>
          {product.price}
        </h3>
        <button
          className="text-white bg-yellow-900 hover:bg-yellow-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
          onClick={addToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default Productcard;
