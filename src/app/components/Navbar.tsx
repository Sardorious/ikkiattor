import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Search, Menu, X, Heart, Languages } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.shop"), to: "/shop" },
    { label: t("nav.collections"), to: "/collections" },
    { label: t("nav.about"), to: "/about" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

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
              IKKIATTOR
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
            {/* Language Switcher */}
            <div className="relative group px-2">
              <button className="text-[#d4d4d4] hover:text-[#c9a96e] flex items-center gap-1 transition-colors">
                <Languages size={18} />
                <span className="text-[0.65rem] font-medium uppercase tracking-widest">{i18n.language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-20 bg-[#0d0d0d] border border-[#c9a96e]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
                {["uz", "ru", "en"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`w-full text-left px-4 py-2 text-[0.7rem] uppercase tracking-widest hover:bg-[#c9a96e]/10 transition-colors ${
                      i18n.language === lng ? "text-[#c9a96e]" : "text-[#888]"
                    }`}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {lng}
                  </button>
                ))}
              </div>
            </div>

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
