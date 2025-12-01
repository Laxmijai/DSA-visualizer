import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";
const Array = () => {
  const searching = ["Linear Search", "Binary Search"];

  const sorting = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
  ];

  // Card Component (same as Stack & Queue)
  const Card = ({ title,to }) => (
    <NavLink
      to={to}
      
      className="
        group flex items-center justify-between
        px-6 py-4
        bg-white border rounded-xl shadow-md
        w-[260px] cursor-pointer

        transition-all duration-300 ease-in-out
        hover:bg-blue-50 hover:border-blue-600 hover:shadow-lg
      "
    >
      <span className="text-gray-800 font-medium group-hover:text-blue-700 transition-all duration-300 ease-in-out">
        {title}
      </span>

      <FiChevronRight
        className="text-gray-500 text-lg group-hover:text-blue-600 transition-all duration-300 ease-in-out"
      />
   
    

    </NavLink>
  );

  return (
    <div className="w-full flex justify-center mt-14">

      {/* OUTER CONTAINER with hover animation + strong shadow */}
      <div
        className="
          p-10 w-full max-w-5xl 
          bg-white 
          shadow-2xl rounded-2xl
          transition-all duration-500 ease-in-out

          hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          hover:-translate-y-1
          hover:scale-[1.01]
        "
      >

        {/* Array Heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiChevronRight className="text-blue-600 text-xl rotate-180" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Array</h1>
        </div>

        {/* Searching Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h2 className="text-xl font-semibold text-gray-900">Searching</h2>
          </div>
             
          <div className="flex flex-wrap gap-4">
            {searching.map((algo, i) => (
              <Card 
              key={i} 
              title={algo} 
               to={`/array/${algo.toLowerCase().replace(/ /g, "-")}`}
              />
            ))}
          </div>
         
        </div>

        {/* Sorting Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded"></div>
            <h2 className="text-xl font-semibold text-gray-900">Sorting</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {sorting.map((algo, i) => (
              <Card 
              key={i}
              title={algo} 
              to={`/array/${algo.toLowerCase().replace(/ /g, "-")}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Array;



