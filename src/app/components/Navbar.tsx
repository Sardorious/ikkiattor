import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ShoppingBag, Search, Menu, X, Languages, Sun, Moon } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { toggleTheme, isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.shop"), to: "/shop" },
    { label: t("nav.collections"), to: "/collections" },
    { label: t("nav.about"), to: "/about" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);
  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b"
      style={{ background: "var(--ikki-navbar)", borderColor: "var(--ikki-border-gold)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span
              className="tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ikki-gold)" }}
            >
              IKKIATTOR
            </span>
            <span
              className="tracking-[0.6em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", fontWeight: 300, color: "var(--ikki-text-dim)" }}
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
                  className="tracking-widest uppercase transition-colors duration-200"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: isActive(link.to) ? "var(--ikki-gold)" : "var(--ikki-text-sub)",
                  }}
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
              <button
                className="flex items-center gap-1 transition-colors"
                style={{ color: "var(--ikki-text-sub)" }}
              >
                <Languages size={18} />
                <span className="text-[0.65rem] font-medium uppercase tracking-widest">{i18n.language}</span>
              </button>
              <div
                className="absolute right-0 mt-2 w-20 border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl"
                style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}
              >
                {["uz", "ru", "en"].map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className="w-full text-left px-4 py-2 text-[0.7rem] uppercase tracking-widest transition-colors"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      color: i18n.language === lng ? "var(--ikki-gold)" : "var(--ikki-text-muted)",
                    }}
                  >
                    {lng}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="transition-colors"
              style={{ color: "var(--ikki-text-sub)" }}
              title={isDark ? t("common.theme.light") : t("common.theme.dark")}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="transition-colors"
              style={{ color: "var(--ikki-text-sub)" }}
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative transition-colors"
              style={{ color: "var(--ikki-text-sub)" }}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ background: "var(--ikki-gold)", color: "var(--ikki-bg)", fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", fontWeight: 600 }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden transition-colors"
              style={{ color: "var(--ikki-text-sub)" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="mt-4 pb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav.search")}
              autoFocus
              className="w-full bg-transparent border-b outline-none py-2 px-1"
              style={{
                borderColor: "var(--ikki-border-gold)",
                color: "var(--ikki-text-sub)",
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.9rem",
              }}
            />
          </form>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4" style={{ borderColor: "var(--ikki-border-gold)" }}>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="tracking-widest uppercase transition-colors"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.8rem",
                      color: isActive(link.to) ? "var(--ikki-gold)" : "var(--ikki-text-sub)",
                    }}
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
