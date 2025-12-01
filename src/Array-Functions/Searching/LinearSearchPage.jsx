import { useState } from "react";

function LinearSearchPage() {
  // Utility to generate random array of given size
  const generateRandomArray = (size) => {
    const n = Math.max(2, Math.min(size, 15)); // clamp between 2 and 15
    return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
  };

  const [arraySize, setArraySize] = useState(5);
  const [arr, setArr] = useState(() => generateRandomArray(5));
  const [target, setTarget] = useState("");
  const [foundIndex, setFoundIndex] = useState(null);
  const [message, setMessage] = useState("");

  const handleGenerateArray = () => {
    const sizeNumber = Number(arraySize) || 5;
    const safeSize = Math.max(2, Math.min(sizeNumber, 15));
    setArraySize(safeSize);
    setArr(generateRandomArray(safeSize));
    setFoundIndex(null);
    setMessage("");
  };

  const handleReset = () => {
    setTarget("");
    setFoundIndex(null);
    setMessage("");
  };

  const handleSearch = () => {
    if (target === "") {
      setMessage("Please enter a target value first.");
      setFoundIndex(null);
      return;
    }

    const numTarget = Number(target);
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === numTarget) {
        index = i;
        break;
      }
    }

    if (index === -1) {
      setFoundIndex(null);
      setMessage(`Element ${numTarget} not found in the array.`);
    } else {
      setFoundIndex(index);
      setMessage(`Element ${numTarget} found at index ${index}.`);
    }
  };

  const linearSearchCode = `// Linear Search in JavaScript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // index if found
    }
  }
  return -1; // not found
}

// example
const numbers = [10, 20, 30, 40, 50];
const target = 30;
const result = linearSearch(numbers, target);

if (result !== -1) {
  console.log("Element found at index:", result);
} else {
  console.log("Element not found");
}`;

  return (
    <section className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-10">
        {/* Breadcrumb + heading */}
        <div className="space-y-2">
          <div className="text-sm text-slate-500">Visualizer / Searching</div>

          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Linear Search
            </h1>
            <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
              Searching
            </span>
          </div>
        </div>

        {/* 🔝 Visualization section on top */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Visualize Linear Search
          </h2>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Use the controls below to generate an array of any size and search
            for a target value. The size of the array will depend on your input.
          </p>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
            {/* Array size and generate */}
            <div className="space-y-2">
              <p className="text-sm md:text-base font-semibold text-slate-600">
                Array Size
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="number"
                  min="2"
                  max="15"
                  value={arraySize}
                  onChange={(e) => setArraySize(e.target.value)}
                  className="w-32 rounded-lg border border-slate-300 px-3 py-2 text-base md:text-lg outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleGenerateArray}
                  className="px-4 py-2 text-base md:text-lg font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                >
                  Generate Array
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Minimum size: 2, Maximum size: 15
              </p>
            </div>

            {/* Array display */}
            <div className="space-y-2">
              <p className="text-sm md:text-base font-semibold text-slate-600">
                Array Elements
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {arr.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 min-w-[48px] rounded-lg border py-3 text-center text-base md:text-lg font-semibold ${
                      idx === foundIndex
                        ? "bg-green-100 border-green-400 text-green-800"
                        : "bg-slate-100 border-slate-300 text-slate-800"
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>

            {/* Target + actions */}
            <div className="space-y-2">
              <p className="text-sm md:text-base font-semibold text-slate-600">
                Target Element
              </p>
              <div className="flex flex-wrap gap-2">
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="Enter target"
                  className="flex-1 min-w-[140px] rounded-lg border border-slate-300 px-3 py-2 text-base md:text-lg outline-none focus:border-indigo-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 text-base md:text-lg font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Go
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-base md:text-lg font-semibold rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-100"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <p className="text-base md:text-lg text-slate-700 mt-2">
                {message}
              </p>
            )}
          </div>
        </section>

        {/* 📖 Theory sections (shown further down on scroll) */}

        {/* What is Linear Search */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What is Linear Search?
          </h2>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Linear search is a simple searching technique where each element in
            the list is checked one by one until the target value is found or
            the end is reached. If a match is found, the index is returned;
            otherwise, the element is not present.
          </p>
        </section>

        {/* How does it work */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            How does it work?
          </h2>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Consider an array like <code>[5, 3, 8, 1, 9]</code>. If you want to
            search for <code>8</code>, the algorithm:
          </p>

          <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-slate-700">
            <li>Starts at the first element.</li>
            <li>Moves through the array element by element.</li>
            <li>Compares each value with the target (here, 8).</li>
            <li>Stops when it finds a match and returns the index.</li>
            <li>
              If it never finds the value, it returns <code>-1</code>.
            </li>
          </ul>
        </section>

        {/* Algorithm Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Algorithm Steps
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-base md:text-lg text-slate-700">
            <li>Start from the first element.</li>
            <li>Compare the current element with the target.</li>
            <li>If they are equal, return the index.</li>
            <li>If not equal, move to the next element.</li>
            <li>If you reach the end, return -1.</li>
          </ol>
        </section>

        {/* Time Complexity */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Time Complexity
          </h2>

          <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-slate-700">
            <li>
              <span className="font-bold">Best Case:</span> O(1) — target is at
              the first position.
            </li>
            <li>
              <span className="font-bold">Worst Case:</span> O(n) — target is at
              the last position or not present.
            </li>
          </ul>

          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            Linear search works on both sorted and unsorted lists, but for large
            datasets it is slower than more efficient algorithms like binary
            search.
          </p>
        </section>

        {/* Implementation */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Linear Search Implementation
            </h2>

            <button className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-sm font-semibold">
              Copy Code
            </button>
          </div>

          {/* Language tabs (UI only) */}
          <div className="flex flex-wrap gap-2 text-sm font-semibold">
            <button className="px-3 py-1 rounded-full bg-slate-900 text-white">
              JavaScript
            </button>
            <button className="px-3 py-1 rounded-full bg-slate-100">
              Python
            </button>
            <button className="px-3 py-1 rounded-full bg-slate-100">
              Java
            </button>
            <button className="px-3 py-1 rounded-full bg-slate-100">
              C
            </button>
            <button className="px-3 py-1 rounded-full bg-slate-100">
              C++
            </button>
          </div>

          {/* Code block */}
          <div className="rounded-xl border border-slate-300 overflow-hidden bg-slate-900 text-slate-100">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="ml-2">linearSearch.js</span>
            </div>
            <pre className="p-4 text-sm md:text-base overflow-x-auto">
              <code>{linearSearchCode}</code>
            </pre>
          </div>
        </section>

        {/* Done / Explore */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Done with the learning?
          </h2>

          <button className="px-4 py-2 text-base md:text-lg font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            Mark as Done
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Explore other operations
          </h2>

          <a
            href="/visualizer/searching/binarysearch"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-slate-300 bg-white text-base md:text-lg font-semibold text-slate-800 hover:bg-slate-100"
          >
            Binary Search
          </a>
        </section>
      </div>
    </section>
  );
}

export default LinearSearchPage;
