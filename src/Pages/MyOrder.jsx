import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAllOrder = async () => {
      const response = await axios.get("https://e-commerce-backend-il2s.onrender.com/order/myOrder", {
        withCredentials: true,
      });
      const res = response.data;
      setOrder(res.allOrders);
    };
    if (isAuthenticated === false) {
      toast.warning("Login Your Account!");
      navigate("/SignIn");
    } else {
      fetchAllOrder();
    }
  }, []);

  return (
    <>
      {order.length !== 0 ? (
        <div className="bg-gray-200 rounded-lg p-4">
          <h1 className="text-3xl font-bold font-serif mt-2 mb-4">
            Your Orders
          </h1>
          <div className="flex flex-col gap-6">
            {order.map((item) => (
              <div
                key={item._id}
                className="flex flex-col lg:grid lg:grid-cols-3 gap-4 bg-gray-300 p-4 rounded-lg"
              >
                <div className="flex justify-center items-center">
                  <img src={item.image} alt="" className="h-24 my-4" />
                </div>
                <div className="col-span-2 flex flex-col items-start gap-2">
                  <h1 className="text-lg font-semibold">
                    Name: {item.productName.substring(0, 75)}
                  </h1>
                  <h1 className="text-lg">Date: {item.orderDate}</h1>
                  <h1 className="text-lg">Price: ₹{item.price.toFixed(2)}</h1>
                  <h1 className="text-lg">Address: {item.address}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 flex flex-col justify-center items-center gap-4 p-6 rounded-xl">
          <div>
            <img
              src="https://img.freepik.com/premium-vector/shopping-carts-discount-vouchers-purchases-special-discount-notification-3d-illustration_68708-4036.jpg?size=626&ext=jpg&ga=GA1.1.1719067875.1720498573&semt=sph"
              alt=""
              className="h-72 rounded-full m-10"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl text-black font-semibold">
              Your Orders Await
            </h2>
            <p className="text-xl font-medium">
              It looks like your order history is as empty as a ghost town.
              Let's fill it up!
            </p>
            <button
              className="border rounded-md border-black p-2 m-2 hover:scale-105 bg-white font-medium hover:bg-transparent"
              onClick={() => {
                navigate("/products");
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrder;
