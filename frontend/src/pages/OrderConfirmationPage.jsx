import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { checkout } = useSelector((state) => state.checkout); // Assuming `checkout` slice contains checkout data

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10); // Add 10 days
    return orderDate.toLocaleDateString();
  };

  if (!checkout) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <h1 className="text-2xl font-semibold text-center text-red-600">
          No order found.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You for Your Order!
      </h1>

      <div className="p-6 rounded-lg border">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Order ID: {checkout._id}</h2>
            <p className="text-sm text-gray-500">
              Ordered on: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Estimated delivery: {calculateEstimatedDelivery(checkout.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              Total: ${Number(checkout.total).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {checkout.checkoutItems?.map((item, index) => (
            <div key={index} className="flex items-center border-b pb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div>
                <h4 className="text-md font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} | Size: {item.size}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md">${Number(item.price).toFixed(2)}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
