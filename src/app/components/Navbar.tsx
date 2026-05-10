import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Collections", to: "/collections" },
    { label: "About", to: "/about" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#c9a96e]/20">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span
              className="text-[#c9a96e] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400 }}
            >
              LUMIÈRE
            </span>
            <span
              className="text-[#8a8a8a] tracking-[0.6em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", fontWeight: 300 }}
            >
              PARFUMS
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`tracking-widest uppercase transition-colors duration-200 ${
                    isActive(link.to)
                      ? "text-[#c9a96e]"
                      : "text-[#d4d4d4] hover:text-[#c9a96e]"
                  }`}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#d4d4d4] hover:text-[#c9a96e] transition-colors"
            >
              <Search size={18} />
            </button>
            <button className="text-[#d4d4d4] hover:text-[#c9a96e] transition-colors hidden md:block">
              <Heart size={18} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#d4d4d4] hover:text-[#c9a96e] transition-colors"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c9a96e] text-[#0a0a0a] rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", fontWeight: 600 }}
                >
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-[#d4d4d4] hover:text-[#c9a96e] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="mt-4 pb-2">
            <input
              type="text"
              placeholder="Search fragrances..."
              autoFocus
              className="w-full bg-transparent border-b border-[#c9a96e]/40 text-[#d4d4d4] placeholder-[#666] outline-none py-2 px-1"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem" }}
            />
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#c9a96e]/10 mt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`tracking-widest uppercase transition-colors ${
                      isActive(link.to) ? "text-[#c9a96e]" : "text-[#d4d4d4]"
                    }`}
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
