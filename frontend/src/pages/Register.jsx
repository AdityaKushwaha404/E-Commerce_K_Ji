import React, { useState } from "react";
import { Link } from "react-router-dom";
import register from "../assets/register.webp"; // adjust if needed
import {registerUser} from "../redux/slices/authSlice"; // Import your register action if needed
import {useDispatch} from "react-redux"; // Import useDispatch if you want to dispatch

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); // Uncomment if you want to use Redux for registration

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password })); // Dispatch register action if using Redux
    
    // Login logic here
    console.log({ name ,email, password });
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
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>
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
            Sign Up
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-blue-500 font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={register}
          alt="Login visual"
          className="w-full h-full max-h-[80vh] object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
