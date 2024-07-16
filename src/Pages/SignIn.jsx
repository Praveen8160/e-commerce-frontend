import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../store/Authaction.js";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const Login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://e-commerce-backend-il2s.onrender.com/user/SignIn",
        {
          email: credentials.email,
          password: credentials.password,
        },
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      if (response.success) {
        dispatch(login());
        navigate("/");
      } else {
        toast.error("Enter valid credentials");
      }
    } catch (error) {
      toast.error("try again");
    }
  };
  const onchange = (e) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value });
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center">
      <div className="sm:flex bg-transparent shadow-2xl p-10 rounded-3xl ">
        {/* <ToastContainer /> */}
        <div className="sm:min-h-[500px] flex justify-center items-center">
          <img src={logo} className="sm:h-96 rounded-full" alt="" />
        </div>
        <div className="min-h-[500px] flex justify-center items-center">
          <form
            action=""
            onSubmit={Login}
            className="p-6 flex flex-col justify-center"
          >
            <h1 className="font-bold text-3xl sm:mb-6">Sign In</h1>
            <div className="flex flex-col mt-2 items-start">
              <label for="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={onchange}
                placeholder="Email"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start">
              <label for="password" className="font-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="name"
                value={credentials.password}
                onChange={onchange}
                placeholder="Password"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
