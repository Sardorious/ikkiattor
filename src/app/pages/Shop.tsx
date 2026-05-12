import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useProducts, useCategories } from "../hooks/useProducts";

const allCategories = ["All", "Women", "Men", "Unisex"];
const priceRanges = [
  { label: "Under $150", min: 0, max: 150 },
  { label: "$150 – $200", min: 150, max: 200 },
  { label: "$200 – $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];

export function Shop() {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get("category") || "All";

  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ category: true, price: true });

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice) {
      const range = priceRanges.find((r) => r.label === selectedPrice);
      if (range) {
        result = result.filter((p) => p.price >= range.min && p.price <= range.max);
      }
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, selectedPrice, sortBy, products]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full pb-3 border-b border-[#1a1a1a]"
        >
          <span
            className="text-[#c9a96e] tracking-widest uppercase"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
          >
            Category
          </span>
          {expandedSections.category ? <ChevronUp size={14} className="text-[#888]" /> : <ChevronDown size={14} className="text-[#888]" />}
        </button>
        {expandedSections.category && (
          <div className="mt-3 space-y-2">
            {["All", ...categories.map(c => c.name)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`block w-full text-left transition-colors ${
                  selectedCategory === cat ? "text-[#c9a96e]" : "text-[#888] hover:text-[#c9a96e]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                {selectedCategory === cat && <span className="mr-2">✦</span>}
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full pb-3 border-b border-[#1a1a1a]"
        >
          <span
            className="text-[#c9a96e] tracking-widest uppercase"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
          >
            Price
          </span>
          {expandedSections.price ? <ChevronUp size={14} className="text-[#888]" /> : <ChevronDown size={14} className="text-[#888]" />}
        </button>
        {expandedSections.price && (
          <div className="mt-3 space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() =>
                  setSelectedPrice(selectedPrice === range.label ? null : range.label)
                }
                className={`block w-full text-left transition-colors ${
                  selectedPrice === range.label ? "text-[#c9a96e]" : "text-[#888] hover:text-[#c9a96e]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                {selectedPrice === range.label && <span className="mr-2">✦</span>}
                {range.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear */}
      {(selectedCategory !== "All" || selectedPrice) && (
        <button
          onClick={() => {
            setSelectedCategory("All");
            setSelectedPrice(null);
          }}
          className="text-[#888] hover:text-red-400 transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
        >
          <X size={12} /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-[#c9a96e]/15">
        <p
          className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
        >
          Lumière Parfums
        </p>
        <h1
          className="text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
        >
          All Fragrances
        </h1>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-[#1a1a1a]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors md:hidden"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          <p
            className="text-[#555]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
          >
            {filtered.length} products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="text-[#666] hidden sm:block"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[#888] border border-[#222] px-3 py-1.5 outline-none hover:border-[#c9a96e]/40 transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {showFilters && (
        <div className="md:hidden bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-6">
          <FilterContent />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <FilterContent />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-[#555]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}
              >
                No fragrances found
              </p>
              <p
                className="text-[#444] mt-2"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
