import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const newArrivals = [
  {
    _id: "1",
    name: "Stylish Jacket",
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }],
  },
  {
    _id: "2",
    name: "Modern T-Shirt",
    price: 60,
    images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Modern T-Shirt" }],
  },
  {
    _id: "3",
    name: "Casual Jeans",
    price: 80,
    images: [{ url: "https://picsum.photos/500/500?random=3", altText: "Casual Jeans" }],
  },
  {
    _id: "4",
    name: "Summer Dress",
    price: 90,
    images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Summer Dress" }],
  },
  {
    _id: "5",
    name: "Running Shoes",
    price: 150,
    images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Running Shoes" }],
  },
  {
    _id: "6",
    name: "Leather Boots",
    price: 180,
    images: [{ url: "https://picsum.photos/500/500?random=6", altText: "Leather Boots" }],
  },
  {
    _id: "7",
    name: "Denim Jacket",
    price: 110,
    images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Denim Jacket" }],
  },
  {
    _id: "8",
    name: "Floral Skirt",
    price: 75,
    images: [{ url: "https://picsum.photos/500/500?random=8", altText: "Floral Skirt" }],
  },
  {
    _id: "9",
    name: "Classic Hat",
    price: 45,
    images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Classic Hat" }],
  },
  {
    _id: "10",
    name: "Comfy Hoodie",
    price: 95,
    images: [{ url: "https://picsum.photos/500/500?random=10", altText: "Comfy Hoodie" }],
  },
];
// now goint to connect frontend with backend
const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const leftScroll = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(leftScroll < maxScrollLeft - 1); // margin for float precision
  };

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = direction === "left" ? -300 : 300;

    if (container) {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  // Drag Handlers
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    const container = scrollRef.current;
    if (!container || !isDragging) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // speed factor
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border bg-white text-black ${
              !canScrollLeft ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border bg-white text-black ${
              !canScrollRight ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="container mx-auto overflow-x-scroll flex space-x-6 cursor-grab active:cursor-grabbing scroll-smooth"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <Link to={`/product/${product._id}`} className="block">
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
            </div>
              </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;




// 2:7


// import React from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const newArrivals = [
//   {
//     _id: "1",
//     name: "Stylish Jacket",
//     price: 120,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=1",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "2",
//     name: "Modern T-Shirt",
//     price: 60,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=2",
//         altText: "Modern T-Shirt",
//       },
//     ],
//   },
//   {
//     _id: "3",
//     name: "Casual Jeans",
//     price: 80,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=3",
//         altText: "Casual Jeans",
//       },
//     ],
//   },
//   {
//     _id: "4",
//     name: "Summer Dress",
//     price: 90,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=4",
//         altText: "Summer Dress",
//       },
//     ],
//   },
//   {
//     _id: "5",
//     name: "Running Shoes",
//     price: 150,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=5",
//         altText: "Running Shoes",
//       },
//     ],
//   },
//   {
//     _id: "6",
//     name: "Leather Boots",
//     price: 180,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=6",
//         altText: "Leather Boots",
//       },
//     ],
//   },
//   {
//     _id: "7",
//     name: "Denim Jacket",
//     price: 110,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=7",
//         altText: "Denim Jacket",
//       },
//     ],
//   },
//   {
//     _id: "8",
//     name: "Floral Skirt",
//     price: 75,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=8",
//         altText: "Floral Skirt",
//       },
//     ],
//   },
//   {
//     _id: "9",
//     name: "Classic Hat",
//     price: 45,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=9",
//         altText: "Classic Hat",
//       },
//     ],
//   },
//   {
//     _id: "10",
//     name: "Comfy Hoodie",
//     price: 95,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?random=10",
//         altText: "Comfy Hoodie",
//       },
//     ],
//   },
// ];

// const scroll =(direction) => {
//     const scrollAmount=direction === 'left' ? -300 : 300;
//     scrollRef.current.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//     });
// }

// const updateScrollButtons = () => {
//   const container = scrollRef.current;
//   if (container) {
//     const leftScroll=container.scrollLeft;
//     const rightScrollable = container.scrollWidth - container.clientWidth - leftScroll;
//     setCanScrollLeft(leftScroll > 0);
//     setRightScrollable(rightScrollable)

//   }
// }



// useEffect(() => {
//     const container= scrollRef.current;
//     if (container) {
//         container.addEventListener("mousedown", handleMouseDown);
//         container.addEventListener("mouseleave", handleMouseLeave);
//         container.addEventListener("mouseup", handleMouseUp);
//         container.addEventListener("mousemove", handleMouseMove);
//         container.addEventListener("scroll", updateScrollButtons);
//         updateScrollButtons();
//     }
// }
// )


// const NewArrivals = () => {

//     const scrollRef = React.useRef(null);
//     const [isDreagging, setIsDragging] = React.useState(false);
//     const [startX, setStartX] = React.useState(0);
//     const [scrollLeft, setScrollLeft] = React.useState(false);
//     const [canScrollRight, setCanScrollRight] = React.useState(true);
//     const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  
//    return (
//   <section>
//     <div className="container mx-auto text-center mb-10 relative">
//       <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
//       <p className="text-lg text-gray-600 mb-8">
//         Discover the latest styles straight off the runway, freshly added to
//         keep your wardrobe on the cutting edge of fashion.
//       </p>
//       {/* Scroll Buttons */}
//       <div className="absolute right-0 bottom-[-30px] flex space-x-2">
//         <button onClick={()=> scroll("left")
//         }
//         disabled={!canScrollLeft}
//           className="p-2 rounded border bg-white text-black">
//           <FiChevronLeft className="text-2xl" />
//         </button>
//         <button className="p-2 rounded border bg-white text-black">
//           <FiChevronRight className="text-2xl" />
//         </button>
//       </div>
//     </div>

//     <div
//     ref= {scrollRef} className="container mx-auto overflow-x-scroll flex space-x-6 relative">
//   {newArrivals.map((product) => (
//     <div
//       key={product._id}
//       className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
//     >
//       <img
//         src={product.images[0]?.url}
//         alt={product.images[0]?.altText || product.name}
//         className="w-full h-[500px] object-cover rounded-lg"
//       />
//       <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
//         <Link to={`/product/${product._id}`} className="block">
//           <h4 className="font-medium">{product.name}</h4>
//           <p className="mt-1">${product.price}</p>
//         </Link>
//       </div>
//     </div>
//   ))}
// </div>

//   </section>
// );

  
// };

// export default NewArrivals;


