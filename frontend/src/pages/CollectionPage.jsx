import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";
import SortOptions from "../components/Products/SortOptions"; // Make sure this exists
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductByFilters } from "../redux/slices/productsSlice";





const CollectionPage = () => {

  const { collection } = useParams();
  const [searchParams]= useSearchParams();
  const dispatch = useDispatch();
  const {products,loading, error} = useSelector((state)=> state.products)
  const queryParams = Object.fromEntries([...searchParams])

  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(()=>{
    dispatch(fetchProductByFilters({
      collection,...queryParams
    }))
  },[dispatch, collection, searchParams])

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

        <ProductGrid products={products}  loading=
        {loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
