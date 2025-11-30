function HeroSection() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      <div className="
        max-w-6xl mx-auto px-6 py-16 md:py-20 
        flex flex-col md:flex-row 
        items-center gap-12">

        {/* LEFT SIDE TEXT */}
        <div className="flex-1 space-y-6 text-center md:text-left">

          <p className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            Interactive DSA Learning
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
            Visualize Algorithms with{" "}
            <span className="text-indigo-600">Ease</span>.
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
            Step-by-step visual animations to help you understand sorting,
            searching, trees, and more — perfect for students and interview prep.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button className="px-6 py-3 text-base md:text-lg font-semibold rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition">
              Start Visualizing
            </button>

            <button className="px-6 py-3 text-base md:text-lg font-semibold rounded-xl border border-slate-300 text-slate-800 hover:border-indigo-500 hover:text-indigo-600 transition">
              View Algorithms
            </button>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE + SIMPLE FLOATING ELEMENTS */}
        <div className="flex-1 w-full flex justify-center">
          <div className="relative flex justify-center">

            {/* Circle 1 */}
            <div className="hidden sm:flex items-center justify-center
                            absolute -top-10 left-4
                            w-24 h-24 rounded-full bg-white shadow-md
                            text-base font-semibold text-slate-800 border">
              O(1)
            </div>

            {/* Circle 2 */}
            <div className="hidden sm:flex items-center justify-center
                            absolute -top-6 right-0
                            w-28 h-28 rounded-full bg-indigo-600 text-white shadow-lg
                            text-sm font-semibold">
              Hash Map
            </div>

            {/* Circle 3 */}
            <div className="hidden sm:flex items-center justify-center
                            absolute top-24 -left-6
                            w-24 h-24 rounded-full bg-white shadow-md
                            text-sm font-semibold text-slate-900 border">
              Queue
            </div>

            {/* Circle 4 */}
            <div className="hidden sm:flex items-center justify-center
                            absolute bottom-4 -right-4
                            w-20 h-20 rounded-full bg-white shadow-md
                            text-sm font-semibold text-slate-800 border">
              Stack
            </div>

            {/* Circle 5 */}
            <div className="hidden sm:flex items-center justify-center
                            absolute bottom-36 left-12
                            w-20 h-20 rounded-full bg-indigo-50 shadow-md
                            text-sm font-semibold text-indigo-700">
              Tree
            </div>

            {/* MAIN IMAGE */}
            <img
              src="https://www.dsavisualizer.in/_next/image?url=%2FGurlThinking.png&w=3840&q=75"
              alt="DSA Visualizer"
              className="
                relative z-10
                w-full
                max-w-[200px]
                md:max-w-[260px]
                lg:max-w-[300px]
                xl:max-w-[340px]
                rounded-3xl
              "
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
