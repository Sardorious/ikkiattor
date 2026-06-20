import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Phone, Send } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t" style={{ background: "var(--ikki-footer)", borderColor: "var(--ikki-border-gold)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="mb-4">
            <p className="tracking-[0.3em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ikki-gold)" }}>IKKIATTOR</p>
            <p className="tracking-[0.6em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", color: "var(--ikki-text-faint)" }}>PARFUMS</p>
          </div>
          <p className="leading-relaxed mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8", color: "var(--ikki-text-dim)" }}>{t("footer.tagline")}</p>
          <div className="flex gap-4">
            <a href="https://t.me/numan_abdukarim" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border flex items-center justify-center transition-all"
              style={{ borderColor: "var(--ikki-border-gold)", color: "var(--ikki-text-muted)" }}>
              <Send size={14} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: "var(--ikki-gold)" }}>{t("footer.collectionsTitle")}</h4>
          <ul className="flex flex-col gap-3">
            {[t("footer.women"), t("footer.men"), t("footer.unisex"), t("footer.luxury"), t("footer.giftSets"), t("footer.sampleSets")].map((item) => (
              <li key={item}><Link to="/shop" className="transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text-dim)" }}>{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="tracking-[0.2em] uppercase mb-5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500, color: "var(--ikki-gold)" }}>{t("footer.contactTitle")}</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <Send size={14} className="flex-shrink-0" style={{ color: "var(--ikki-gold)" }} />
              <a href="https://t.me/numan_abdukarim" target="_blank" rel="noopener noreferrer" className="transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text-dim)" }}>Telegram: @numan_abdukarim</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="flex-shrink-0" style={{ color: "var(--ikki-gold)" }} />
              <a href="tel:+998774444496" className="transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text-dim)" }}>+998 77 444 44 96</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "var(--ikki-border-gold)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-faint)" }}>{t("footer.copyright")}</p>
          <div className="flex items-center gap-6">
            {[t("footer.privacy"), t("footer.terms"), t("footer.cookies")].map((item) => (
              <a key={item} href="#" className="transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-faint)" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
