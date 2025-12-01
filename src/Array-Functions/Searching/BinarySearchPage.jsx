import React, { useState, useRef } from "react";

function BinarySearchPage() {
  const [activeTab, setActiveTab] = useState("visual");

  const [array, setArray] = useState([12, 19, 27, 33, 41, 58, 66, 79]);
  const [manualInput, setManualInput] = useState("");
  const [arraySize, setArraySize] = useState(8);
  const [target, setTarget] = useState("");

  const [low, setLow] = useState(null);
  const [mid, setMid] = useState(null);
  const [high, setHigh] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stepText, setStepText] = useState("");
  const [resultText, setResultText] = useState("");

  const pauseRef = useRef(false);

  const STEP_DELAY = 1400;
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Generate random sorted array
  const handleGenerateArray = () => {
    if (isRunning) return;
    const s = Math.max(4, Math.min(Number(arraySize) || 8, 16));
    const arr = Array.from({ length: s }, () => Math.floor(Math.random() * 90) + 10).sort((a, b) => a - b);
    setArray(arr);
    setLow(null);
    setMid(null);
    setHigh(null);
    setFoundIndex(null);
    setStepText("Generated a new sorted array ✓");
    setResultText("");
  };

  // Manual array input
  const handleManualSubmit = () => {
    if (isRunning) return;
    if (!manualInput.trim()) {
      setStepText("Enter values separated by commas (e.g. 10,22,35).");
      return;
    }
    const parts = manualInput.split(",").map((p) => p.trim()).filter(Boolean);
    const nums = parts.map(Number);
    if (nums.some((n) => Number.isNaN(n))) {
      setStepText("Invalid input — use only numbers separated by commas.");
      return;
    }
    const sorted = nums.sort((a, b) => a - b);
    setArray(sorted);
    setManualInput("");
    setLow(null);
    setMid(null);
    setHigh(null);
    setFoundIndex(null);
    setResultText("");
    setStepText("Array updated from manual input and sorted ✓");
  };

  const handleClear = () => {
    if (isRunning) return;
    setArray([]);
    setManualInput("");
    setLow(null);
    setMid(null);
    setHigh(null);
    setFoundIndex(null);
    setStepText("Array cleared.");
    setResultText("");
  };

  const handleReset = () => {
    if (isRunning) return;
    setLow(null);
    setMid(null);
    setHigh(null);
    setFoundIndex(null);
    setStepText("Visualization reset.");
    setResultText("");
  };

  // Pause/resume
  const handlePauseResume = () => {
    pauseRef.current = !pauseRef.current;
    setIsPaused(pauseRef.current);
  };

  // Binary Search Visualization
  const handleStart = async () => {
    if (isRunning) return;
    if (!array.length) {
      setStepText("Generate or enter an array first.");
      return;
    }
    if (!target.toString().trim()) {
      setStepText("Enter a target value.");
      return;
    }
    const t = Number(target);
    if (Number.isNaN(t)) {
      setStepText("Target must be a number.");
      return;
    }

    setIsRunning(true);
    pauseRef.current = false;
    setIsPaused(false);
    setStepText(`Starting binary search for ${t}...`);
    setResultText("");
    setLow(null);
    setMid(null);
    setHigh(null);
    setFoundIndex(null);

    let found = -1;
    let l = 0;
    let h = array.length - 1;

    setLow(l);
    setHigh(h);
    await sleep(STEP_DELAY);

    while (l <= h) {
      while (pauseRef.current) await sleep(300);

      setStepText(`Current search range: [${l} .. ${h}]`);
      setLow(l);
      setHigh(h);
      await sleep(STEP_DELAY);

      const m = Math.floor((l + h) / 2);
      setMid(m);
      setStepText(`Checking mid = ${m} → (${array[m]})`);
      await sleep(STEP_DELAY);

      if (array[m] === t) {
        found = m;
        setFoundIndex(m);
        setStepText(`🎉 Found ${t} at index ${m}`);
        setResultText(`Element ${t} found at index ${m}`);
        break;
      }

      if (t < array[m]) {
        setStepText(`${t} < ${array[m]} → discarding right half (indices ${m}..${h})`);
        await sleep(STEP_DELAY / 2);
        h = m - 1;
        setHigh(h);
      } else {
        setStepText(`${t} > ${array[m]} → discarding left half (indices ${l}..${m})`);
        await sleep(STEP_DELAY / 2);
        l = m + 1;
        setLow(l);
      }

      await sleep(STEP_DELAY);
    }

    if (found === -1) {
      setResultText(`❌ Element ${t} not found`);
      setStepText("Search completed — no match found.");
      setFoundIndex(null);
    }

    setLow(null);
    setMid(null);
    setHigh(null);
    setIsRunning(false);
    setIsPaused(false);
    pauseRef.current = false;
  };

  const binaryCode = `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`;

  const elementClass = (index) => {
    const lowShown = low;
    const highShown = high;
    if (foundIndex === index) return "found";
    if (typeof lowShown === "number" && typeof highShown === "number") {
      if (index < lowShown || index > highShown) return "excluded";
    }
    if (index === mid) return "mid";
    if (index === low) return "low";
    if (index === high) return "high";
    return "normal";
  };

  return (
    <section className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="max-w-5xl mx-auto px-5">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-wide drop-shadow-md">
           Binary Search Visualizer
          </h1>
          <p className="mt-2 text-lg text-slate-700">Watch how the search space shrinks step-by-step.</p>
        </header>

        {/* Tabs */}
        <div className="flex w-max mx-auto overflow-hidden rounded-xl border shadow bg-white">
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-6 py-2 font-semibold ${activeTab === "visual" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Visualization
          </button>
          <button
            onClick={() => setActiveTab("explain")}
            className={`px-6 py-2 font-semibold ${activeTab === "explain" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
          >
            Explanation
          </button>
        </div>

        {activeTab === "visual" && (
          <div className="mt-10 grid md:grid-cols-[360px,1fr] gap-10">
            {/* Control Panel */}
            <div className="border bg-white p-7 rounded-2xl shadow-xl scale-[1.03]">
              <h2 className="text-xl font-bold text-slate-900 mb-4">⚙ Control Panel</h2>
              <p className="font-semibold text-sm mb-1">Enter Array (comma separated)</p>
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="e.g. 10, 22, 35, 47"
                disabled={isRunning}
                className="w-full px-3 py-2 border rounded-lg mb-3 text-sm"
              />
              <button
                onClick={handleManualSubmit}
                disabled={isRunning}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold mb-4"
              >
                Update Array
              </button>

              <p className="font-semibold text-sm">Array Size (4–16)</p>
              <div className="flex gap-3 mt-1 mb-4">
                <input
                  type="number"
                  min="4"
                  max="16"
                  value={arraySize}
                  onChange={(e) => setArraySize(e.target.value)}
                  disabled={isRunning}
                  className="w-24 px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={handleGenerateArray}
                  disabled={isRunning}
                  className="flex-1 bg-slate-900 hover:bg-black text-white rounded-lg py-2 font-semibold"
                >
                  Generate Array
                </button>
              </div>

              <p className="font-semibold text-sm mb-1">Target Value</p>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={isRunning}
                placeholder="Enter target..."
                className="w-full px-3 py-2 border rounded-lg mb-4 text-sm"
              />

              <button
                onClick={handleStart}
                disabled={isRunning}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold mb-3"
              >
                {isRunning ? "Searching..." : "▶ Start Search"}
              </button>

              {/* Single Pause/Resume Button */}
              {isRunning && (
                <button
                  onClick={handlePauseResume}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg font-bold mb-3"
                >
                  {isPaused ? "▶ Resume" : "⏸ Pause"}
                </button>
              )}

              <div className="flex gap-3 mt-3">
                <button onClick={handleReset} disabled={isRunning} className="flex-1 bg-yellow-300 rounded-lg py-2 font-bold">
                  Reset
                </button>
                <button onClick={handleClear} disabled={isRunning} className="flex-1 bg-red-300 rounded-lg py-2 font-bold">
                  Clear
                </button>
              </div>
            </div>

            {/* Visualization Area */}
            <div className="rounded-xl p-8 shadow-xl border bg-gradient-to-br from-indigo-400/20 via-purple-300/20 to-blue-300/20 backdrop-blur-xl scale-[1.02]">
              <h2 className="font-bold text-lg mb-4 text-slate-900">Visualization</h2>

              <div className="flex flex-wrap justify-center gap-6 items-end py-5 relative">
                {array.map((val, i) => {
                  const cls = elementClass(i);
                  const base = "w-16 h-32 flex items-center justify-center text-lg font-bold rounded-xl transition-all";
                  const stateClass =
                    cls === "found"
                      ? "bg-green-500 text-white scale-110 shadow-2xl"
                      : cls === "mid"
                      ? "bg-yellow-400 text-black scale-105 shadow-xl"
                      : cls === "low"
                      ? "bg-blue-300 text-black shadow"
                      : cls === "high"
                      ? "bg-purple-300 text-black shadow"
                      : cls === "excluded"
                      ? "bg-red-300/60 text-red-700 border border-red-300 scale-[0.85] blur-[1px] translate-y-2 duration-700 ease-out"
                      : "bg-white border";

                  return (
                    <div key={i} className="flex flex-col items-center relative">
                      {i === mid && (
                        <div className="absolute -top-6">
                          <div className="px-2 py-1 rounded-full bg-yellow-400 text-black font-semibold shadow animate-bounce">
                            M
                          </div>
                        </div>
                      )}
                      {i === low && (
                        <div className="absolute -top-10 left-0 -translate-x-1/2">
                          <div className="px-2 py-1 rounded-full bg-blue-600 text-white font-semibold shadow-lg transform transition-all duration-700">
                            L
                          </div>
                        </div>
                      )}
                      {i === high && (
                        <div className="absolute -top-10 right-0 translate-x-1/2">
                          <div className="px-2 py-1 rounded-full bg-purple-600 text-white font-semibold shadow-lg transform transition-all duration-700">
                            H
                          </div>
                        </div>
                      )}

                      <div className={`${base} ${stateClass}`}>{val}</div>
                      <span className="text-xs mt-2 text-slate-600">index {i}</span>
                    </div>
                  );
                })}
              </div>

              {stepText && <div className="mt-3 px-4 py-2 rounded bg-slate-900 text-slate-100 text-sm font-semibold text-center">{stepText}</div>}
              {resultText && (
                <p className={`mt-2 text-center text-lg font-bold ${resultText.includes("not") ? "text-red-600" : "text-green-600"}`}>
                  {resultText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Explanation Tab */}
        {activeTab === "explain" && (
          <div className="mt-10 space-y-8">
            <section>
              <h2 className="text-3xl font-bold">What is Binary Search?</h2>
              <p className="mt-2 text-lg text-slate-700">
                Binary search finds a target value in a <strong>sorted array</strong> by repeatedly dividing the search space in half.
                It's efficient (O(log n)) because with every comparison it discards half of the remaining elements.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold">Algorithm Steps (what you see live)</h2>
              <ol className="list-decimal list-inside space-y-2 text-lg text-slate-700 mt-2">
                <li>Initialize <code>low = 0</code> and <code>high = n - 1</code>.</li>
                <li>Compute <code>mid = floor((low + high) / 2)</code> and check <code>arr[mid]</code>.</li>
                <li>If <code>arr[mid] === target</code>, the element is found (green).</li>
                <li>If <code>arr[mid] &lt; target</code>, discard left half → elements turn red with effect.</li>
                <li>If <code>arr[mid] &gt; target</code>, discard right half → elements turn red with effect.</li>
                <li>Repeat until <code>low &gt; high</code> (not found) or element is found.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold">Visualization Notes</h2>
              <ul className="list-disc list-inside space-y-2 text-lg text-slate-700 mt-2">
                <li>L, M, H pointers animate over the elements so you can watch them move.</li>
                <li>Excluded elements have red fade, shrink, blur, slide-down with smooth animation.</li>
                <li>Mid element highlighted yellow; found element green.</li>
                <li>All changes happen slowly so you can read the step text beneath the visual board.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold">Code</h2>
              <pre className="bg-slate-900 text-white p-4 rounded-lg mt-3 overflow-x-auto text-sm">
                {binaryCode}
              </pre>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}

export default BinarySearchPage;
