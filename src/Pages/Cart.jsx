import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("Products"));
    if (value) {
      setCart(value);
    }
  }, []);

  const deleteFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem("Products", JSON.stringify(newCart));
    setCart(newCart);
    toast.error("Product Removed From Cart");
  };

  const totalprice = cart.reduce((total, product) => total + product.price, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (isAuthenticated === false) {
      toast.warning("Login Your Account!");
      navigate("/SignIn");
    } else {
      try {
        const {
          data: { key },
        } = await axios.get(
          "https://e-commerce-backend-il2s.onrender.com/payment/rozarpayKey"
        );

        const paymentResponse = await axios.post(
          "https://e-commerce-backend-il2s.onrender.com/payment/razorpayPayment",
          { amount: totalprice },
          { headers: { "Content-Type": "application/json" } }
        );

        const res = paymentResponse.data;

        const options = {
          key,
          amount: res.order.amount,
          currency: "INR",
          name: "E-Commerce",
          description: "Total payment",
          image: "https://tse1.mm.bing.net/th?id=OIP.Bzz7HKbT66HZ3ql6AZE8eAHaHa&pid=Api&P=0&h=180",
          order_id: res.order.id,
          callback_url:
            "https://e-commerce-backend-il2s.onrender.com/payment/paymentverify",
          prefill: {
            name: "Praveen",
            email: "Praveen@gmail.com",
            contact: "9000090000",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          handler: async function (response) {
            const productDetails = {
              orderData: cart,
              orderDate: new Date().toDateString(),
            };
            try {
              const re = await axios.post(
                "https://e-commerce-backend-il2s.onrender.com/order/placeOrder",
                { ...response, ...productDetails },
                { withCredentials: true }
              );
              const respo = re.data;
              if (respo.success) {
                localStorage.removeItem("Products");
                setCart([]);
                toast.success("Your order has been placed successfully!");
                navigate("/myOrder");
              }
            } catch (error) {
              toast.error("Failed to pla order");
            }
          },
        };
        // console.log("Razorpay options:", options); // Log options for debugging

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        toast.error("Please Try Again");
      }
    }
  };

  return (
    <>
      {cart.length !== 0 ? (
        <div className="bg-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-11">
            <div className="flex flex-col lg:col-span-2 rounded-lg">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center mb-2 bg-gray-400 p-4 rounded-md"
                >
                  <div className="m-4">
                    <img
                      src={item.img}
                      className="rounded-md h-20 w-32"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col flex-grow ml-4 space-y-2">
                    <h1 className="text-lg font-semibold">{item.pname}</h1>
                    <p className="text-sm text-black">{item.description}</p>
                    <h3 className="text-lg font-semibold">
                      Price: <span>₹{item.price}</span>
                    </h3>
                  </div>
                  <button
                    className="mt-4 lg:mt-0 lg:ml-auto px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => deleteFromCart(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className="mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-black rounded-md"
                  onClick={handleCheckout}
                >
                  Place Order
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start h-52 p-4 bg-gray-400 text-black rounded-md">
              <h1 className="text-lg font-bold mb-2">Price Details</h1>
              <hr className="w-full border-t-2 border-gray-300 my-2" />
              <div className="w-full">
                <h1 className="text-xl font-semibold flex justify-between w-full">
                  <span>Total Price:</span>
                  <span>${totalprice}</span>
                </h1>
                <h1 className="text-xl font-semibold flex justify-between w-full mt-2">
                  <span>Delivery:</span>
                  <span>$50</span>
                </h1>
              </div>
              <hr className="w-full border-t-2 border-gray-300 my-2" />
              <h1 className="text-xl font-semibold flex justify-between w-full">
                <span>Total Amount:</span>
                <span>${(totalprice + 50).toFixed(2)}</span>
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 flex flex-col justify-center items-center gap-2 rounded-xl">
          <div>
            <img
              src="https://img.freepik.com/free-vector/man-shopping-supermarket_74855-7612.jpg?size=626&ext=jpg&ga=GA1.1.1719067875.1720498573&semt=ais_user"
              alt=""
              className="lg:h-72 rounded-full lg:w-auto w-40 h-52 m-10"
            />
          </div>
          <div>
            <h2 className="text-3xl text-black font-semibold">
              Your Cart is Empty
            </h2>
            <p className="text-xl font-medium">
              Looks like you haven't added anything to your cart yet.
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

export default Cart;
