import React, { useEffect, useState } from "react";
import Categoriescard from "../components/Categoriescard";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import Loader from "../components/Loader";
function Home() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setloader] = useState(false);
  const [carouselImages, setCarouselImages] = useState([
    "https://i.pinimg.com/originals/f6/70/e0/f670e036d26c7a32d33c76ce8a7895c7.jpg  ",
    "https://i.pinimg.com/originals/77/03/99/7703996c6677701660d3c6c108a00939.jpg",
    "https://i.pinimg.com/originals/96/53/f6/9653f6102b68c96dd8f59808b3ceed9d.jpg",
    "https://i.pinimg.com/736x/e3/af/65/e3af655f7a7ecc9b033353afc7f11ba5.jpg",
  ]);
  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const apiUrl =
          process.env.NODE_ENV === "production"
            ? "https://e-commerce-backend-il2s.onrender.com/product/getAllProductCategories"
            : "https://e-commerce-backend-il2s.onrender.com/product/getAllProductCategories";

        const res = await axios.get(apiUrl);
        const response = res.data;
        setCategories(response);
        setloader(true);
      } catch (error) {
        console.log("object")
      }
    };
    fetchcategory();
  }, []);
  return (
    <>
      {loader !== false ? (
        <div className="container mx-auto px-4">
          <div className="mb-4">
            <Carousel
              showThumbs={false}
              autoPlay
              interval={2000}
              infiniteLoop
              showStatus={false}
            >
              {carouselImages.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Carousel slide ${index}`}
                    className="w-full object-center h-96 "
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* Search Box */}
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Products Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories
              .filter((filteritem) =>
                filteritem.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((category) => (
                <Categoriescard key={category._id} product={category} />
              ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Home;
