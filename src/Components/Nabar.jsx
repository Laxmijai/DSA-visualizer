function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg shadow-lg border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between py-4">
        
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-indigo-600 drop-shadow-sm">DSA</span>
          <span className="text-slate-900"> Visualizer</span>
        </h1>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-10 text-xl font-semibold text-slate-700">
          <a href="#home" className="hover:text-indigo-600 transition">Home</a>
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#features" className="hover:text-indigo-600 transition">Visualise</a>
          
        </nav>

        {/* Login + Sign Up buttons (same color theme) */}
        <div className="hidden md:flex items-center gap-4">

          {/* Login Button (Outline Indigo) */}
          <button className="px-5 py-2 text-lg font-semibold text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
            Login
          </button>

          {/* Sign Up Button (Solid Indigo) */}
          <button className="px-6 py-2 text-lg font-semibold bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
            Sign Up
          </button>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
