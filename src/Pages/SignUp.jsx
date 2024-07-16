import React from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      address: "",
      mobile: "",
    },
  });
  const Register = async (data) => {
    try {
      const res = await axios.post(
        "https://e-commerce-backend-il2s.onrender.com/user/SignUp",
        {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
          address: data.address,
          mobile: data.mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = res.data;
      if (response.success) {
        navigate("/SignIn");
        toast.success("Now Login Your Account");
      } else {
        alert("Fill all values");
      }
    } catch (error) {}
  };
  return (
    <div className="min-h-[700px] flex items-center justify-center">
      <div className="sm:flex bg-transparent shadow-2xl p-10 rounded-3xl my-7">
        <div className="sm:min-h-[500px] flex justify-center items-center">
          <img src={logo} className="sm:h-96 rounded-full" alt="" />
        </div>
        <div className="min-h-[500px] flex justify-center items-center">
          <form
            action=""
            onSubmit={handleSubmit(Register)}
            className="p-6 flex flex-col justify-center"
          >
            <h1 className="font-bold text-3xl sm:mb-6">Sign Up</h1>
            <div className="flex flex-col items-start">
              <label for="name" className="font-bold">
                Full Name
              </label>
              <input
                type="name"
                name="fullname"
                id="name"
                // onChange={onchange}
                // value={credentials.fullname}
                placeholder="Full Name"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                {...register("fullname", { required: "Enter your Name" })}
              />
              {errors.fullname && (
                <p className="text-red-700">{errors.fullname.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-2 items-start">
              <label for="email" className="font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                // onChange={onchange}
                // value={credentials.email}
                placeholder="Email"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                {...register("email", { required: "Enter your email" })}
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-2 items-start">
              <label for="password" className="font-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                // onChange={onchange}
                // value={credentials.password}
                placeholder="Password"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password length should be more than 5",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-2 items-start">
              <label for="address" className="font-bold">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                // onChange={onchange}
                // value={credentials.address}
                placeholder="Address"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                {...register("address", { required: "Enter your Address" })}
              />
              {errors.address && (
                <p className="text-red-700">{errors.address.message}</p>
              )}
            </div>
            <div className="flex flex-col mt-2 items-start">
              <label for="mobile" className="font-bold">
                Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                // onChange={onchange}
                // value={credentials.mobile}
                placeholder="Mobile"
                className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                {...register("mobile", {
                  required: "Enter your Mobile Number",
                })}
              />
              {errors.mobile && (
                <p className="text-red-700">{errors.mobile.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
            >
              Register
            </button>
            <p className="mt-2 font-medium">
              Already have an account?{" "}
              <Link to="/SignIn" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
