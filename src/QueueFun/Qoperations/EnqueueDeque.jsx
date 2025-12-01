// QueuePage.jsx
import React, { useState } from "react";

const MAX_SIZE = 10;

export default function QueuePage() {
  const [activeTab, setActiveTab] = useState("visualization");

  const [queue, setQueue] = useState([]); // { id, value, status: 'normal' | 'justEnqueued' | 'dequeuing' }
  const [nextId, setNextId] = useState(0);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Start by enqueueing some values.");

  const [trackHighlight, setTrackHighlight] = useState(null); // 'empty' | 'full' | null

  const front = queue.length ? queue[0].value : "-";
  const rear = queue.length ? queue[queue.length - 1].value : "-";

  const clearTrackHighlight = () => setTrackHighlight(null);

  const handleEnqueue = () => {
    const value = input.trim();
    if (!value) {
      setMessage("Please enter a value to enqueue into the queue.");
      return;
    }

    if (queue.length >= MAX_SIZE) {
      setMessage(`Cannot enqueue: the queue is full (max size = ${MAX_SIZE}).`);
      setTrackHighlight("full");
      setTimeout(clearTrackHighlight, 600);
      return;
    }

    const id = nextId;
    setNextId((prev) => prev + 1);

    const node = { id, value, status: "justEnqueued" };

    setQueue((prev) => [...prev, node]);
    setMessage(`Enqueued “${value}” at the rear of the queue.`);
    setInput("");

    // After a short time, turn it into a normal node so it slides into place
    setTimeout(() => {
      setQueue((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: "normal" } : n))
      );
    }, 300);
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setMessage("Cannot dequeue: the queue is already empty.");
      setTrackHighlight("empty");
      setTimeout(clearTrackHighlight, 600);
      return;
    }

    const frontId = queue[0].id;
    const frontValue = queue[0].value;

    // Mark front as dequeuing (slide out)
    setQueue((prev) =>
      prev.map((n) =>
        n.id === frontId ? { ...n, status: "dequeuing" } : n
      )
    );
    setMessage(`Dequeuing “${frontValue}” from the front...`);

    setTimeout(() => {
      setQueue((prev) => prev.filter((n) => n.id !== frontId));
      setMessage(`Dequeued “${frontValue}” from the front.`);
    }, 300);
  };

  const handleFront = () => {
    if (queue.length === 0) {
      setMessage("Queue is empty. No front element.");
      setTrackHighlight("empty");
      setTimeout(clearTrackHighlight, 600);
      return;
    }
    setMessage(`Front element is “${queue[0].value}”.`);
  };

  const handleIsEmpty = () => {
    if (queue.length === 0) {
      setMessage("Yes, the queue is empty.");
    } else {
      setMessage("No, the queue is not empty.");
    }
    setTrackHighlight("empty");
    setTimeout(clearTrackHighlight, 600);
  };

  const handleIsFull = () => {
    if (queue.length >= MAX_SIZE) {
      setMessage(`Yes, the queue is full (size = ${MAX_SIZE}).`);
    } else {
      setMessage(
        `No, the queue is not full. Current size: ${queue.length}/${MAX_SIZE}.`
      );
    }
    setTrackHighlight("full");
    setTimeout(clearTrackHighlight, 600);
  };

  const handleReset = () => {
    setQueue([]);
    setInput("");
    setTrackHighlight(null);
    setMessage("Queue has been reset. You can enqueue new values.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 font-sans">
      {/* top strip */}
      <div className="w-full h-3 bg-sky-300" />

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-14">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Queue Visualisation
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-500">
            Use the control panel to perform operations and visualize how a queue works.
          </p>
        </div>

        {/* Tabs */}
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

        {activeTab === "visualization" ? (
          <>
            {/* MAIN LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CONTROL PANEL */}
              <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 px-6 py-7">
                <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-xl">🎛️</span> Control Panel
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Perform enqueue, dequeue and other operations on the queue.
                </p>

                {/* Enqueue input */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Enqueue Element
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
                      onClick={handleEnqueue}
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-md hover:bg-indigo-700 hover:-translate-y-[1px] transition"
                    >
                      Enqueue
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Max queue size: {MAX_SIZE} elements.
                  </p>
                </div>

                {/* Operations */}
                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    Operations
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleDequeue}
                      className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow hover:bg-sky-600 hover:-translate-y-[1px] transition"
                    >
                      Dequeue
                    </button>
                    <button
                      onClick={handleFront}
                      className="px-5 py-2.5 rounded-xl bg-sky-500 text-white text-sm font-semibold shadow hover:bg-sky-600 hover:-translate-y-[1px] transition"
                    >
                      Front
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
                      className="px-5 py-2.5 rounded-xl bg-rose-400 text-white text-sm font-semibold shadow hover:bg-rose-500 hover:-translate-y-[1px] transition"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Step Explanation */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-600 mb-2">
                    Step Explanation
                  </p>
                  <div className="min-h-[56px] px-4 py-3 rounded-2xl bg-sky-50 border border-sky-100 text-xs md:text-sm text-slate-700 shadow-sm">
                    {message ? (
                      message
                    ) : (
                      <span className="text-slate-400">
                        Perform an operation to see details here.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* VISUALIZATION CARD */}
              <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-slate-100 rounded-3xl shadow-xl border border-slate-100 px-6 py-7">
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  Visualization
                </h2>
                <p className="text-xs text-slate-500 mb-5">
                  The queue grows from <span className="font-semibold">rear</span> to{" "}
                  <span className="font-semibold">front</span>. New elements slide in from
                  the right, and dequeued elements slide out to the left.
                </p>

                {/* Queue Track */}
                <div
                  className={`rounded-3xl border-2 border-dashed px-4 py-6 bg-white transition-all duration-200 ${
                    trackHighlight === "empty"
                      ? "border-amber-400 shadow-[0_0_0_2px_rgba(251,191,36,0.3)]"
                      : trackHighlight === "full"
                      ? "border-purple-400 shadow-[0_0_0_2px_rgba(168,85,247,0.3)]"
                      : "border-slate-300 shadow-none"
                  }`}
                >
                  {/* Row of elements */}
                  <div className="flex items-end gap-3 min-h-[90px]">
                    {queue.length === 0 && (
                      <div className="text-xs text-slate-400 italic">
                        Queue is empty
                      </div>
                    )}

                    {queue.map((node, index) => {
                      const isFront = index === 0;
                      const isRear = index === queue.length - 1;

                      // base styles
                      let boxColor = "bg-slate-200 border-slate-300 text-slate-800";
                      if (node.status === "justEnqueued") {
                        boxColor = "bg-emerald-400 border-emerald-300 text-white";
                      } else if (node.status === "dequeuing") {
                        boxColor = "bg-rose-400 border-rose-300 text-white";
                      } else if (isFront) {
                        boxColor =
                          "bg-sky-500 border-sky-300 text-white shadow-sky-300/60";
                      } else if (isRear) {
                        boxColor =
                          "bg-indigo-500 border-indigo-300 text-white shadow-indigo-300/60";
                      }

                      // animation classes
                      const animClasses =
                        node.status === "justEnqueued"
                          ? "translate-x-3 opacity-0"
                          : node.status === "dequeuing"
                          ? "-translate-x-8 opacity-0"
                          : "translate-x-0 opacity-100";

                      return (
                        <div
                          key={node.id}
                          className="flex flex-col items-center gap-1 transition-all duration-300 ease-out"
                        >
                          {/* FRONT label with arrow (above first element) */}
                          {isFront && (
                            <div className="flex flex-col items-center text-[10px] text-slate-600 mb-1">
                              <span>Front</span>
                              <span>⬇</span>
                            </div>
                          )}

                          {/* Box */}
                          <div
                            className={`h-14 min-w-[64px] px-3 rounded-xl border flex items-center justify-center text-sm font-semibold shadow-sm transform ${boxColor} ${animClasses}`}
                          >
                            {node.value}
                          </div>

                          {/* REAR label with arrow (below last element) */}
                          {isRear && (
                            <div className="flex flex-col items-center text-[10px] text-slate-600 mt-1">
                              <span>⬆</span>
                              <span>Rear</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Info row under track */}
                  <div className="mt-4 flex justify-between text-[11px] text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-700 mr-1">
                        Front:
                      </span>
                      <span>{front}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 mr-1">
                        Rear:
                      </span>
                      <span>{rear}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 mr-1">
                        Size:
                      </span>
                      <span>
                        {queue.length}/{MAX_SIZE}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-5 text-[11px] text-slate-500 space-y-1">
                  <p>
                    <span className="inline-block w-3 h-3 rounded-sm bg-sky-500 mr-1" />
                    <span className="font-medium text-slate-700">Front</span> element
                    (dequeued first)
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 rounded-sm bg-indigo-500 mr-1" />
                    <span className="font-medium text-slate-700">Rear</span> element
                    (new enqueues appear here)
                  </p>
                  <p>
                    <span className="inline-block w-3 h-3 rounded-sm bg-emerald-400 mr-1" />
                    Enqueued highlight &nbsp;&nbsp;
                    <span className="inline-block w-3 h-3 rounded-sm bg-rose-400 mr-1" />
                    Dequeued highlight
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* EXPLANATION TAB */
          <div className="bg-white/90 border border-slate-200 rounded-3xl shadow-xl px-8 py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Understanding Queue Data Structure
            </h2>

            <p className="text-slate-700 text-sm mb-3">
              A <strong>queue</strong> is a linear data structure that follows the{" "}
              <strong className="text-slate-900">FIFO (First-In, First-Out)</strong>{" "}
              principle. This means the element that is inserted first will be the
              first one to be removed.
            </p>

            <p className="text-slate-700 text-sm mb-4">
              You can imagine it like a line of people waiting for a bus: the person
              who comes first will leave the queue first.
            </p>

            <h3 className="font-semibold text-lg mt-4 mb-2 text-slate-900">
              Core Queue Operations
            </h3>

            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>
                <strong>Enqueue</strong> – insert an element at the{" "}
                <strong>rear</strong> of the queue.
              </li>
              <li>
                <strong>Dequeue</strong> – remove the element at the{" "}
                <strong>front</strong> of the queue.
              </li>
              <li>
                <strong>Front</strong> – view the current front element without removing it.
              </li>
              <li>
                <strong>IsEmpty</strong> – check whether the queue has any elements.
              </li>
              <li>
                <strong>IsFull</strong> – check whether the queue has reached its maximum
                capacity (here, {MAX_SIZE} elements).
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-6 mb-2 text-slate-900">
              Where are Queues Used?
            </h3>

            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Task scheduling and job queues</li>
              <li>Printer queues</li>
              <li>Handling requests in web servers</li>
              <li>Breadth-First Search (BFS) in graphs</li>
              <li>Buffer management in operating systems</li>
            </ul>

            <p className="mt-6 text-sm text-slate-700">
              Switch back to the{" "}
              <strong className="text-slate-900">Visualization</strong> tab to see
              these operations in action with animations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
