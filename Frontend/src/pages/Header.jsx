import { useState } from "react";
import codeview from "../assets/codeview.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-slate-600 shadow-md">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img src={codeview} alt="CodeView Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold text-white">CodeView</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link
            to="/home"
            className="text-white hover:text-slate-300 transition"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="text-white hover:text-slate-300 transition"
          >
            Admin
          </Link>
          <a
            href="#team"
            className="text-white hover:text-slate-300 transition"
          >
            Team
          </a>
          <a
            href="#contact"
            className="text-white hover:text-slate-300 transition"
          >
            Contact
          </a>

          {/* Action Buttons */}
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white rounded-lg shadow hover:bg-slate-200 transition"
          >
            Log in
          </Link>
          <Link
            to="/createproblem"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Create Problem
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-slate-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/home"
                className="block text-white hover:text-slate-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="block text-white hover:text-slate-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </li>
            <li>
              <a
                href="#team"
                className="block text-white hover:text-slate-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block text-white hover:text-slate-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/login"
                className="block px-4 py-2 mt-2 text-center text-slate-700 bg-white rounded-lg hover:bg-slate-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/createproblem"
                className="block px-4 py-2 mt-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Problem
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
