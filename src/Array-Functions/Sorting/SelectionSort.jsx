import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SelectionSort = () => {
  const [activeTab, setActiveTab] = useState("visualization");
  const [array, setArray] = useState([]);
  const [input, setInput] = useState("");
  const [speed, setSpeed] = useState(650);
  const [isSorting, setIsSorting] = useState(false);

  const [current, setCurrent] = useState(null);      // i pointer
  const [minIndex, setMinIndex] = useState(null);    // REAL minimum index
  const [jPointer, setJPointer] = useState(null);    // j pointer visual only

  const [sortedUpto, setSortedUpto] = useState(-1);
  const [stepInfo, setStepInfo] = useState("Click Start to begin.");
  const [passCount, setPassCount] = useState(0);

  const barRefs = useRef([]);
  const isSortingRef = useRef(false);

  // Generate random array
  const generateArray = () => {
    const arr = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 90) + 10
    );

    setArray(arr);
    setCurrent(null);
    setMinIndex(null);
    setJPointer(null);
    setSortedUpto(-1);
    setPassCount(0);

    setIsSorting(false);
    isSortingRef.current = false;

    setStepInfo("Random array generated. Click Start.");
  };

  useEffect(() => generateArray(), []);

  // Custom array
  const setCustomArray = () => {
    const nums = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    if (!nums.length) return alert("Enter a valid array");

    setArray(nums);
    setCurrent(null);
    setMinIndex(null);
    setJPointer(null);
    setSortedUpto(-1);
    setPassCount(0);

    setIsSorting(false);
    isSortingRef.current = false;

    setStepInfo("Custom array set. Click Start.");
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Selection Sort Logic
  const selectionSort = async () => {
    if (isSortingRef.current) return;

    setIsSorting(true);
    isSortingRef.current = true;

    let arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      if (!isSortingRef.current) return;

      setPassCount(i + 1);
      setCurrent(i);

      let min = i;
      setMinIndex(i); // first min

      setStepInfo(`Pass ${i + 1}: starting minimum = ${arr[i]}`);
      await sleep(speed);

      // Scan j
      for (let j = i + 1; j < arr.length; j++) {
        if (!isSortingRef.current) return;

        setJPointer(j); // move j pointer visually
        await sleep(speed);

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(j); // update popup + yellow min bar
          setStepInfo(`New minimum found → ${arr[min]}`);
        } else {
          setStepInfo(`Comparing ${arr[j]} with current min ${arr[min]}`);
        }
      }

      // Swap
      if (min !== i && isSortingRef.current) {
        setStepInfo(`Swapping ${arr[i]} ↔ ${arr[min]}`);
        await sleep(speed);

        const A = barRefs.current[i];
        const B = barRefs.current[min];

        if (A && B) {
          A.style.transform = "translate(20px, -25px)";
          B.style.transform = "translate(-20px, -25px)";
        }
        await sleep(speed);

        if (A && B) {
          A.style.transform = "translate(0,0)";
          B.style.transform = "translate(0,0)";
        }

        [arr[i], arr[min]] = [arr[min], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }

      // Mark sorted
      setSortedUpto(i);
      setStepInfo(`Index ${i} sorted.`);
      await sleep(speed);
    }

    setStepInfo("Array fully sorted 🎉");
    setIsSorting(false);
    isSortingRef.current = false;

    setCurrent(null);
    setMinIndex(null);
    setJPointer(null);
  };

  const pauseSorting = () => {
    setIsSorting(false);
    isSortingRef.current = false;
    setStepInfo("Paused");
  };

  return (
    <div className="w-full flex flex-col items-center p-6 mt-10 relative">

      <h1 className="text-4xl font-bold text-gray-900">Selection Sort</h1>
      <p className="text-gray-600 mt-1">Clean Visualization + Min Tracking + Arrows</p>

      {/* Tabs */}
      <div className="w-full max-w-4xl mt-8">
        <div className="flex bg-gray-100 rounded-xl shadow">
          <button
            onClick={() => setActiveTab("visualization")}
            className={`w-1/2 py-3 ${
              activeTab === "visualization"
                ? "bg-white shadow font-semibold"
                : "text-gray-500"
            }`}
          >
            Visualization
          </button>

          <button
            onClick={() => setActiveTab("explanation")}
            className={`w-1/2 py-3 ${
              activeTab === "explanation"
                ? "bg-white shadow font-semibold"
                : "text-gray-500"
            }`}
          >
            Explanation
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 mt-6">

        {/* ========================= VISUALIZATION ========================= */}
        {activeTab === "visualization" && (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* LEFT CONTROLS */}
            <div className="w-full lg:w-1/3 bg-white/80 border rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">⚙️ Controls</h2>

              <label className="font-semibold">Custom Array</label>
              <input
                type="text"
                placeholder="10, 45, 3, 28"
                className="w-full p-3 mt-2 border rounded-xl"
                onChange={(e) => setInput(e.target.value)}
              />

              <button
                onClick={setCustomArray}
                className="w-full mt-3 py-3 bg-blue-600 text-white rounded-xl"
              >
                ✔ Set Array
              </button>

              <button
                onClick={generateArray}
                className="w-full mt-4 py-3 bg-red-500 text-white rounded-xl"
              >
                🔄 Random Array
              </button>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={selectionSort}
                  disabled={isSorting}
                  className="flex-1 py-3 bg-green-600 disabled:bg-gray-400 text-white rounded-xl"
                >
                  ▶ Start
                </button>

                <button
                  onClick={pauseSorting}
                  className="flex-1 py-3 bg-gray-700 text-white rounded-xl"
                >
                  ⏸ Pause
                </button>
              </div>

              <label className="font-semibold mt-6 block">⏩ Speed</label>
              <input
                type="range"
                min="80"
                max="900"
                value={900 - speed}
                onChange={(e) => setSpeed(900 - Number(e.target.value))}
                className="w-full mt-3 accent-blue-600"
              />
            </div>

            {/* ===================== VISUALIZER ===================== */}
            <div className="w-full lg:w-2/3 flex flex-col items-center relative">

              {/* Bars Area */}
              <div className="w-full h-[350px] bg-gray-50 border rounded-xl p-6 pt-14 flex items-end justify-center gap-6 overflow-hidden">

                {array.map((value, index) => {
                  const isSorted = index <= sortedUpto;

                  return (
                    <div key={index} className="flex flex-col items-center">

                      {index === current && (
                        <p className="text-xs text-yellow-600 font-bold mb-1">⬇ i</p>
                      )}

                      {index === jPointer && (
                        <p className="text-xs text-yellow-600 font-bold mb-1">⬇ j</p>
                      )}

                      <motion.div
                        ref={(el) => (barRefs.current[index] = el)}
                        className={`w-10 rounded-t-md ${
                          isSorted
                            ? "bg-green-600"
                            : index === current || index === jPointer || index === minIndex
                            ? "bg-yellow-400"
                            : "bg-blue-400"
                        }`}
                        style={{ height: `${value * 3}px` }}
                        transition={{ type: "spring", stiffness: 120 }}
                      ></motion.div>

                      <p className="mt-2 font-semibold">{value}</p>
                      {isSorted && (
                        <p className="text-xs text-green-600 font-semibold">
                          Sorted
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* PASS + POPUP (equal spacing) */}
              <div className="w-full flex justify-between items-center mt-4 px-6">
                <p className="text-md font-semibold text-gray-700">
                  Pass: {passCount}
                </p>

                {minIndex !== null && isSortingRef.current && (
                  <div className="px-4 py-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-md shadow">
                    Current min: <b>{array[minIndex]}</b>
                  </div>
                )}
              </div>

              {/* Step Info */}
              <div className="mt-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-md w-full text-center text-lg font-semibold">
                {stepInfo}
              </div>
            </div>
          </div>
        )}

        {/* ========================= EXPLANATION TAB ========================= */}
        {activeTab === "explanation" && (
          <div className="text-lg text-gray-700">
            <h2 className="text-2xl font-bold mb-4">Selection Sort Explanation</h2>
            <p>
              Selection Sort finds the smallest element in each pass and places
              it at its correct sorted position.
            </p>
            <ul className="list-disc ml-6 mt-3 leading-8">
              <li>Select index i</li>
              <li>Scan the rest of the array with j</li>
              <li>Track the minimum found</li>
              <li>Swap minimum with index i</li>
              <li>Left portion grows sorted</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default SelectionSort;
