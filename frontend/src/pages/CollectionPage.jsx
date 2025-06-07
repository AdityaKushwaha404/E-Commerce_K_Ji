import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";
import SortOptions from "../components/Products/SortOptions"; // Make sure this exists

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Dummy products fetch
  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
  {
    name: "Urban Zip Jacket",
    price: 75,
    originalPrice: 90,
    brand: "MetroStyle",
    images: [
      {
        url: "https://picsum.photos/500/500?random=12",
        altText: "Urban Zip Jacket 1",
      },
    ],
  },
  {
    name: "Casual Cotton Hoodie",
    price: 55,
    originalPrice: 70,
    brand: "DailyWear",
    images: [
      {
        url: "https://picsum.photos/500/500?random=13",
        altText: "Casual Cotton Hoodie 1",
      },
    ],
  },
  {
    name: "Slim Fit Blazer",
    price: 110,
    originalPrice: 145,
    brand: "EliteThreads",
    images: [
      {
        url: "https://picsum.photos/500/500?random=14",
        altText: "Slim Fit Blazer 1",
      },
    ],
  },
  {
    name: "Rainproof Shell Jacket",
    price: 85,
    originalPrice: 100,
    brand: "OutdoorX",
    images: [
      {
        url: "https://picsum.photos/500/500?random=15",
        altText: "Rainproof Shell Jacket 1",
      },
    ],
  },
  {
    name: "Quilted Bomber Jacket",
    price: 120,
    originalPrice: 150,
    brand: "Skyline",
    images: [
      {
        url: "https://picsum.photos/500/500?random=16",
        altText: "Quilted Bomber Jacket 1",
      },
    ],
  },
  {
    name: "Retro Varsity Jacket",
    price: 100,
    originalPrice: 130,
    brand: "OldSchool",
    images: [
      {
        url: "https://picsum.photos/500/500?random=17",
        altText: "Retro Varsity Jacket 1",
      },
    ],
  },
  {
    name: "Softshell Track Jacket",
    price: 90,
    originalPrice: 110,
    brand: "SpeedWear",
    images: [
      {
        url: "https://picsum.photos/500/500?random=18",
        altText: "Softshell Track Jacket 1",
      },
    ],
  },
  {
    name: "Eco-Friendly Zip-Up",
    price: 60,
    originalPrice: 75,
    brand: "GreenFit",
    images: [
      {
        url: "https://picsum.photos/500/500?random=19",
        altText: "Eco-Friendly Zip-Up 1",
      },
    ],
  }
]

      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row relative min-h-screen bg-gray-50">
      {/* Mobile filter toggle */}
      <button
        onClick={toggleSidebar}
        aria-label="Filter Products"
        type="button"
        className="lg:hidden p-2 border m-2 flex items-center w-fit gap-2 bg-white z-50"
      >
        <FaFilter className="mr-1" />
        Filters
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-1/4`}
      >
        <FilterSidebar />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-grow p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl uppercase font-semibold">All Collection</h2>
          <SortOptions />
        </div>

        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default CollectionPage;
