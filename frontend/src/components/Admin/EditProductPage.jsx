import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: name === "name" ? value.charAt(0).toUpperCase() + value.slice(1) : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: imageUrl }],
      }));
    }
  };

  const removeImage = (index) => {
    setProductData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Product Data:", productData);
    alert("✅ Product updated successfully!");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md bg-white">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price, SKU, Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Count in Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="block font-semibold mb-1">Colors (comma-separated)</label>
          <input
            type="text"
            name="colors"
            value={productData.colors.join(", ")}
            onChange={(e) =>
              setProductData((prev) => ({
                ...prev,
                colors: e.target.value.split(",").map((c) => c.trim()),
              }))
            }
            placeholder="e.g. Red, Blue, Green"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {productData.colors.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {productData.colors.map((color, index) => (
                <span
                  key={index}
                  className="inline-block w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Images</label>
          <label className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={`Product ${index}`}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 hidden group-hover:block"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
