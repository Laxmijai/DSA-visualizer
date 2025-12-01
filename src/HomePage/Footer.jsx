import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black py-10 mt-20 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Side Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="text-indigo-500">DSA</span>
            <span className="text-white"> Visualizer</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Learn DSA the Visual Way.
          </p>
        </div>

        {/* Middle Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <NavLink to="/" className="text-slate-300 hover:text-indigo-400 transition">Home</NavLink>
          <NavLink to="/features" className="text-slate-300 hover:text-indigo-400 transition">Features</NavLink>
          <NavLink to="/visualise" className="text-slate-300 hover:text-indigo-400 transition">Visualise</NavLink>
          
        </div>

        {/* Right Side Text */}
        <p className="text-sm text-slate-500 text-center md:text-right">
          © {new Date().getFullYear()} DSA Visualizer. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
