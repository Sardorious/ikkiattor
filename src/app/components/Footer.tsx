import { Link } from "react-router";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-[#c9a96e]/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <p
              className="text-[#c9a96e] tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem" }}
            >
              IKKIATTOR
            </p>
            <p
              className="text-[#555] tracking-[0.6em] uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem" }}
            >
              PARFUMS
            </p>
          </div>
          <p
            className="text-[#666] leading-relaxed mb-6"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8" }}
          >
            Crafting extraordinary fragrances since 1985. Each bottle holds a story, each scent a memory waiting to unfold.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 border border-[#c9a96e]/30 flex items-center justify-center text-[#888] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            className="text-[#c9a96e] tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
          >
            Collections
          </h4>
          <ul className="flex flex-col gap-3">
            {["Women's Fragrances", "Men's Fragrances", "Unisex", "Luxury Edition", "Gift Sets", "Sample Sets"].map((item) => (
              <li key={item}>
                <Link
                  to="/shop"
                  className="text-[#666] hover:text-[#c9a96e] transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4
            className="text-[#c9a96e] tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
          >
            Help
          </h4>
          <ul className="flex flex-col gap-3">
            {["Track Order", "Shipping Policy", "Returns & Exchanges", "Fragrance Guide", "FAQ", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[#666] hover:text-[#c9a96e] transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-[#c9a96e] tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
          >
            Contact
          </h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#c9a96e] mt-1 flex-shrink-0" />
              <span
                className="text-[#666] leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.6" }}
              >
                15 Rue de la Paix,<br />Paris, France 75002
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-[#c9a96e] flex-shrink-0" />
              <a
                href="tel:+33140001234"
                className="text-[#666] hover:text-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                +33 1 40 00 12 34
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-[#c9a96e] flex-shrink-0" />
              <a
                href="mailto:hello@ikkiattor.uz"
                className="text-[#666] hover:text-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                hello@ikkiattor.uz
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#c9a96e]/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p
            className="text-[#444]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            © 2026 IkkiAttor Parfums. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#444] hover:text-[#c9a96e] transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
