import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronDown, Star, Truck, Shield, Gift } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useProducts, useCategories } from "../hooks/useProducts";

export function Home() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { products } = useProducts();
  const { categories } = useCategories();

  const featured = products ? products.slice(0, 4) : [];
  const bestsellers = products ? products.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8) : [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const trustBadges = [
    { icon: Truck, label: t("trust.shipping"), sub: t("trust.shippingSub") },
    { icon: Shield, label: t("trust.returns"), sub: t("trust.returnsSub") },
    { icon: Gift, label: t("trust.authentic"), sub: t("trust.authenticSub") },
  ];

  const promiseItems = [
    { number: "01", title: t("promise.item1Title"), text: t("promise.item1Text") },
    { number: "02", title: t("promise.item2Title"), text: t("promise.item2Text") },
    { number: "03", title: t("promise.item3Title"), text: t("promise.item3Text") },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ikki-bg)" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzgzMzc3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080)` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--ikki-bg) 0%, rgba(10,10,10,0.8) 60%, rgba(10,10,10,0.3) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <p className="tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-gold)" }}>{t("hero.subtitle")}</p>
            <h1 className="mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1.1, color: "var(--ikki-text)" }}>{t("hero.title")}</h1>
            <p className="mb-10 max-w-md" style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", lineHeight: "1.8", fontWeight: 300, color: "var(--ikki-text-body)" }}>{t("hero.description")}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-10 py-4 tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
                {t("hero.cta")} <ArrowRight size={14} />
              </Link>
              <Link to="/collections" className="border px-10 py-4 tracking-[0.2em] uppercase transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 400, borderColor: "var(--ikki-border-gold)", color: "var(--ikki-gold)" }}>
                {t("hero.explore")}
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: "var(--ikki-text-dim)" }}>
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}>
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trustBadges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={20} className="flex-shrink-0" style={{ color: "var(--ikki-gold)" }} />
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "var(--ikki-text-sub)" }}>{label}</p>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-dim)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("featured.eyebrow")}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("featured.title")}</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 hover:gap-3 transition-all"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-gold)" }}>
            {t("featured.viewAll")} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Banner Quote */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzgzMzc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080)` }} />
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <p className="tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("philosophy.eyebrow")}</p>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 4vw, 2.8rem)", fontWeight: 300, lineHeight: 1.4, fontStyle: "italic", color: "#ffffff", maxWidth: "48rem", margin: "0 auto" }}>
            {t("philosophy.quote")}
          </blockquote>
          <p className="mt-6 tracking-widest" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>{t("philosophy.author")}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("categories.eyebrow")}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("categories.title")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.name} to={`/shop?category=${cat.name}`}
              className="group relative overflow-hidden aspect-square flex flex-col items-center justify-center text-center p-6 border transition-all"
              style={{ background: "var(--ikki-bg3)", borderColor: "var(--ikki-border)" }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--ikki-card-hover)" }} />
              <div className="mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1, color: "var(--ikki-gold)" }}>
                {["♀", "♂", "⚥", "◈"][i]}
              </div>
              <h3 className="mb-1 group-hover:transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--ikki-text)" }}>{cat.name}</h3>
              <p className="mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-dim)" }}>{cat.description}</p>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--ikki-gold)", opacity: 0.7 }}>{cat.count} {t("categories.products")}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20" style={{ background: "var(--ikki-bg2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("bestsellers.eyebrow")}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("bestsellers.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestsellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex gap-4 p-4 border transition-all"
                style={{ background: "var(--ikki-bg3)", borderColor: "var(--ikki-border)" }}>
                <img src={product.image} alt={product.name} className="w-24 h-28 object-cover flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <p className="tracking-widest uppercase mb-1" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", color: "var(--ikki-text-dim)" }}>{product.brand}</p>
                  <h4 className="mb-1 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "var(--ikki-text-sub)" }}>{product.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} fill={i < Math.floor(product.rating) ? "var(--ikki-gold)" : "none"} style={{ color: i < Math.floor(product.rating) ? "var(--ikki-gold)" : "var(--ikki-border)" }} />
                    ))}
                    <span className="ml-1" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-dim)" }}>{product.rating}</span>
                  </div>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", fontWeight: 500, color: "var(--ikki-gold)" }}>${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Promise */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("promise.eyebrow")}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("promise.title")}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {promiseItems.map((item) => (
            <div key={item.number} className="relative pl-8 border-l" style={{ borderColor: "var(--ikki-border-gold)" }}>
              <span className="absolute -left-px top-0" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1, color: "var(--ikki-border-gold)" }}>{item.number}</span>
              <div className="pt-8">
                <h3 className="mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "var(--ikki-text)" }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8", color: "var(--ikki-text-dim)" }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-y" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className="tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("newsletter.eyebrow")}</p>
          <h2 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("newsletter.title")}</h2>
          <p className="mb-8" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8", color: "var(--ikki-text-dim)" }}>{t("newsletter.desc")}</p>
          {subscribed ? (
            <p className="tracking-widest" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-gold)" }}>{t("newsletter.success")}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("newsletter.placeholder")} required
                className="flex-1 border px-4 py-3 outline-none transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", background: "var(--ikki-input-bg)", borderColor: "var(--ikki-border)", color: "var(--ikki-text)" }} />
              <button type="submit" className="px-8 py-3 tracking-[0.2em] uppercase transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
                {t("newsletter.subscribe")}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
