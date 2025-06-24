import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PayPalButton from "./PayPalButton";
import { createCheckoutSession, resetCheckout } from "../../redux/slices/checkoutSlice";
import { mergeCart, fetchCart } from "../../redux/slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products: cartProducts, guestId, loading, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const { session } = useSelector((state) => state.checkout);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const hasMerged = useRef(false);

  // 🚨 Log when component mounts
  useEffect(() => {
    console.log("🏁 Checkout component mounted");
    dispatch(resetCheckout());
  }, [dispatch]);

  // 👤 Guest cart merge
  useEffect(() => {
    if (userInfo && guestId && !hasMerged.current) {
      hasMerged.current = true;
      console.log("🔀 Merging guest cart for user:", userInfo._id);
      dispatch(mergeCart({ guestId }))
        .unwrap()
        .then(() => {
          console.log("✅ Guest cart merged. Fetching new cart...");
          dispatch(fetchCart({ userId: userInfo._id }));
        })
        .catch((err) => {
          console.error("❌ Cart merge failed:", err);
        });
    }
  }, [userInfo, guestId, dispatch]);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      console.log("🚫 No user logged in. Redirecting to login...");
      navigate("/login?redirect=/checkout");
    }
  }, [userInfo, navigate]);

  // 🛒 Empty cart redirect
  useEffect(() => {
    if (userInfo && hasMerged.current && (!cartProducts || cartProducts.length === 0)) {
      console.log("🛒 Cart is empty. Redirecting to home...");
      navigate("/");
    }
  }, [userInfo, cartProducts, navigate]);

  const totalAmount = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🚀 Create checkout session
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    console.log("🧾 Create Checkout button clicked");

    if (!cartProducts || cartProducts.length === 0) {
      console.warn("⚠️ Cart is empty. Aborting checkout creation");
      return;
    }

    try {
      console.log("📦 Checkout data:", {
        checkoutItems: cartProducts,
        shippingAddress,
        paymentMethod: "PayPal",
        totalPrice: totalAmount,
      });

      const res = await dispatch(
        createCheckoutSession({
          checkoutItems: cartProducts,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: totalAmount,
        })
      ).unwrap();

      console.log("✅ Checkout session created:", res);
    } catch (err) {
      console.error("❌ Failed to create checkout session:", err);
    }
  };

  // 💳 Finalize checkout after payment
  const handleFinalizeCheckout = async (checkoutId) => {
    console.log("🏁 Finalizing checkout:", checkoutId);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );
      console.log("✅ Finalize checkout response:", res.data);
      if (res.status === 200) {
        navigate("/order-confirmation");
      }
    } catch (err) {
      console.error("❌ Finalize checkout error:", err);
    }
  };

  // 🪙 Handle PayPal success
  const handlePaymentSuccess = async (details) => {
    console.log("💰 Payment approved by PayPal:", details);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      console.log("✅ Payment recorded:", res.data);
      if (res.status === 200 && session?._id) {
        await handleFinalizeCheckout(session._id);
      } else {
        console.warn("⚠️ Payment success but session ID missing");
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
    }
  };

  // UI conditional logs
  useEffect(() => {
    if (session?._id) console.log("💡 Showing PayPal after checkout session created");
  }, [session]);

  if (loading) return <div>Loading cart...</div>;
  if (error)
    return <div>Error: {typeof error === "string" ? error : error.message || "Unexpected error"}</div>;
  if (!cartProducts || cartProducts.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <input
            type="email"
            value={userInfo?.email || ""}
            disabled
            className="w-full mb-4 p-2 border rounded bg-gray-100 cursor-not-allowed"
          />

          <h3 className="text-lg mb-4 mt-6">Shipping Details</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Address", key: "address", colSpan: true },
              { label: "City", key: "city" },
              { label: "Postal Code", key: "postalCode" },
              { label: "Country", key: "country" },
              { label: "Phone", key: "phone" },
            ].map(({ label, key, colSpan }) => (
              <div key={key} className={colSpan ? "lg:col-span-2" : ""}>
                <label className="block text-gray-700">{label}</label>
                <input
                  type="text"
                  value={shippingAddress[key]}
                  onChange={(e) =>
                    setShippingAddress((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full p-2 border rounded"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6">
            {!session?._id ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment
              </button>
            ) : (
              <>
                <h3 className="text-lg mb-4">Pay with PayPal</h3>
                <PayPalButton
                  amount={totalAmount}
                  onSuccess={handlePaymentSuccess}
                  onError={() => {
                    console.error("❌ PayPal failed");
                    alert("Payment failed. Try again.");
                  }}
                />
              </>
            )}
          </div>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cartProducts.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-2 border-b">
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p>${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-lg mt-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between text-xl font-semibold mt-2 border-t pt-4">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
