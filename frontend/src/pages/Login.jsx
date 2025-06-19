import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.webp"; // adjust if needed
import {loginUser} from "../redux/slices/authSlice"; // Import your login action if needed
import { useDispatch } from "react-redux"; // Import useDispatch if you want to dispatch

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Uncomment if you want to use Redux for login

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); // Dispatch login action if using Redux
    // Login logic here
    console.log({ email, password });
    console.log("🚀 Backend URL:", import.meta.env.VITE_BACKEND_URL);

  };

  return (
    <div className="flex border-b border-gray-300 flex-col md:flex-row min-h-[80vh]">
      {/* Login Form Left */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Hey there! 👋
          </h2>
          <p className="text-center mb-6 text-gray-600">
            Enter your username and password to Login
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={login}
          alt="Login visual"
          className="w-full h-full max-h-[80vh] object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
