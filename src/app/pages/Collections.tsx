import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "The Floral Edit",
    subtitle: "Women's Collection",
    description: "A celebration of nature's most beautiful blooms. From delicate roses to exotic jasmine, these fragrances capture femininity in its purest form.",
    image: "https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBlcmZ1bWUlMjBmbG9yYWwlMjByb3NlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Women",
    count: 12,
  },
  {
    name: "Dark & Bold",
    subtitle: "Men's Collection",
    description: "For the man who leaves an impression. Deep woods, smoked leather, and spicy notes define this powerful and distinctive collection.",
    image: "https://images.unsplash.com/photo-1736605406021-afd8241d5edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjb2xvZ25lJTIwd29vZHklMjBkYXJrJTIwYm90dGxlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Men",
    count: 9,
  },
  {
    name: "Oud Privé",
    subtitle: "Luxury Collection",
    description: "Crafted from the rarest oud woods sourced from Cambodia and the Middle East. These exclusive fragrances are true works of olfactory art.",
    image: "https://images.unsplash.com/photo-1637645367952-687dca50d655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBhcmFiaWMlMjBwZXJmdW1lJTIwbHV4dXJ5fGVufDF8fHx8MTc3ODMzNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Luxury",
    count: 6,
  },
  {
    name: "L'Air du Temps",
    subtitle: "Unisex Collection",
    description: "Boundary-breaking fragrances that defy convention. Fresh, airy, and effortlessly modern—these scents belong to everyone.",
    image: "https://images.unsplash.com/photo-1709828933413-96855c9cfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNpdHJ1cyUyMHBlcmZ1bWUlMjBsaWdodHxlbnwxfHx8fDE3NzgzMzc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tag: "Unisex",
    count: 8,
  },
];

export function Collections() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-14 text-center">
        <p
          className="text-[#c9a96e] tracking-[0.5em] uppercase mb-4"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
        >
          Curated Excellence
        </p>
        <h1
          className="text-white mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1.2 }}
        >
          Our Collections
        </h1>
        <p
          className="text-[#888] max-w-lg mx-auto"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8" }}
        >
          Each collection tells a unique story through scent. Explore our curated worlds and find the fragrance that speaks to your soul.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 gap-0">
          {collections.map((col, i) => (
            <div
              key={col.name}
              className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* Content */}
              <div
                className={`bg-[#0d0d0d] border border-[#1a1a1a] flex flex-col justify-center px-12 py-16 ${
                  i % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <p
                  className="text-[#c9a96e] tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
                >
                  {col.subtitle} · {col.count} Fragrances
                </p>
                <h2
                  className="text-white mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, lineHeight: 1.2 }}
                >
                  {col.name}
                </h2>
                <p
                  className="text-[#888] mb-8 leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8" }}
                >
                  {col.description}
                </p>
                <Link
                  to={`/shop?category=${col.tag}`}
                  className="inline-flex items-center gap-3 text-[#c9a96e] border-b border-[#c9a96e]/30 pb-1 hover:gap-4 transition-all w-fit"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}
                >
                  Explore Collection <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
