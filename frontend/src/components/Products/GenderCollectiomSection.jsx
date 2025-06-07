import React from "react";
import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 bg-gray-50">
      <div className="container mx-auto flex flex-col md:flex-row gap-10">
        {/* Women's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-xl shadow-lg cursor-pointer">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[700px] md:h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-101"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Text Content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-extrabold mb-3 drop-shadow-lg">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="inline-block bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 group overflow-hidden rounded-xl shadow-lg cursor-pointer">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[700px] md:h-[600px] object-cover transform transition-transform duration-500 group-hover:scale-101"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Text Content */}
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-extrabold mb-3 drop-shadow-lg">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="inline-block bg-white text-gray-900 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
