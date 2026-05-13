import { useState } from "react";
import { useParams, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useProduct, useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { ProductCard } from "../components/ProductCard";

export function ProductDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { addToCart } = useCart();
  const { product, loading: productLoading } = useProduct(id || "");
  const { products, loading: productsLoading } = useProducts();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("description");

  if (productLoading || productsLoading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--ikki-bg)", color: "var(--ikki-text)" }}>...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24" style={{ background: "var(--ikki-bg)" }}>
        <div className="text-center">
          <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ikki-text)" }}>{t("product.notFound")}</p>
          <Link to="/shop" className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-gold)" }}>← {t("product.backToShop")}</Link>
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

  const toggleSection = (section: string) => setOpenSection(openSection === section ? null : section);

  const accordionSections = [
    { id: "description", title: t("product.description"), content: product.description },
    { id: "notes", title: t("product.fragranceNotes"), content: (
      <div className="flex flex-wrap gap-2">
        {product.notes.map((note) => (
          <span key={note} className="border px-3 py-1" style={{ borderColor: "var(--ikki-border-gold)", color: "var(--ikki-gold)", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}>{note}</span>
        ))}
      </div>
    )},
    { id: "shipping", title: t("product.shipping"), content: t("product.shippingText") },
  ];

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-10">
          <Link to="/shop" className="flex items-center gap-1 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>
            <ArrowLeft size={12} /> {t("product.backToShop")}
          </Link>
          <span style={{ color: "var(--ikki-border)" }}>/</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-faint)" }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden" style={{ background: "var(--ikki-bg3)" }}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.badge && (
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase ${
                product.badge === "Sale" ? "bg-red-600 text-white" :
                product.badge === "New" ? "" :
                product.badge === "Luxury" ? "border" : ""
              }`}
                style={product.badge === "New" ? { background: "var(--ikki-gold)", color: "var(--ikki-bg)" } :
                  product.badge === "Luxury" ? { background: "var(--ikki-bg3)", color: "var(--ikki-gold)", borderColor: "var(--ikki-border-gold)" } : {}}
              >{product.badge}</span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-muted)" }}>{product.brand}</p>
            <h1 className="mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300, lineHeight: 1.2, color: "var(--ikki-text)" }}>{product.name}</h1>
            <p className="mb-4" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-muted)" }}>{product.size} · {product.category}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "" : ""} fill={i < Math.floor(product.rating) ? "var(--ikki-gold)" : "none"} style={{ color: i < Math.floor(product.rating) ? "var(--ikki-gold)" : "var(--ikki-border)" }} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-muted)" }}>{product.rating} ({product.reviews} {t("product.reviews")})</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ikki-gold)" }}>${product.price}</span>
              {product.originalPrice && <span className="line-through" style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", color: "var(--ikki-text-faint)" }}>${product.originalPrice}</span>}
            </div>

            <div className="mb-8">
              <p className="mb-3 tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-text-dim)" }}>{t("product.keyNotes")}</p>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="border px-3 py-1" style={{ borderColor: "var(--ikki-border-gold)", color: "var(--ikki-gold)", fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", opacity: 0.7 }}>{note}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <p className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-text-dim)" }}>{t("product.qty")}</p>
              <div className="flex items-center border" style={{ borderColor: "var(--ikki-border)" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 transition-colors" style={{ color: "var(--ikki-text-muted)" }}>–</button>
                <span className="w-10 text-center" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", color: "var(--ikki-text)" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 transition-colors" style={{ color: "var(--ikki-text-muted)" }}>+</button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button onClick={handleAdd}
                className="flex-1 py-4 flex items-center justify-center gap-2 tracking-[0.2em] uppercase transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
                <ShoppingBag size={16} />{added ? t("product.added") : t("product.addToCart")}
              </button>
              <button onClick={() => setLiked(!liked)} className="w-14 h-14 border flex items-center justify-center transition-all"
                style={{ borderColor: liked ? "rgba(248,113,113,0.5)" : "var(--ikki-border)", color: liked ? "rgb(248,113,113)" : "var(--ikki-text-muted)" }}>
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
              <button className="w-14 h-14 border flex items-center justify-center transition-all"
                style={{ borderColor: "var(--ikki-border)", color: "var(--ikki-text-muted)" }}>
                <Share2 size={16} />
              </button>
            </div>

            <div className="border-t" style={{ borderColor: "var(--ikki-border)" }}>
              {accordionSections.map((section) => (
                <div key={section.id} className="border-b" style={{ borderColor: "var(--ikki-border)" }}>
                  <button onClick={() => toggleSection(section.id)} className="flex items-center justify-between w-full py-4">
                    <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-sub)" }}>{section.title}</span>
                    {openSection === section.id ? <ChevronUp size={14} style={{ color: "var(--ikki-text-muted)" }} /> : <ChevronDown size={14} style={{ color: "var(--ikki-text-muted)" }} />}
                  </button>
                  {openSection === section.id && (
                    <div className="pb-4">
                      {typeof section.content === "string" ? (
                        <p className="leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8", color: "var(--ikki-text-muted)" }}>{section.content}</p>
                      ) : section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("product.relatedEyebrow")}</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("product.relatedTitle")}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
