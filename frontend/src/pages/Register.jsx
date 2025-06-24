import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";
import register from "../assets/register.webp";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, guestId ,loading} = useSelector((state) => state.auth);
  const { products: cartProducts } = useSelector((state) => state.cart);

  // ✅ Fix redirect with leading slash
  const redirectParam = new URLSearchParams(location.search).get("redirect");
  const redirect = redirectParam?.startsWith("/") ? redirectParam : "/";
  const isCheckoutRedirect = redirect === "/checkout";

  useEffect(() => {
    if (userInfo) {
      if (cartProducts?.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, userId: userInfo._id })).then(() => {
          navigate(redirect);
        });
      } else {
        navigate(redirect);
      }
    }
  }, [userInfo, cartProducts, guestId, navigate, redirect, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex border-b border-gray-300 flex-col md:flex-row min-h-[80vh]">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-xl font-medium">Rabbit</h2>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            Let's get started 🚀
          </h2>
          <p className="text-center mb-6 text-gray-600">
            Create an account to continue
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
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
            {loading? "loading..," :"Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500 font-medium underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={register}
          alt="Register visual"
          className="w-full h-full max-h-[80vh] object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
