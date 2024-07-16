import React, { useEffect, useState } from "react";
import Productcard from "../components/Productcard";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
function Product() {
  const { id } = useParams();
  const [product, setproduct] = useState([]);
  const [loader, setloader] = useState(true);
  const [category, setcategory] = useState("ALL PRODUCTS");

  useEffect(() => {
    const getProduct = async () => {
      setloader(true);
      try {
        const res = await axios.get(
          "https://e-commerce-backend-il2s.onrender.com/product/getAllProduct"
        );
        setproduct(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setloader(false);
      }
    };

    const getSingleCategoryProduct = async () => {
      setloader(true);
      try {
        const res = await axios.get(
          `https://e-commerce-backend-il2s.onrender.com/product/getSingleCategoryProduct/${id}`
        );
        setproduct(res.data.product);
        setcategory(res.data.category);
      } catch (error) {
        console.error("Error fetching single category product:", error);
      } finally {
        setloader(false);
      }
    };

    if (id) {
      getSingleCategoryProduct();
    } else {
      getProduct();
    }
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="flex flex-col items-center justify-center h-48 mt-5 bg-gray-200 rounded-3xl">
          <h1 className="font-bold text-3xl">
            {id ? category.toUpperCase() + " SHOP" : "ALL PRODUCTS"}
          </h1>
          <span className="font-bold">
            <Link to="/" className="underline">
              Home
            </Link>
            /{category}
          </span>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.map((item) => (
              <Productcard key={item._id} product={item}></Productcard>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
