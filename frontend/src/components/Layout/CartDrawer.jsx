import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartContents from "../Cart/CartContents";

const CartDrawer = ({ cartOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);
  const guestId = useSelector((state) => state.cart.guestId);

  const userId = user ? user._id : null;

 const handleCheckout = () => {
  toggleCartDrawer();
  if (!user) {
    navigate("/login?redirect=/checkout"); // ✅ correct URL
  } else {
    navigate("/checkout");
  }
};

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform flex flex-col z-50 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer} className="text-gray-600">
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>

      {/* Cart Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {products?.length > 0 ? (
          <CartContents products={products} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Checkout Button */}
      {products?.length > 0 && (
        <div className="p-4 bg-white sticky bottom-0">
          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Checkout
          </button>
          <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
            Shipping, taxes, and discount codes calculated at checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
