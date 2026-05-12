import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { product, loading: productLoading } = useProduct(id || "");
  const { products, loading: productsLoading } = useProducts();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("description");

  if (productLoading || productsLoading) {
    return <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p
            className="text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}
          >
            Fragrance not found
          </p>
          <Link
            to="/shop"
            className="text-[#c9a96e] tracking-widest uppercase"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const related = products ? products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3) : [];

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const accordionSections = [
    {
      id: "description",
      title: "Description",
      content: product.description,
    },
    {
      id: "notes",
      title: "Fragrance Notes",
      content: (
        <div className="flex flex-wrap gap-2">
          {product.notes.map((note) => (
            <span
              key={note}
              className="border border-[#c9a96e]/30 text-[#c9a96e] px-3 py-1"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
            >
              {note}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content:
        "We offer complimentary standard shipping on all orders over $150. Express shipping available. Returns accepted within 30 days of purchase for unused, sealed products.",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            to="/shop"
            className="flex items-center gap-1 text-[#888] hover:text-[#c9a96e] transition-colors"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            <ArrowLeft size={12} /> Shop
          </Link>
          <span className="text-[#333]">/</span>
          <span
            className="text-[#555]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            {product.name}
          </span>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden bg-[#111]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase ${
                  product.badge === "Sale"
                    ? "bg-red-600 text-white"
                    : product.badge === "New"
                    ? "bg-[#c9a96e] text-[#0a0a0a]"
                    : product.badge === "Luxury"
                    ? "bg-[#2a1f0a] text-[#c9a96e] border border-[#c9a96e]/50"
                    : "bg-white text-[#0a0a0a]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p
              className="text-[#888] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
            >
              {product.brand}
            </p>
            <h1
              className="text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2 }}
            >
              {product.name}
            </h1>
            <p
              className="text-[#888] mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
            >
              {product.size} · {product.category}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "text-[#c9a96e]" : "text-[#333]"}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span
                className="text-[#888]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
              >
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span
                className="text-[#c9a96e]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  className="text-[#555] line-through"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem" }}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Notes Preview */}
            <div className="mb-8">
              <p
                className="text-[#666] mb-3 tracking-widest uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
              >
                Key Notes
              </p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="border border-[#c9a96e]/20 text-[#c9a96e]/70 px-3 py-1"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p
                className="text-[#666] tracking-widest uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
              >
                Qty
              </p>
              <div className="flex items-center border border-[#222]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 text-[#888] hover:text-white transition-colors"
                >
                  –
                </button>
                <span
                  className="w-10 text-center text-white"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 text-[#888] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAdd}
                className={`flex-1 py-4 flex items-center justify-center gap-2 tracking-[0.2em] uppercase transition-colors ${
                  added
                    ? "bg-[#c9a96e]/80 text-[#0a0a0a]"
                    : "bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#b8956a]"
                }`}
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
              >
                <ShoppingBag size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`w-14 h-14 border flex items-center justify-center transition-all ${
                  liked
                    ? "border-red-400/50 text-red-400"
                    : "border-[#222] text-[#888] hover:border-[#c9a96e]/40 hover:text-[#c9a96e]"
                }`}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
              <button className="w-14 h-14 border border-[#222] text-[#888] hover:border-[#c9a96e]/40 hover:text-[#c9a96e] flex items-center justify-center transition-all">
                <Share2 size={16} />
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-[#1a1a1a]">
              {accordionSections.map((section) => (
                <div key={section.id} className="border-b border-[#1a1a1a]">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full py-4"
                  >
                    <span
                      className="text-[#e0e0e0] tracking-widest uppercase"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
                    >
                      {section.title}
                    </span>
                    {openSection === section.id ? (
                      <ChevronUp size={14} className="text-[#888]" />
                    ) : (
                      <ChevronDown size={14} className="text-[#888]" />
                    )}
                  </button>
                  {openSection === section.id && (
                    <div className="pb-4">
                      {typeof section.content === "string" ? (
                        <p
                          className="text-[#888] leading-relaxed"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8" }}
                        >
                          {section.content}
                        </p>
                      ) : (
                        section.content
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <p
                className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
              >
                You May Also Like
              </p>
              <h2
                className="text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}
              >
                Related Fragrances
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
