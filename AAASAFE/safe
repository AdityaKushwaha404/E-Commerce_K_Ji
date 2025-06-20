import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectiomSection from "../components/Products/GenderCollectiomSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";

const placeholdersProducts = [

  {
    name: "Classic Denim Jacket",
    price: 95,
    originalPrice: 120,
    description: "A timeless denim jacket for casual and cool looks.",
    brand: "UrbanWear",
    material: "Denim",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Classic Denim Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Classic Denim Jacket 2",
      },
    ],
  },
  {
    name: "Winter Puffer Coat",
    price: 180,
    originalPrice: 220,
    description: "Stay warm in this stylish and insulated puffer coat.",
    brand: "WarmStyle",
    material: "Polyester",
    sizes: ["M", "L", "XL"],
    colors: ["Navy", "Grey"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Winter Puffer Coat 1",
      },
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Winter Puffer Coat 2",
      },
    ],
  },
  {
    name: "Classic Denim Jacket",
    price: 95,
    originalPrice: 120,
    description: "A timeless denim jacket for casual and cool looks.",
    brand: "UrbanWear",
    material: "Denim",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Classic Denim Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Classic Denim Jacket 2",
      },
    ],
  },
  {
    name: "Winter Puffer Coat",
    price: 180,
    originalPrice: 220,
    description: "Stay warm in this stylish and insulated puffer coat.",
    brand: "WarmStyle",
    material: "Polyester",
    sizes: ["M", "L", "XL"],
    colors: ["Navy", "Grey"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Winter Puffer Coat 1",
      },
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Winter Puffer Coat 2",
      },
    ],
  },
  {
    name: "Leather Biker Jacket",
    price: 140,
    originalPrice: 175,
    description: "Ride in style with this rugged leather biker jacket.",
    brand: "MotoEdge",
    material: "Genuine Leather",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Leather Biker Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "Leather Biker Jacket 2",
      },
    ],
  },
  {
    name: "Windbreaker Hoodie",
    price: 65,
    originalPrice: 80,
    description: "Lightweight windbreaker hoodie, ideal for outdoor activities.",
    brand: "ActiveGear",
    material: "Nylon",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Green", "Blue"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=10",
        altText: "Windbreaker Hoodie 1",
      },
      {
        url: "https://picsum.photos/500/500?random=11",
        altText: "Windbreaker Hoodie 2",
      },
    ],
  },

  {
    name: "Leather Biker Jacket",
    price: 140,
    originalPrice: 175,
    description: "Ride in style with this rugged leather biker jacket.",
    brand: "MotoEdge",
    material: "Genuine Leather",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Leather Biker Jacket 1",
      },
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "Leather Biker Jacket 2",
      },
    ],
  },
  {
    name: "Windbreaker Hoodie",
    price: 65,
    originalPrice: 80,
    description:
      "Lightweight windbreaker hoodie, ideal for outdoor activities.",
    brand: "ActiveGear",
    material: "Nylon",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Red", "Green", "Blue"],
    images: [
      {
        url: "https://picsum.photos/500/500?random=10",
        altText: "Windbreaker Hoodie 1",
      },
      {
        url: "https://picsum.photos/500/500?random=11",
        altText: "Windbreaker Hoodie 2",
      },
    ],
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectiomSection />
      <NewArrivals />
      {/* BestSeller */}

      <h2 className="text-3xl font-bold text-center my-4">Best Seller</h2>

      <ProductDetails />

      <div className="container mx-auto">
        <h2 className=" text-3xl font-bold mb-4 ">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholdersProducts} />
      </div>

<FeaturedCollection
  title="Featured Collection"
  description="Explore handpicked items from our latest arrivals and bestsellers."
  products={placeholdersProducts.slice(0, 1)} // show only first 4 if needed
/>

<FeaturesSection/>
    </div>



  );
};

export default Home;
