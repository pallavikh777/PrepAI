import { Link } from "react-router-dom";

function Navbar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const goHome = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={goHome}
          className="text-2xl font-bold text-cyan-400"
        >
          PrepAI
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          {/* HOME */}
          <Link
            to="/"
            onClick={goHome}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Home
          </Link>

          {/* FEATURES */}
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Features
          </button>

          {/* ABOUT */}
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            About
          </button>

          {/* CONTACT */}
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Contact
          </button>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="text-slate-300 hover:text-cyan-400 transition px-4 py-2"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition"
          >
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;