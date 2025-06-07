import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MdClose } from "react-icons/md";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "../Common/SearchBar";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  useEffect(() => {
    // Lock scroll when mobile nav drawer is open
    document.body.style.overflow = navDrawerOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navDrawerOpen]);

  return (
    <>
      <nav
        className="container mx-auto flex items-center justify-between py-4 px-6"
        aria-label="Primary navigation"
      >
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/collections/all/?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all/?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all/?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="/collections/all/?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="hover:text-black" aria-label="Login">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            type="button"
            onClick={() => setDrawerOpen((prev) => !prev)}
            className="relative hover:text-black"
            aria-label="Toggle cart drawer"
            aria-expanded={drawerOpen}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button
            type="button"
            onClick={() => setNavDrawerOpen((prev) => !prev)}
            className="md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={navDrawerOpen}
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer cartOpen={drawerOpen} toggleCartDrawer={() => setDrawerOpen(false)} />

      <aside
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!navDrawerOpen}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={() => setNavDrawerOpen(false)}
            aria-label="Close navigation menu"
          >
            <MdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/"
              onClick={() => setNavDrawerOpen(false)}
              className="block text-gray-600 hover:text-black"
            >
              Home
            </Link>
            <Link
              to="/men"
              onClick={() => setNavDrawerOpen(false)}
              className="block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/women"
              onClick={() => setNavDrawerOpen(false)}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/top-wear"
              onClick={() => setNavDrawerOpen(false)}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/bottom-wear"
              onClick={() => setNavDrawerOpen(false)}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
