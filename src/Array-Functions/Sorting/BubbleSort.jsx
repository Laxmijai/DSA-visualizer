import React, { useState, useEffect, useRef } from "react";

const BubbleSort = () => {
  const [activeTab, setActiveTab] = useState("visualization");

  const [array, setArray] = useState([50, 30, 70, 20, 90, 40]);
  const [input, setInput] = useState("");

  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [sortedIndex, setSortedIndex] = useState(array.length);

  const [swapInfo, setSwapInfo] = useState(null);
  const [showSwapPopup, setShowSwapPopup] = useState(null);

  const [stepInfo, setStepInfo] = useState("Click Start to begin.");

  // Corrected speed system
  const [speed, setSpeed] = useState(820); // real delay (higher delay = slow)

  const barRefs = useRef([]);

  // ---------------- RESET ----------------
  const resetArray = () => {
    const newArr = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArr);
    setI(0);
    setJ(0);
    setSortedIndex(newArr.length);
    setSwapInfo(null);
    setIsSorting(false);
    setShowSwapPopup(null);
    setStepInfo("Random array generated. Click Start.");
  };

  const setCustomArray = () => {
    const nums = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    if (!nums.length) {
      alert("Enter valid comma-separated numbers.");
      return;
    }

    setArray(nums);
    setI(0);
    setJ(0);
    setSortedIndex(nums.length);
    setSwapInfo(null);
    setIsSorting(false);
    setShowSwapPopup(null);
    setStepInfo("Custom array set. Click Start.");
  };

  // ---------------- SORTING LOGIC ----------------
  useEffect(() => {
    if (!isSorting) return;

    const n = array.length;
    let swapTimeout;

    const timeoutId = setTimeout(() => {
      if (i >= n - 1) {
        setIsSorting(false);
        setSortedIndex(0);
        setStepInfo("Sorting Completed 🎉");
        return;
      }

      const a = j;
      const b = j + 1;
      const newArr = [...array];

      if (j < n - i - 1) {
        setStepInfo(`Comparing ${newArr[a]} and ${newArr[b]}`);

        if (newArr[a] > newArr[b]) {
          // POPUP
          setShowSwapPopup({ a, b });
          setTimeout(() => setShowSwapPopup(null), 900);

          // ANIMATION
          setSwapInfo({ a, b });
          setStepInfo(`Swapping ${newArr[a]} ↔ ${newArr[b]}`);

          swapTimeout = setTimeout(() => {
            const temp = newArr[a];
            newArr[a] = newArr[b];
            newArr[b] = temp;

            setArray(newArr);
            setSwapInfo(null);
            setJ((prev) => prev + 1);
          }, speed);
        } else {
          setJ((prev) => prev + 1);
        }
      } else {
        const newSorted = n - i - 1;
        setSortedIndex(newSorted);
        setStepInfo(`Pass completed — index ${newSorted} sorted.`);
        setI((prev) => prev + 1);
        setJ(0);
      }
    }, speed);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(swapTimeout);
    };
  }, [isSorting, i, j, array, speed]);

  // ---------------- VIEW UI ----------------
  return (
    <div className="w-full flex flex-col items-center p-6 mt-10">

      {/* Popup animation */}
      <style>
        {`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-8px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 0.9s ease-in-out forwards;
        }
      `}
      </style>

      <h1 className="text-4xl font-bold text-gray-900">Bubble Sort</h1>
      <p className="text-gray-600 mt-1">Meet-in-Middle Swap + Popup + Correct Speed</p>

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

      {/* MAIN CARD */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-2xl p-8 mt-6">

        {/* ==================== VISUALIZATION ==================== */}
        {activeTab === "visualization" && (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* ---------------- LEFT PANEL ---------------- */}
            <div className="w-full lg:w-1/3 bg-white/80 border rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">⚙️ Controls</h2>

              <label className="font-semibold">Custom Array</label>
              <input
                type="text"
                placeholder="10, 45, 3, 28"
                className="w-full p-3 mt-2 rounded-xl border"
                onChange={(e) => setInput(e.target.value)}
              />

              <button
                onClick={setCustomArray}
                className="w-full mt-3 py-3 bg-blue-600 text-white rounded-xl"
              >
                ✔ Set Array
              </button>

              <button
                onClick={resetArray}
                className="w-full mt-4 py-3 bg-red-500 text-white rounded-xl"
              >
                🔄 Random Array
              </button>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setIsSorting(true)}
                  disabled={isSorting}
                  className="flex-1 py-3 bg-green-600 disabled:bg-gray-400 text-white rounded-xl"
                >
                  ▶ Start
                </button>
                <button
                  onClick={() => setIsSorting(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-black text-white rounded-xl"
                >
                  ⏸ Pause
                </button>
              </div>

              {/* Corrected Speed Slider */}
              <label className="font-semibold mt-6 block">⏩ Speed</label>

              <input
                type="range"
                min="80"
                max="900"
                value={900 - speed} // reversed slider
                onChange={(e) => setSpeed(900 - Number(e.target.value))}
                className="w-full mt-3 accent-blue-600"
              />

              <p className="text-sm text-gray-700 mt-1">
                {speed >= 650 ? "Slow" : speed >= 350 ? "Medium" : "Fast"}
              </p>
            </div>

            {/* ---------------- RIGHT VISUALIZER ---------------- */}
            <div className="w-full lg:w-2/3 flex flex-col items-center relative">

              {/* Popup */}
              {showSwapPopup && (
                <div className="
                  absolute top-2 left-1/2 -translate-x-1/2 
                  bg-white border border-blue-300 shadow-xl 
                  px-6 py-3 rounded-xl 
                  text-blue-700 font-semibold text-lg 
                  animate-fadeInOut z-20
                ">
                  Element <b>{array[showSwapPopup.a]}</b> is larger than{" "}
                  <b>{array[showSwapPopup.b]}</b> — swapping required!
                </div>
              )}

              {/* BARS */}
              <div className="w-full h-[350px] bg-gray-50 border rounded-xl p-6 flex items-end justify-center gap-6">
                {array.map((value, index) => {
                  const fullySorted = !isSorting && sortedIndex === 0;

                  const isComparing =
                    isSorting &&
                    j < array.length - i - 1 &&
                    (index === j || index === j + 1);

                  const isSorted = fullySorted || index >= sortedIndex;

                  const isSwapping =
                    swapInfo && (index === swapInfo.a || index === swapInfo.b);

                  // Meet-in-middle animation
                  let transform = "translate(0px, 0px)";
                  let transition = "transform 0.38s ease-in-out";

                  if (isSwapping) {
                    transform =
                      index === swapInfo.a
                        ? "translate(20px, -25px)"
                        : "translate(-20px, -25px)";
                  }

                  return (
                    <div key={index} className="flex flex-col items-center">
                      {isComparing && (
                        <p className="text-xs font-semibold text-yellow-600 mb-1">
                          Comparing
                        </p>
                      )}

                      <div
                        ref={(el) => (barRefs.current[index] = el)}
                        className={`w-10 rounded-t-md ${
                          isComparing
                            ? "bg-yellow-400"
                            : isSorted
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{
                          height: `${value * 3}px`,
                          transform,
                          transition,
                        }}
                      ></div>

                      <p className="mt-2 font-semibold">{value}</p>

                      {isSorted && !isComparing && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          Sorted
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step Text */}
              <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-md w-full text-center text-lg font-semibold">
                {stepInfo}
              </div>
            </div>
          </div>
        )}

        {/* ==================== EXPLANATION ==================== */}
        {activeTab === "explanation" && (
          <div className="text-gray-700 text-lg">
            <h2 className="text-2xl font-semibold mb-4">Bubble Sort Explanation</h2>
            <p>Bubble sort compares adjacent elements and swaps when needed.</p>
            <ul className="list-disc ml-6 mt-3">
              <li>Compare j and j+1</li>
              <li>Swap if needed</li>
              <li>Sorted section builds from right side</li>
              <li>Repeat passes until entire array is sorted</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default BubbleSort;
