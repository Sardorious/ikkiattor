import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useProducts, useCategories } from "../hooks/useProducts";

const priceRanges = [
  { label: "Under $150", min: 0, max: 150 },
  { label: "$150 – $200", min: 150, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];

export function Shop() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "All";
  const defaultQuery = searchParams.get("q") || "";

  const { products, loading: productsLoading } = useProducts();
  const { categories } = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ category: true, price: true });

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (defaultQuery) {
      const q = defaultQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.notes.join(" ").toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice) {
      const range = priceRanges.find((r) => r.label === selectedPrice);
      if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
    }

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, selectedPrice, sortBy, products, defaultQuery]);

  const toggleSection = (section: keyof typeof expandedSections) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <button onClick={() => toggleSection("category")} className="flex items-center justify-between w-full pb-3 border-b" style={{ borderColor: "var(--ikki-border)" }}>
          <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", fontWeight: 500, color: "var(--ikki-gold)" }}>{t("shop.category")}</span>
          {expandedSections.category ? <ChevronUp size={14} style={{ color: "var(--ikki-text-muted)" }} /> : <ChevronDown size={14} style={{ color: "var(--ikki-text-muted)" }} />}
        </button>
        {expandedSections.category && (
          <div className="mt-3 space-y-2">
            {["All", ...categories.map((c) => c.name)].map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className="block w-full text-left transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: selectedCategory === cat ? "var(--ikki-gold)" : "var(--ikki-text-dim)" }}>
                {selectedCategory === cat && <span className="mr-2">✦</span>}{cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full pb-3 border-b" style={{ borderColor: "var(--ikki-border)" }}>
          <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", fontWeight: 500, color: "var(--ikki-gold)" }}>{t("shop.price")}</span>
          {expandedSections.price ? <ChevronUp size={14} style={{ color: "var(--ikki-text-muted)" }} /> : <ChevronDown size={14} style={{ color: "var(--ikki-text-muted)" }} />}
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => (
              <button key={range.label} onClick={() => setSelectedPrice(selectedPrice === range.label ? null : range.label)}
                className="block w-full text-left transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: selectedPrice === range.label ? "var(--ikki-gold)" : "var(--ikki-text-dim)" }}>
                {selectedPrice === range.label && <span className="mr-2">✦</span>}{range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {(selectedCategory !== "All" || selectedPrice) && (
        <button onClick={() => { setSelectedCategory("All"); setSelectedPrice(null); }}
          className="flex items-center gap-2 transition-colors"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>
          <X size={12} /> {t("shop.clearFilters")}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10 border-b" style={{ borderColor: "var(--ikki-border-gold)" }}>
        <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("shop.eyebrow")}</p>
        <h1 className="mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>
          {defaultQuery ? `"${defaultQuery}"` : t("shop.title")}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: "var(--ikki-border)" }}>
        <div className="flex items-center gap-4">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 transition-colors md:hidden"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-muted)" }}>
            <SlidersHorizontal size={14} /> {t("shop.filters")}
          </button>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-faint)" }}>
            {filtered.length} {t("shop.products")}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-dim)" }}>{t("shop.sortLabel")}</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="border px-3 py-1.5 outline-none transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", background: "transparent", color: "var(--ikki-text-muted)", borderColor: "var(--ikki-border)" }}>
            <option value="featured">{t("shop.featured")}</option>
            <option value="rating">{t("shop.topRated")}</option>
            <option value="price-asc">{t("shop.priceLow")}</option>
            <option value="price-desc">{t("shop.priceHigh")}</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <div className="md:hidden border-b px-6 py-6" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border)" }}>
          <FilterContent />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        <aside className="hidden md:block w-56 flex-shrink-0">
          <FilterContent />
        </aside>
        <main className="flex-1">
          {productsLoading ? (
            <div className="text-center py-20" style={{ color: "var(--ikki-text-muted)" }}>...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ikki-text-faint)" }}>{t("shop.noResults")}</p>
              <p className="mt-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text-faint)" }}>{t("shop.noResultsSub")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
