import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Hero from "../components/Layout/Hero";
import GenderCollectiomSection from "../components/Products/GenderCollectiomSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

// Redux Thunks
import {
  fetchProductByFilters,
  fetchBestSellerProduct,
} from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    bestSellerProduct,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      fetchProductByFilters({
        gender: "women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    dispatch(fetchBestSellerProduct());
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectiomSection />
      <NewArrivals />

      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-3xl font-bold text-center my-4">Best Seller</h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center text-gray-600">Loading best seller product...</p>
        )}
      </div>

      <div className="container mx-auto px-4 mt-10">
        <h2 className="text-3xl font-bold mb-4">Top Wears for Women</h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection
        title="Featured Collection"
        description="Explore handpicked items from our latest arrivals and bestsellers."
        products={products.slice(0, 4)}
      />

      <FeaturesSection />
    </div>
  );
};

export default Home;
