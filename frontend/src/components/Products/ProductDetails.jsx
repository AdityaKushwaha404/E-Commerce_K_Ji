import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";

import ProductGrid from "../Products/ProductGrid";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { productDetails, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ productId: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setMainImage(productDetails.images[0]);
    }
    if (productDetails?.sizes?.length > 0) {
      setSelectedSize(productDetails.sizes[0]);
    }
    if (productDetails?.colors?.length > 0) {
      setSelectedColor(productDetails.colors[0]);
    }
  }, [productDetails]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1500,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
    .unwrap() // ✅ Only handle success here
      .then(() => {
        toast.success("Product added to cart successfully!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  if (!productDetails) return null;

  return (
    <div className="p-6">
      {/* <Toaster position="top-center" richColors /> */}
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {productDetails.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-24 h-24 object-cover cursor-pointer rounded-lg border-3 ${
                  mainImage?.url === image.url ? "border-black" : "border-gray-100"
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

          <div className="md:w-1/2">
            {mainImage?.url && (
              <img
                src={mainImage.url}
                alt={mainImage.altText || "Main Product"}
                className="w-full h-auto object-cover rounded-lg border border-black mb-4"
              />
            )}
            <div className="flex md:hidden space-x-4 justify-center">
              {productDetails.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded-lg border ${
                    mainImage?.url === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{productDetails.name}</h1>
            <p className="text-gray-700 mb-4">{productDetails.description}</p>
            <div className="text-lg mb-2">
              <span className="text-red-600 font-semibold mr-2">₹{productDetails.price}</span>
              <span className="line-through text-gray-500">₹{(productDetails.price + 50).toFixed(2)}</span>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {productDetails.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? "bg-black text-white" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-2 mt-2">
                {productDetails.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-3 ${
                      selectedColor === color ? "border-black" : "border-gray-100"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter: "brightness(0.9)",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-700 font-medium mb-2">Quantity:</p>
              <div className="flex items-center w-fit">
                <button
                  className="text-xl px-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="w-8 text-lg text-center select-none">{quantity}</span>
                <button
                  className="text-xl px-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="mt-4 w-full max-w-xs px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isButtonDisabled ? "Adding..." : "Add to Cart"}
            </button>

            <div className="mt-4 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1 font-medium">Brand</td>
                    <td className="py-1">{productDetails.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-medium">Material</td>
                    <td className="py-1">{productDetails.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-10 container mx-auto mb-10">
            <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
            <ProductGrid
              title="Similar Products"
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
