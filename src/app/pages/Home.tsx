import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown, Star, Truck, RotateCcw, Shield, Gift } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { products, categories } from "../data/products";

export function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featured = products.slice(0, 4);
  const bestsellers = products.filter((p) => p.badge === "Bestseller" || p.rating >= 4.8);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1760862652442-e8ff7ebdd2f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwc3RvcmUlMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzgzMzc3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <p
              className="text-[#c9a96e] tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
            >
              New Collection 2026
            </p>
            <h1
              className="text-white mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              The Art of<br />
              <em className="text-[#c9a96e]">Scent</em>
            </h1>
            <p
              className="text-[#aaa] mb-10 max-w-md"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "1rem", lineHeight: "1.8", fontWeight: 300 }}
            >
              Discover our curated collection of rare and exquisite fragrances, crafted by the world's finest perfumers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-[#c9a96e] text-[#0a0a0a] px-10 py-4 tracking-[0.2em] uppercase hover:bg-[#b8956a] transition-colors flex items-center gap-2"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
              >
                Shop Now <ArrowRight size={14} />
              </Link>
              <Link
                to="/collections"
                className="border border-[#c9a96e]/50 text-[#c9a96e] px-10 py-4 tracking-[0.2em] uppercase hover:bg-[#c9a96e]/10 transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 400 }}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666] animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-[#c9a96e]/15 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, label: "Free Shipping", sub: "On orders over $150" },
            { icon: RotateCcw, label: "Easy Returns", sub: "30-day return policy" },
            { icon: Shield, label: "Authentic", sub: "100% genuine products" },
            { icon: Gift, label: "Gift Wrapping", sub: "Complimentary service" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={20} className="text-[#c9a96e] flex-shrink-0" />
              <div>
                <p
                  className="text-[#e0e0e0]"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
                >
                  {label}
                </p>
                <p
                  className="text-[#666]"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
                >
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p
              className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
            >
              Curated For You
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
            >
              Featured Fragrances
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[#c9a96e] hover:gap-3 transition-all"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzgzMzc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080)`,
          }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/75" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 text-center">
          <p
            className="text-[#c9a96e] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            Our Philosophy
          </p>
          <blockquote
            className="text-white max-w-3xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              fontWeight: 300,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            "A fragrance is an invisible fashion. You can forget a face, but you can never forget a scent."
          </blockquote>
          <p
            className="text-[#888] mt-6 tracking-widest"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            — Jean-Paul Lumière, Founder
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p
            className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            Browse by Category
          </p>
          <h2
            className="text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
          >
            Our Collections
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group relative overflow-hidden bg-[#111] aspect-square flex flex-col items-center justify-center text-center p-6 border border-[#1a1a1a] hover:border-[#c9a96e]/40 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a96e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div
                className="text-[#c9a96e] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1 }}
              >
                {["♀", "♂", "⚥", "◈"][i]}
              </div>
              <h3
                className="text-white mb-1 group-hover:text-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}
              >
                {cat.name}
              </h3>
              <p
                className="text-[#666] mb-3"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
              >
                {cat.description}
              </p>
              <p
                className="text-[#c9a96e]/70"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                {cat.count} Products
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-[#0d0d0d] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
            >
              Most Loved
            </p>
            <h2
              className="text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
            >
              Bestsellers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bestsellers.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group flex gap-4 bg-[#111] p-4 border border-[#1a1a1a] hover:border-[#c9a96e]/30 transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-28 object-cover flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <p
                    className="text-[#666] tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem" }}
                  >
                    {product.brand}
                  </p>
                  <h4
                    className="text-[#e8e8e8] mb-1 group-hover:text-[#c9a96e] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
                  >
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={i < Math.floor(product.rating) ? "text-[#c9a96e]" : "text-[#333]"}
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      />
                    ))}
                    <span
                      className="text-[#666] ml-1"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
                    >
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <span
                    className="text-[#c9a96e]"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", fontWeight: 500 }}
                  >
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p
            className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            Why Lumière
          </p>
          <h2
            className="text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
          >
            The Lumière Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              number: "01",
              title: "Rare Ingredients",
              text: "We source only the finest ingredients from around the world—Bulgarian roses, Haitian vetiver, and precious oud from the Middle East.",
            },
            {
              number: "02",
              title: "Master Perfumers",
              text: "Each fragrance is crafted by award-winning perfumers with decades of experience, balancing artistry with chemistry.",
            },
            {
              number: "03",
              title: "Sustainable Luxury",
              text: "Our packaging uses recycled materials, and we partner with sustainable farms to ensure ethical sourcing of all ingredients.",
            },
          ].map((item) => (
            <div key={item.number} className="relative pl-8 border-l border-[#c9a96e]/20">
              <span
                className="absolute -left-px top-0 text-[#c9a96e]/20"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1 }}
              >
                {item.number}
              </span>
              <div className="pt-8">
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#666] leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8" }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0d0d0d] border-y border-[#c9a96e]/15">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p
            className="text-[#c9a96e] tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            Join the Inner Circle
          </p>
          <h2
            className="text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300 }}
          >
            Receive Exclusive Offers
          </h2>
          <p
            className="text-[#666] mb-8"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8" }}
          >
            Subscribe to our newsletter and receive 10% off your first order, plus early access to new collections and exclusive events.
          </p>

          {subscribed ? (
            <p
              className="text-[#c9a96e] tracking-widest"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
            >
              ✦ Thank you for subscribing! Your discount code is on its way.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-[#111] border border-[#333] text-white placeholder-[#555] px-4 py-3 outline-none focus:border-[#c9a96e]/50 transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              />
              <button
                type="submit"
                className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-3 tracking-[0.2em] uppercase hover:bg-[#b8956a] transition-colors whitespace-nowrap"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
