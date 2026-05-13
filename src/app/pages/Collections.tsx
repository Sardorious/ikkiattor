import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const collectionsData = [
  { key: "floralEdit", name: "The Floral Edit", tag: "Women", count: 12, image: "https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBlcmZ1bWUlMjBmbG9yYWwlMjByb3NlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080", subtitle: "Women's Collection", description: "A celebration of nature's most beautiful blooms. From delicate roses to exotic jasmine, these fragrances capture femininity in its purest form." },
  { key: "darkBold", name: "Dark & Bold", tag: "Men", count: 9, image: "https://images.unsplash.com/photo-1736605406021-afd8241d5edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjb2xvZ25lJTIwd29vZHklMjBkYXJrJTIwYm90dGxlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080", subtitle: "Men's Collection", description: "For the man who leaves an impression. Deep woods, smoked leather, and spicy notes define this powerful and distinctive collection." },
  { key: "oudPrive", name: "Oud Privé", tag: "Luxury", count: 6, image: "https://images.unsplash.com/photo-1637645367952-687dca50d655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBhcmFiaWMlMjBwZXJmdW1lJTIwbHV4dXJ5fGVufDF8fHx8MTc3ODMzNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080", subtitle: "Luxury Collection", description: "Crafted from the rarest oud woods sourced from Cambodia and the Middle East. These exclusive fragrances are true works of olfactory art." },
  { key: "lairDuTemps", name: "L'Air du Temps", tag: "Unisex", count: 8, image: "https://images.unsplash.com/photo-1709828933413-96855c9cfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNpdHJ1cyUyMHBlcmZ1bWUlMjBsaWdodHxlbnwxfHx8fDE3NzgzMzc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080", subtitle: "Unisex Collection", description: "Boundary-breaking fragrances that defy convention. Fresh, airy, and effortlessly modern—these scents belong to everyone." },
];

export function Collections() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14 text-center">
        <p className="tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("collections.eyebrow")}</p>
        <h1 className="mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, lineHeight: 1.2, color: "var(--ikki-text)" }}>{t("collections.title")}</h1>
        <p className="max-w-lg mx-auto" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8", color: "var(--ikki-text-muted)" }}>{t("collections.desc")}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 gap-0">
          {collectionsData.map((col, i) => (
            <div key={col.name} className={`grid grid-cols-1 md:grid-cols-2 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <img src={col.image} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className={`border flex flex-col justify-center px-12 py-16 ${i % 2 === 1 ? "md:order-1" : ""}`}
                style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border)" }}>
                <p className="tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-gold)" }}>
                  {col.subtitle} · {col.count} {t("collections.fragrances")}
                </p>
                <h2 className="mb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, lineHeight: 1.2, color: "var(--ikki-text)" }}>{col.name}</h2>
                <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8", color: "var(--ikki-text-muted)" }}>{col.description}</p>
                <Link to={`/shop?category=${col.tag}`}
                  className="inline-flex items-center gap-3 border-b pb-1 hover:gap-4 transition-all w-fit"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em", color: "var(--ikki-gold)", borderColor: "var(--ikki-border-gold)" }}>
                  {t("collections.explore")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
