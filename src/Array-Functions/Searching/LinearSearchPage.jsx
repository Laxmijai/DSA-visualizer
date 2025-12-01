import { useState } from "react";

function LinearSearchPage() {
  const [activeTab, setActiveTab] = useState("visual");
  const [array, setArray] = useState([14, 26, 33, 47, 58, 69]);
  const [arraySize, setArraySize] = useState(6);
  const [target, setTarget] = useState("");

  const [manualValue, setManualValue] = useState(""); // ✅ NEW → Manual Input State

  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState("normal");
  const [stepText, setStepText] = useState("");
  const [resultText, setResultText] = useState("");

  const getDelay = () => (speed === "slow" ? 900 : speed === "fast" ? 250 : 600);

  const generateRandomArray = (size) => {
    const s = Math.max(3, Math.min(size, 12));
    return Array.from({ length: s }, () => Math.floor(Math.random() * 90) + 10);
  };

  const handleGenerateArray = () => {
    const s = Number(arraySize) || 6;
    const safe = Math.max(3, Math.min(s, 12));
    setArraySize(safe);
    const arr = generateRandomArray(safe);
    setArray(arr);
    setCurrentIndex(null);
    setFoundIndex(null);
    setStepText("New array generated ✓");
    setResultText("");
  };

  const handleAddManual = () => {               // ⭐ NEW FEATURE
    if (!manualValue.trim()) return setStepText("Enter value first.");
    const num = Number(manualValue);
    if (isNaN(num)) return setStepText("Enter valid number.");
    setArray([...array, num]);
    setManualValue("");
    setStepText(`Value ${num} added to array.`);
  };

  const handleClear = () => {
    setArray([]);
    setCurrentIndex(null);
    setFoundIndex(null);
    setTarget("");
    setStepText("Array cleared.");
    setResultText("");
  };

  const handleReset = () => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setStepText("Visualization reset.");
    setResultText("");
  };

  const handleStart = async () => {
    if (isRunning) return;
    if (!array.length) return setStepText("Generate an array first.");
    if (!target.trim()) return setStepText("Enter a target value.");

    const t = Number(target);
    if (Number.isNaN(t)) return setStepText("Target must be a number.");

    setIsRunning(true);
    setCurrentIndex(null);
    setFoundIndex(null);
    setStepText(`Searching for ${t}...`);
    setResultText("");

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const stepDelay = getDelay();

    let found = -1;

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      setStepText(`Checking index ${i} → (${array[i]})`);
      await delay(stepDelay);

      if (array[i] === t) {
        found = i;
        setFoundIndex(i);
        setStepText(`🎉 Found ${t} at index ${i}`);
        setResultText(`Element ${t} found at index ${i}`);
        break;
      }
    }

    if (found === -1) {
      setStepText("🔍 Search completed — No match found.");
      setResultText(`Element ${t} not found ❌`);
    }

    setCurrentIndex(null);
    setIsRunning(false);
  };

  const linearSearchCode = `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`;

  return (
    <section className="min-h-screen pt-10 pb-10 bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="max-w-5xl mx-auto px-5">

        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-wide drop-shadow-md">
              Linear Search Visualizer
          </h1>
          <p className="mt-2 text-lg text-slate-700">
            Watch how each element is scanned step-by-step.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex w-max mx-auto overflow-hidden rounded-xl border shadow bg-white">
          <button onClick={() => setActiveTab("visual")}
            className={`px-6 py-2 font-semibold ${activeTab === "visual" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
            Visualization
          </button>

          <button onClick={() => setActiveTab("explain")}
            className={`px-6 py-2 font-semibold ${activeTab === "explain" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
            Explanation
          </button>
        </div>

        {/* ====================== VISUAL TAB ====================== */}
        {activeTab === "visual" && (
          <div className="mt-10 grid md:grid-cols-[360px,1fr] gap-10"> {/* Slightly Bigger 🟢 */}

            {/* CONTROL PANEL */}
            <div className="border bg-white p-7 rounded-2xl shadow-xl scale-[1.06] transition-all duration-300">
              <h2 className="text-xl font-bold text-slate-900 mb-4">⚙ Control Panel</h2>

              {/* Speed */}
              <p className="font-semibold text-sm mb-2">Animation Speed</p>
              <div className="flex gap-3 mb-6">
                {["slow", "normal", "fast"].map(sp => (
                  <button key={sp} disabled={isRunning} onClick={() => setSpeed(sp)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold border capitalize transition
                    ${speed === sp ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                    {sp}
                  </button>
                ))}
              </div>

              {/* Array Size */}
              <p className="font-semibold text-sm">Array Size (3–12)</p>
              <div className="flex gap-3 mt-1 mb-6">
                <input type="number" min="3" max="12" disabled={isRunning}
                  value={arraySize} onChange={(e) => setArraySize(e.target.value)}
                  className="w-24 px-3 py-2 border rounded-lg shadow-sm text-sm font-medium" />

                <button onClick={handleGenerateArray} disabled={isRunning}
                  className="flex-1 bg-slate-900 hover:bg-black text-white rounded-lg py-2 shadow font-semibold">
                  Generate Array
                </button>
              </div>

              {/* Manual Add ⭐ */}
              <p className="font-semibold text-sm">Add Manual Value</p>
              <div className="flex gap-3 mt-1 mb-6">
                <input type="number" disabled={isRunning}
                  value={manualValue}
                  onChange={(e) => setManualValue(e.target.value)}
                  placeholder="Enter value..."
                  className="w-28 px-3 py-2 border rounded-lg shadow-sm text-sm font-medium" />
                  
                <button onClick={handleAddManual} disabled={isRunning}
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-2 font-bold hover:bg-indigo-700">
                  ➕ Add
                </button>
              </div>

              {/* Target */}
              <p className="font-semibold text-sm">Search Target</p>
              <input type="number" disabled={isRunning} value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Enter search value"
                className="w-full px-3 py-2 mb-6 border rounded-lg shadow-sm font-medium" />

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button onClick={handleStart} disabled={isRunning}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg shadow-lg">
                  {isRunning ? "Searching..." : "▶ Start Searching"}
                </button>

                <div className="flex gap-3">
                  <button onClick={handleReset} disabled={isRunning}
                    className="flex-1 bg-yellow-300 rounded-lg py-2 font-bold">Reset</button>
                  <button onClick={handleClear} disabled={isRunning}
                    className="flex-1 bg-red-300 rounded-lg py-2 font-bold">Clear</button>
                </div>
              </div>
            </div>

            {/* ====================== VISUAL AREA (BIGGER) ====================== */}
            <div className="rounded-xl p-8 shadow-xl border bg-gradient-to-br from-indigo-400/20 via-purple-300/20 to-blue-300/20 backdrop-blur-xl scale-[1.03]">
              <h2 className="font-bold text-lg mb-4 text-slate-900">Visualization</h2>

              <div className="flex flex-wrap justify-center gap-6 items-end py-5">
                {array.map((val, i) => {
                  const active = i === currentIndex;
                  const found = i === foundIndex;

                  return (
                    <div key={i} className="flex flex-col items-center relative">
                      {active && <span className="absolute -top-6 text-xl animate-bounce">⬇</span>}

                      <div className={`w-16 h-32 flex items-center justify-center text-lg font-bold
                        rounded-xl duration-500 shadow-md transition-all
                        ${found ? "bg-green-500 text-white scale-110 shadow-2xl"
                        : active ? "bg-yellow-400 scale-110 shadow-xl"
                        : "bg-white border hover:scale-105"}`}>
                        {val}
                      </div>

                      <span className="text-xs mt-1 text-slate-600">index {i}</span>
                    </div>
                  );
                })}
              </div>

              {/* Step Info */}
              {stepText && (
                <div className="mt-4 py-2 px-3 rounded-md bg-slate-900 text-white text-center font-semibold">
                  {stepText}
                </div>
              )}

              {/* Result — Now Red if not found ❗ */}
              {resultText && (
                <p className={`mt-2 text-center text-lg font-bold 
                  ${resultText.includes("not") ? "text-red-600" : "text-green-600"}`}>
                  {resultText}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ====================== EXPLANATION TAB ====================== */}
        {activeTab === "explain" && (
          <div className="mt-10 space-y-8">

            <div>
              <h2 className="text-3xl font-bold">What is Linear Search?</h2>
              <p className="mt-2 text-lg text-slate-700">
                Linear search scans elements one-by-one until the target is found.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Algorithm Steps</h2>
              <ul className="mt-2 list-decimal list-inside text-lg space-y-1 text-slate-700">
                <li>Start from index 0</li>
                <li>Compare target with each element</li>
                <li>If equal → return index</li>
                <li>Else continue until end</li>
                <li>If no match → return -1</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Time Complexity</h2>
              <p className="mt-2 text-lg"><b>Worst Case →</b> O(n)</p>
              <p className="text-lg"><b>Best Case →</b> O(1)</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">Implementation (JS)</h2>
              <pre className="bg-slate-900 text-white p-4 rounded-lg mt-3 overflow-x-auto text-sm">
                {linearSearchCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LinearSearchPage;
