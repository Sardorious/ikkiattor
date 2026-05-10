import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f0f] z-50 flex flex-col shadow-2xl border-l border-[#c9a96e]/20">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c9a96e]/20">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-[#c9a96e]" />
            <span
              className="text-white tracking-widest uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
            >
              Your Cart ({totalItems})
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-[#888] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={40} className="text-[#333]" />
              <p
                className="text-[#666] tracking-wider"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              >
                Your cart is empty
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 border border-[#c9a96e]/40 text-[#c9a96e] px-8 py-2 tracking-widest uppercase hover:bg-[#c9a96e] hover:text-black transition-all"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
              >
                Explore Fragrances
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-[#1a1a1a] pb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#888] tracking-widest uppercase mb-0.5"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
                    >
                      {item.brand}
                    </p>
                    <p
                      className="text-white mb-1 truncate"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[#888] mb-3"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
                    >
                      {item.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-[#888] hover:text-[#c9a96e] transition-colors border border-[#333] w-6 h-6 flex items-center justify-center"
                        >
                          <Minus size={12} />
                        </button>
                        <span
                          className="text-white min-w-[20px] text-center"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-[#888] hover:text-[#c9a96e] transition-colors border border-[#333] w-6 h-6 flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-[#c9a96e]"
                          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", fontWeight: 500 }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#555] hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#c9a96e]/20">
            <div className="flex justify-between items-center mb-5">
              <span
                className="text-[#888] tracking-widest uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
              >
                Total
              </span>
              <span
                className="text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
              >
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full text-center bg-[#c9a96e] text-[#0a0a0a] py-3 tracking-[0.2em] uppercase hover:bg-[#b8956a] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
            >
              Checkout
            </Link>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-[#888] py-3 tracking-widest uppercase hover:text-[#c9a96e] transition-colors mt-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
