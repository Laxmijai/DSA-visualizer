import React from 'react'

const Visualizer = () => {
  return (
    <div className="flex justify-center items-start pt-24 w-full">

      {/* Centered Content */}
      <div className="flex flex-col items-center text-center">

        <h1 className="text-6xl font-extrabold tracking-wide">
          <span className="text-black">DSA</span>{' '}
          <span className="text-blue-700">Visualizer</span>
        </h1>

        <p className="mt-4 text-xl text-gray-600 font-medium">
          Visualize data structures and algorithms step by step.
        </p>

        <div className="mt-10 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search algorithms..."
            className="px-4 py-2 border rounded-lg text-gray-800 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-4.35-4.35m1.85-5.4a7.25 7.25 0 11-14.5 0 7.25 7.25 0 0114.5 0z" 
              />
            </svg>
          </button>
        </div>

      </div>

    </div>
  )
}

export default Visualizer

