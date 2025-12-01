// MergeSortVisualizer.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
MergeSortVisualizer
- Splitting shown in a tree (top)
- Merges animated in a single Merge Zone below (elements slide down from child boxes into merge slots)
- After a parent merge completes, its merged array is placed into the mergedRows data (displayed just under tree)
- Final fully sorted array appears at the bottom
- Tailwind only, uses framer-motion for float animations
*/

// small helper
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let idCounter = 1;
const mkId = () => `n${idCounter++}`;

function Box({ items, color = "sky" }) {
  const bg = color === "yellow" ? "bg-yellow-100 border-yellow-300" : "bg-sky-100 border-sky-300";
  return (
    <div className={`flex gap-2 items-center px-3 py-2 rounded-lg border ${bg} shadow-sm`}>
      {items.map((v, i) => (
        <div key={i} className="w-10 h-10 flex items-center justify-center bg-white border rounded text-sm font-semibold">
          {v}
        </div>
      ))}
    </div>
  );
}

export default function MergeSortVisualizer() {
  // initial base array - DO NOT mutate this visually (as requested)
  const [baseArray] = useState([5, 2, 4, 7, 1, 3, 2, 6]);

  // split tree (levels top-down). Each level is array of nodes { id, items }
  const [treeLevels, setTreeLevels] = useState([]);

  // mergedRows[level] = array of merged arrays produced at that merge-level (displayed below tree)
  const [mergedRows, setMergedRows] = useState([]); // index = level (0 = bottom-most merges)

  // merge zone arrays (current active)
  const [mergeLeft, setMergeLeft] = useState([]);
  const [mergeRight, setMergeRight] = useState([]);
  const [mergeResult, setMergeResult] = useState([]);

  // floats: items animating from source -> merge slot
  const [floats, setFloats] = useState([]); // { key, value, from:{x,y}, to:{x,y} }

  // logs for step-by-step trace
  const [logs, setLogs] = useState([]);

  // refs to compute positions
  const containerRef = useRef(null);
  const nodeRefs = useRef({}); // key `${level}-${idx}` -> DOM element
  const mergeZoneRef = useRef(null);

  // recompute arrows or positions when treeLevels change (we use nodeRefs when animating)
  useEffect(() => {
    // nothing auto here; arrows handled via CSS or static indicators if needed
  }, [treeLevels]);

  // build split-only tree (binary) and store treeLevels
  const buildSplitLevels = (arr) => {
    idCounter = 1;
    const levels = [];
    function rec(a, lvl = 0) {
      if (!levels[lvl]) levels[lvl] = [];
      levels[lvl].push({ id: mkId(), items: a.slice() });
      if (a.length <= 1) return;
      const mid = Math.floor(a.length / 2);
      rec(a.slice(0, mid), lvl + 1);
      rec(a.slice(mid), lvl + 1);
    }
    rec(arr, 0);
    return levels;
  };

  // helper to push log
  const pushLog = (s) => setLogs((L) => [...L, s]);

  // helper to get center coordinates of a node box (relative to container)
  const getNodeCenter = (level, idx) => {
    const el = nodeRefs.current[`${level}-${idx}`];
    const cont = containerRef.current;
    if (!el || !cont) return null;
    const er = el.getBoundingClientRect();
    const cr = cont.getBoundingClientRect();
    return { x: er.left + er.width / 2 - cr.left, y: er.top + er.height / 2 - cr.top };
  };

  // helper to compute a merge-slot target position inside merge zone for the nth slot
  const getMergeSlotPos = (slotIndex) => {
    const mz = mergeZoneRef.current;
    const cont = containerRef.current;
    if (!mz || !cont) return null;
    const mr = mz.getBoundingClientRect();
    const cr = cont.getBoundingClientRect();
    // compute start left inside merge zone (padding + slot width 44)
    const leftPadding = 24;
    const slotW = 44;
    const x = mr.left - cr.left + leftPadding + slotIndex * slotW;
    const y = mr.top - cr.top + mr.height / 2;
    return { x, y };
  };

  // animate one value from a child node (childLevel, childIdx) into merge slot (slotIndex)
  const animateFloat = async (value, childLevel, childIdx, slotIndex) => {
    const start = getNodeCenter(childLevel, childIdx) || { x: 100, y: 40 };
    const end = getMergeSlotPos(slotIndex) || { x: 100, y: 240 };
    const key = `f-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setFloats((fs) => [...fs, { key, value, from: start, to: end }]);
    // wait animation duration
    await wait(520);
    // remove float
    setFloats((fs) => fs.filter((f) => f.key !== key));
  };

  // perform merges level-by-level (bottom-up) showing animation in merge zone.
  // treeLevels is top-down; bottom level index = treeLevels.length - 1
  const doMergesAnimated = async (levels) => {
    const totalLevels = levels.length;
    // create mergedRows array initialised to same depth as levels length - 1 (merges occur between nodes in lower level)
    const merged = Array(totalLevels).fill(null).map(() => []); // we'll use indexes corresponding to level number
    // We'll merge parents at level L by looking at children at L+1. We'll iterate L from bottom-1 down to 0
    for (let L = totalLevels - 2; L >= 0; L--) {
      const parents = levels[L];
      for (let p = 0; p < parents.length; p++) {
        const leftChildIdx = p * 2;
        const rightChildIdx = p * 2 + 1;
        const leftNode = levels[L + 1][leftChildIdx];
        const rightNode = levels[L + 1][rightChildIdx];
        if (!leftNode || !rightNode) continue; // defensive
        // set merge zone arrays for display
        setMergeLeft(leftNode.items.slice());
        setMergeRight(rightNode.items.slice());
        setMergeResult([]);
        pushLog(`Merging [${leftNode.items.join(", ")}] & [${rightNode.items.join(", ")}] into parent at level ${L}`);

        // perform merge step-by-step
        let i = 0,
          j = 0;
        const mergedArr = [];
        while (i < leftNode.items.length && j < rightNode.items.length) {
          pushLog(`Compare ${leftNode.items[i]} vs ${rightNode.items[j]}`);
          await wait(180);
          if (leftNode.items[i] <= rightNode.items[j]) {
            // animate from left child node into merge slot
            const slotIndex = mergedArr.length;
            await animateFloat(leftNode.items[i], L + 1, leftChildIdx, slotIndex);
            mergedArr.push(leftNode.items[i]);
            i++;
          } else {
            const slotIndex = mergedArr.length;
            await animateFloat(rightNode.items[j], L + 1, rightChildIdx, slotIndex);
            mergedArr.push(rightNode.items[j]);
            j++;
          }
          setMergeResult(mergedArr.slice());
          await wait(120);
        }
        // leftovers
        while (i < leftNode.items.length) {
          const slotIndex = mergedArr.length;
          await animateFloat(leftNode.items[i], L + 1, leftChildIdx, slotIndex);
          mergedArr.push(leftNode.items[i]);
          i++;
          setMergeResult(mergedArr.slice());
          await wait(120);
        }
        while (j < rightNode.items.length) {
          const slotIndex = mergedArr.length;
          await animateFloat(rightNode.items[j], L + 1, rightChildIdx, slotIndex);
          mergedArr.push(rightNode.items[j]);
          j++;
          setMergeResult(mergedArr.slice());
          await wait(120);
        }

        // push merged result into mergedRows[L] (we display merge rows in same order as parents)
        merged[L].push(mergedArr.slice());
        setMergedRows(JSON.parse(JSON.stringify(merged)));
        // also update logs and small pause
        pushLog(`Merged → [${mergedArr.join(", ")}] placed at level ${L}`);
        await wait(360);

        // clear merge zone arrays for next parent
        setMergeLeft([]);
        setMergeRight([]);
        setMergeResult([]);
        await wait(120);
      } // each parent in level L
    } // each level L
    // After all merges, the top merged result should be merged[0][0] (root)
    const final = merged[0] && merged[0][0] ? merged[0][0] : [];
    pushLog(`Final sorted: [${final.join(", ")}]`);
    return merged;
  };

  // start visualization: build split tree, then do merges with animation
  const start = async () => {
    setLogs([]);
    setFloats([]);
    setMergedRows([]);
    setMergeLeft([]);
    setMergeRight([]);
    setMergeResult([]);

    // 1) build split-only tree
    const splits = buildSplitLevels(baseArray);
    setTreeLevels(splits);
    pushLog("Built split-only tree (binary splits).");
    await wait(500);

    // 2) animate merges bottom-up into merge zone
    const merged = await doMergesAnimated(splits);
    // keep mergedRows state already set during merging
    // final sorted (if any) is top-most merged
    if (merged[0] && merged[0][0]) {
      setMergeResult(merged[0][0]); // show final in mergeResult as well
    }
  };

  // Floating element component
  const FloatItem = ({ f }) => {
    return (
      <motion.div
        initial={{ left: f.from.x - 24, top: f.from.y - 16, opacity: 0.95, scale: 0.95 }}
        animate={{ left: f.to.x - 24, top: f.to.y - 16, opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.52, ease: "easeInOut" }}
        style={{ position: "absolute", zIndex: 60 }}
      >
        <div className="inline-flex items-center justify-center px-3 py-2 rounded-md border bg-yellow-300 border-yellow-600 text-sm font-semibold shadow">
          {f.value}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Merge Sort — Split Tree + Merge Zone</h1>
            <p className="text-sm text-gray-600">Top: split-only tree. Below: animated merge zone (slide items into merged array).</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setTreeLevels([]);
                setMergedRows([]);
                setFloats([]);
                setMergeLeft([]);
                setMergeRight([]);
                setMergeResult([]);
                setLogs([]);
              }}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              Reset View
            </button>

            <button onClick={start} className="px-4 py-2 bg-blue-600 text-white rounded">
              ▶ Start
            </button>
          </div>
        </div>

        {/* Visual area container (used for coordinate calculations) */}
        <div ref={containerRef} className="relative bg-white p-6 rounded-lg border shadow-sm" style={{ minHeight: 520 }}>
          {/* Tree: top-down splits */}
          <div className="flex flex-col items-center gap-6">
            {treeLevels.map((nodes, lvl) => (
              <div key={lvl} className="w-full flex flex-col items-center">
                <div className="text-sm text-gray-500 mb-2">Level {lvl + 1}</div>
                <div className="flex gap-6 flex-wrap justify-center">
                  {nodes.map((node, idx) => (
                    <div
                      key={node.id}
                      ref={(el) => {
                        if (el) nodeRefs.current[`${lvl}-${idx}`] = el;
                        else delete nodeRefs.current[`${lvl}-${idx}`];
                      }}
                    >
                      <Box items={node.items} color={node.items.length > 1 && lvl > 0 ? "yellow" : "sky"} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Floating animating items */}
          <AnimatePresence>
            {floats.map((f) => (
              <FloatItem key={f.key} f={f} />
            ))}
          </AnimatePresence>
        </div>

        {/* Merge Zone (global) */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Merge Zone (animations happen here)</h3>

          <div id="merge-zone" ref={mergeZoneRef} className="flex items-start gap-8">
            <div className="flex flex-col gap-2 items-start">
              <div className="text-sm text-gray-600">Left</div>
              <Box items={mergeLeft} color="yellow" />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <div className="text-sm text-gray-600">Right</div>
              <Box items={mergeRight} color="yellow" />
            </div>

            <div className="flex flex-col gap-2 items-start">
              <div className="text-sm text-gray-600">Merged</div>
              <Box items={mergeResult} color="yellow" />
            </div>
          </div>
        </div>

        {/* Merged Rows (shows all merged arrays arranged per level like in your screenshot) */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Merged Rows (by merge level)</h3>
          <div className="flex flex-col gap-6">
            {mergedRows.map((row, lvl) => (
              <div key={lvl} className="flex gap-6 flex-wrap">
                {row.map((arr, i) => (
                  <div key={i} className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg shadow">
                    <div className="flex gap-2">
                      {arr.map((n, k) => (
                        <div key={k} className="w-10 h-10 flex items-center justify-center bg-white border rounded text-sm font-semibold">
                          {n}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: base array (untouched) and logs */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">Base Array (unchanged)</h3>
            <div className="flex gap-2 flex-wrap">
              {baseArray.map((v, i) => (
                <div key={i} className="w-10 h-10 flex items-center justify-center bg-white border rounded text-sm font-semibold">
                  {v}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow h-56 overflow-y-auto">
            <h3 className="font-semibold mb-2">Steps</h3>
            <ol className="list-decimal list-inside text-sm space-y-1 text-gray-700">
              {logs.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
