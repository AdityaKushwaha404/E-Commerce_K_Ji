import React from "react";
import { Link } from "react-router-dom"; // ✅ Add this import
import { TbBrandFacebook, TbBrandInstagram, TbBrandTwitter } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi"; // Corrected


const Footer = () => {
  return (
    <div>
      <footer className="mt-10 mx-10 border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
          {/* Newsletter section */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
            <p className="text-gray-500 mb-4">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>
            <p className="mb-4">Sign up and get 10% off your first order.</p>

            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-full text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-3 rounded-r text-sm hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Men's Top Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Women's Top Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Men's Bottom Wear
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Women's Bottom Wear
                </Link>
              </li>
            </ul>
          </div>


          {/* Support links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-500 transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>

            {/* Follow us section */}
             <div>
      <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
      <div className="flex items-center space-x-4 mb-6">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500"
        >
          <TbBrandFacebook className="h-5 w-5" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500"
        >
          <TbBrandInstagram className="h-5 w-5" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500"
        >
          <TbBrandTwitter className="h-5 w-5" />
        </a>
      </div>
      <p className="text-gray-500 ">Call Us</p>
      <p>
        <FiPhoneCall className="inline-block mr-2" />
        0123-456-789
      </p>
    </div>






        </div>
    {/* Footer Bottom  */}

    <div className="container mx-auto mt-12 px-4  lg:px-0 border-t border-gray-200 pt-6"> 
        <p className="text-gray-500 text-sm text-center tracking-tighter">
            @2025 Rabbit. All rights reserved. | Designed by Aditya Kushwaha
        </p>
    </div>
      </footer>
    </div>
  );
};

export default Footer;
