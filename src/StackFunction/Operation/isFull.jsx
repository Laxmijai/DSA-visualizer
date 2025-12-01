// StackPage.jsx
import React, { useState } from "react";

const MAX_SIZE = 10;

export default function IsFull() {
  const [activeTab, setActiveTab] = useState("visualization");

  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [stackType, setStackType] = useState(null); 

  // animation / highlight state
  const [highlightIndex, setHighlightIndex] = useState(null); // index or -1 for whole stack
  const [highlightType, setHighlightType] = useState(null);   // "push" | "pop" | "check-empty" | "check-full" | null

  const top = stack.length ? stack[stack.length - 1] : "-";

  const clearHighlight = () => {
    setHighlightIndex(null);
    setHighlightType(null);
  };

  const handlePush = () => {
  const value = input.trim();

  if (!value) {
    setMessage("Please enter a value to push into the stack.");
    return;
  }

  // Detect if numeric or string
  const isNumber = !isNaN(value);
  const isString = isNaN(value);

  // If no type assigned yet → assign based on first input
  if (stackType === null) {
    setStackType(isNumber ? "number" : "string");
  }

  // Validation: block mixed types
  if (stackType === "number" && isString) {
    setMessage("Invalid input: Only numbers are allowed.");
    return;
  }

  if (stackType === "string" && isNumber) {
    setMessage("Invalid input: Only text strings are allowed.");
    return;
  }

  // Check stack size
  if (stack.length >= MAX_SIZE) {
    setMessage(`Cannot push: the stack is full (max size = ${MAX_SIZE}).`);
    setHighlightIndex(-1);
    setHighlightType("check-full");
    setTimeout(clearHighlight, 700);
    return;
  }

  // Push animation
  setStack((prev) => {
    const next = [...prev, value];
    const newIndex = next.length - 1;

    setHighlightIndex(newIndex);
    setHighlightType("push");
    setTimeout(clearHighlight, 700);

    return next;
  });

  setMessage(
    `Pushed “${value}” into the stack (${stackType === "number" ? "number" : "string"} mode).`
  );
  setInput("");
};

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage("Cannot pop: the stack is already empty.");
      return;
    }

    const poppedIndex = stack.length - 1;
    const poppedValue = stack[poppedIndex];

    setHighlightIndex(poppedIndex);
    setHighlightType("pop");
    setMessage(`Popping “${poppedValue}”...`);

    setTimeout(() => {
      setStack((prev) => prev.slice(0, -1));
      clearHighlight();
      setMessage(`Popped “${poppedValue}” from the stack.`);
    }, 700);
  };

  const handleIsEmpty = () => {
    if (stack.length === 0) {
      setMessage("Yes, the stack is empty.");
    } else {
      setMessage("No, the stack is not empty.");
    }

    setHighlightIndex(-1);
    setHighlightType("check-empty");
    setTimeout(clearHighlight, 700);
  };

  const handleIsFull = () => {
    if (stack.length >= MAX_SIZE) {
      setMessage(`Yes, the stack is full (size = ${MAX_SIZE}).`);
    } else {
      setMessage(
        `No, the stack is not full. Current size: ${stack.length}/${MAX_SIZE}.`
      );
    }

    setHighlightIndex(-1);
    setHighlightType("check-full");
    setTimeout(clearHighlight, 700);
  };

  const handleReset = () => {
  setStack([]);
  setInput("");
  setStackType(null);  
  clearHighlight();
  setMessage("Stack has been reset. You can now enter numbers or text.");
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 font-sans">
    
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-14">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Stack Visualisation
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-500">
            Use the control panel to perform operations and visualize the stack.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-full bg-slate-200 p-1">
            <button
              onClick={() => setActiveTab("visualization")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "visualization"
                  ? "bg-slate-900 text-white shadow"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Visualization
            </button>

            <button
              onClick={() => setActiveTab("explanation")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "explanation"
                  ? "bg-slate-900 text-white shadow"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Explanation
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "visualization" ? (
          <>
            {/* CONTROL PANEL + VISUALIZATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CONTROL PANEL */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 px-6 py-7">
                <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-xl">⚙️</span> Control Panel
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Choose an operation and see changes step-by-step.
                </p>

                {/* ADD ELEMENT */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Add Element
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Enter value"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none bg-slate-50 focus:ring-2 focus:ring-sky-300"
                    />
                    <button
                      onClick={handlePush}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-md hover:bg-indigo-700 hover:-translate-y-[1px] transition"
                    >
                      + Push
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Max stack size: {MAX_SIZE} elements.
                  </p>
                </div>

                {/* OPERATIONS */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Operations
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handlePop}
                      className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow hover:bg-sky-600 hover:-translate-y-[1px] transition"
                    >
                      Pop
                    </button>
                    <button
                      onClick={handleIsEmpty}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-semibold shadow hover:bg-amber-600 hover:-translate-y-[1px] transition"
                    >
                      Is Empty
                    </button>
                    <button
                      onClick={handleIsFull}
                      className="px-5 py-2.5 rounded-xl bg-purple-500 text-white text-sm font-semibold shadow hover:bg-purple-600 hover:-translate-y-[1px] transition"
                    >
                      Is Full
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold shadow hover:bg-rose-500 hover:-translate-y-[1px] transition"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* STEP MESSAGE */}
                <div className="mt-10">
                  <p className="text-lg font-bold text-black mb-2">
                    Step Explanation
                  </p>
                  <div className="min-h-[56px] px-4 py-3 rounded-2xl bg-slate-900 border border-sky-100 text-lg md:text-lg text-white shadow-sm">
                    {message ? (
                      message
                    ) : (
                      <span className="bg-slate-900 text-lg">
                        Perform an operation to see details here.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* VISUALIZATION CARD */}
              <div className="bg-gradient-to-br from-indigo-400/20 via-purple-300/20 to-blue-300/20 backdrop-blur-xl scale-[1.03] rounded-3xl shadow-xl border border-slate-100 px-6 py-7">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Visualization
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* STACK SHAPE */}
                  <div className="flex flex-col items-center">
                    <div className="border-[4px] border-slate-900 border-t-0 rounded-b-3xl h-[320px] w-[220px] flex flex-col-reverse overflow-hidden bg-white">
                      {stack.map((item, index) => {
                        const isTop = index === stack.length - 1;
                        const isItemHighlighted = index === highlightIndex;

                        // default
                        let color =
                          "bg-sky-300 text-white border-slate-300 scale-100";

                        // whole-stack checks
                        if (highlightType === "check-empty" && highlightIndex === -1) {
                          color =
                            "bg-amber-300 text-white border-amber-400 scale-[1.03]";
                        } else if (
                          highlightType === "check-full" &&
                          highlightIndex === -1
                        ) {
                          color =
                            "bg-purple-400 text-white border-purple-300 scale-[1.03]";
                        } else if (isItemHighlighted && highlightType === "push") {
                          color =
                            "bg-emerald-400 text-white border-emerald-300 scale-[1.05]";
                        } else if (isItemHighlighted && highlightType === "pop") {
                          color =
                            "bg-rose-400 text-white border-rose-300 scale-[1.05]";
                        } else if (isTop) {
                          color =
                            "bg-indigo-500 text-white border-indigo-300 scale-100";
                        }

                        return (
                          <div
                            key={index}
                            className={`mx-3 mb-2 h-9 flex items-center justify-center rounded-xl border text-lg font-medium shadow-sm transition-all duration-300 ${color}`}
                          >
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      Stack
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm md:text-base text-slate-800">
                        Top:
                      </span>
                      <div className="min-w-[110px] h-11 rounded-xl bg-emerald-400 text-white flex items-center justify-center font-semibold">
                        {top}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm md:text-base text-slate-800">
                        Size:
                      </span>
                      <div className="min-w-[110px] h-11 rounded-xl bg-emerald-400 text-white flex items-center justify-center font-semibold">
                        {stack.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // EXPLANATION TAB
          <div className="bg-white/90 border border-slate-200 rounded-3xl shadow-xl px-8 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Understanding Stack Data Structure
            </h2>

            <p className="text-slate-700 text-sm mb-3">
              A <strong>stack</strong> is a linear data structure that follows
              the{" "}
              <strong className="text-slate-900">LIFO (Last-In, First-Out)</strong>{" "}
              principle. This means the last item that is pushed into the stack
              will be the first one to be popped out.
            </p>

            <p className="text-slate-700 text-sm mb-4">
              You can think of it like a stack of plates: you always place new
              plates on top and remove plates from the top first.
            </p>

            <h3 className="font-semibold text-lg mt-4 mb-2 text-slate-900">
              Core Stack Operations
            </h3>

            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>
                <strong>Push</strong> – insert a new element at the top of the
                stack.
              </li>
              <li>
                <strong>Pop</strong> – remove and return the top element.
              </li>
              <li>
                <strong>Peek</strong> – view the top element without removing
                it.
              </li>
              <li>
                <strong>IsEmpty</strong> – check whether the stack contains any
                elements.
              </li>
              <li>
                <strong>IsFull</strong> – check whether the stack has reached its
                maximum capacity (here, {MAX_SIZE} elements).
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-2 text-slate-900">
              Where are Stacks Used?
            </h3>

            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Undo / Redo operations in editors</li>
              <li>Browser back / forward history</li>
              <li>Function call stack in programming languages</li>
              <li>Expression evaluation and syntax parsing</li>
              <li>Backtracking algorithms (DFS, maze solving, etc.)</li>
            </ul>

            <p className="mt-6 text-sm text-slate-700">
              Switch back to the{" "}
              <strong className="text-slate-900">Visualization</strong> tab to
              experiment with these operations interactively.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
