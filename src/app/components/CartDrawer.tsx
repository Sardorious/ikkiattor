import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";

export function CartDrawer() {
  const { t } = useTranslation();
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl border-l"
        style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}>
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--ikki-border-gold)" }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} style={{ color: "var(--ikki-gold)" }} />
            <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, color: "var(--ikki-text)" }}>
              {t("cart.title")} ({totalItems})
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="transition-colors" style={{ color: "var(--ikki-text-muted)" }}><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={40} style={{ color: "var(--ikki-border)" }} />
              <p className="tracking-wider" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text-dim)" }}>{t("cart.empty")}</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-2 border px-8 py-2 tracking-widest uppercase transition-all"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", borderColor: "var(--ikki-border-gold)", color: "var(--ikki-gold)" }}>
                {t("cart.explore")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-5" style={{ borderColor: "var(--ikki-border)" }}>
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="tracking-widest uppercase mb-0.5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-text-muted)" }}>{item.brand}</p>
                    <p className="mb-1 truncate" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "var(--ikki-text)" }}>{item.name}</p>
                    <p className="mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>{item.size}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {[Minus, Plus].map((Icon, idx) => (
                          <button key={idx} onClick={() => updateQuantity(item.id, item.quantity + (idx === 0 ? -1 : 1))}
                            className="border w-6 h-6 flex items-center justify-center transition-colors"
                            style={{ borderColor: "var(--ikki-border)", color: "var(--ikki-text-muted)" }}>
                            <Icon size={12} />
                          </button>
                        ))}
                        <span className="min-w-[20px] text-center" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-text)" }}>{item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", fontWeight: 500, color: "var(--ikki-gold)" }}>${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="transition-colors" style={{ color: "var(--ikki-text-faint)" }}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: "var(--ikki-border-gold)" }}>
            <div className="flex justify-between items-center mb-5">
              <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>{t("cart.total")}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "var(--ikki-text)" }}>${totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)}
              className="block w-full text-center py-3 tracking-[0.2em] uppercase transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
              {t("cart.checkout")}
            </Link>
            <button onClick={() => setIsCartOpen(false)} className="w-full text-center py-3 tracking-widest uppercase transition-colors mt-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>
              {t("cart.continueShopping")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
