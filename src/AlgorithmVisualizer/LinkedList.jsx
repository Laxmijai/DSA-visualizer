import React from "react";
import { FiChevronRight } from "react-icons/fi";

const LinkedList = () => {
  const types = ["Singly Linked List", "Doubly Linked List", "Circular Linked List"];
  const operations = ["Traversal", "Insertion", "Deletion", "Searching", "Reverse", "Merge", "Comparison"];
  // you can adjust operations list according to what you want to show

  const Card = ({ title }) => (
    <div
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
    </div>
  );

  return (
    <div className="w-full flex justify-center mt-14">
      <div
        className="
          p-10 w-full max-w-5xl
          bg-white
          shadow-2xl rounded-2xl
          transition-all duration-500 ease-in-out
          hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          hover:-translate-y-1 hover:scale-[1.01]
        "
      >
        {/* Linked List Heading */}
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiChevronRight className="text-blue-600 text-xl rotate-180" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Linked List</h1>
        </div>

        {/* Types Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded" />
            <h2 className="text-xl font-semibold text-gray-900">Types</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {types.map((t, i) => (
              <Card key={i} title={t} />
            ))}
          </div>
        </div>

        {/* Operations Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-blue-600 rounded" />
            <h2 className="text-xl font-semibold text-gray-900">Operations</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {operations.map((op, i) => (
              <Card key={i} title={op} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedList;
