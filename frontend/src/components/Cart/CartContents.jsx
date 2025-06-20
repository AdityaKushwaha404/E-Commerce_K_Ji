import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../redux/slices/cartSlice";

const CartContents = ({ products, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity <= 0) return;

    dispatch(
      updateCartItem({
        userId,
        guestId,
        productId,
        quantity: newQuantity,
        size,
        color,
      })
    );
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      updateCartItem({
        userId,
        guestId,
        productId,
        quantity: 0,
        size,
        color,
      })
    );
  };

  return (
    <div>
      {products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b border-gray-300"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <p className="font-medium">
              ₹{(product.price * product.quantity).toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
              className="mt-2 text-red-600"
            >
              <RiDeleteBin3Line className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
