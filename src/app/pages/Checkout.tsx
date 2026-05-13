import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Checkout() {
  const { t } = useTranslation();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", zip: "", country: "", card: "", expiry: "", cvv: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${form.firstName} ${form.lastName}`,
          email: form.email, address: form.address, city: form.city,
          total: totalPrice + (totalPrice >= 150 ? 0 : 15),
          items: items.map((item) => ({ id: item.id, quantity: item.quantity, price: item.price })),
        }),
      });
      if (response.ok) { setSubmitted(true); clearCart(); }
      else alert(t("checkout.placeOrder") + " failed.");
    } catch { alert(t("checkout.placeOrder") + " error."); }
  };

  const inp = "w-full border outline-none px-4 py-3 transition-colors";
  const inpStyle = { fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", background: "var(--ikki-input-bg)", borderColor: "var(--ikki-border)", color: "var(--ikki-text)" };
  const lbl = { fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--ikki-text-muted)" };

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-6" style={{ background: "var(--ikki-bg)" }}>
      <div className="text-center max-w-md">
        <CheckCircle size={60} className="mx-auto mb-6" style={{ color: "var(--ikki-gold)" }} />
        <h1 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("checkout.confirmed")}</h1>
        <p className="mb-8 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8", color: "var(--ikki-text-muted)" }}>{t("checkout.confirmedDesc")}</p>
        <p className="mb-8 tracking-widest" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-gold)" }}>{t("checkout.confirmedEmail")} {form.email || "your email"}</p>
        <Link to="/shop" className="px-10 py-3 tracking-[0.2em] uppercase transition-colors inline-block"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
          {t("checkout.continueShopping")}
        </Link>
      </div>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center pt-24 px-6" style={{ background: "var(--ikki-bg)" }}>
      <div className="text-center">
        <p className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ikki-text)" }}>{t("checkout.emptyCart")}</p>
        <Link to="/shop" className="flex items-center gap-2 justify-center" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-gold)" }}>
          <ArrowLeft size={14} /> {t("checkout.backToShop")}
        </Link>
      </div>
    </div>
  );

  const shipping = totalPrice >= 150 ? 0 : 15;

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link to="/shop" className="flex items-center gap-2 mb-8 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>
          <ArrowLeft size={12} /> {t("checkout.backToShop")}
        </Link>
        <h1 className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-gold)" }}>{t("checkout.shipping")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {[["firstName", t("checkout.firstName"), "text"], ["lastName", t("checkout.lastName"), "text"]].map(([n, l, type]) => (
                  <div key={n}><label className="block mb-2" style={lbl}>{l}</label><input name={n} type={type} value={(form as any)[n]} onChange={handleChange} required className={inp} style={inpStyle} /></div>
                ))}
                <div className="col-span-2"><label className="block mb-2" style={lbl}>{t("checkout.email")}</label><input name="email" type="email" value={form.email} onChange={handleChange} required className={inp} style={inpStyle} /></div>
                <div className="col-span-2"><label className="block mb-2" style={lbl}>{t("checkout.address")}</label><input name="address" value={form.address} onChange={handleChange} required className={inp} style={inpStyle} /></div>
                <div><label className="block mb-2" style={lbl}>{t("checkout.city")}</label><input name="city" value={form.city} onChange={handleChange} required className={inp} style={inpStyle} /></div>
                <div><label className="block mb-2" style={lbl}>{t("checkout.zip")}</label><input name="zip" value={form.zip} onChange={handleChange} required className={inp} style={inpStyle} /></div>
                <div className="col-span-2">
                  <label className="block mb-2" style={lbl}>{t("checkout.country")}</label>
                  <select name="country" value={form.country} onChange={handleChange} required className={inp} style={inpStyle}>
                    <option value="">{t("checkout.selectCountry")}</option>
                    {["France","United States","United Kingdom","Germany","Japan","Australia","Uzbekistan"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-gold)" }}>{t("checkout.payment")}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block mb-2" style={lbl}>{t("checkout.cardNumber")}</label><input name="card" value={form.card} onChange={handleChange} required placeholder="4242 4242 4242 4242" className={inp} style={inpStyle} /></div>
                <div><label className="block mb-2" style={lbl}>{t("checkout.expiry")}</label><input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM / YY" className={inp} style={inpStyle} /></div>
                <div><label className="block mb-2" style={lbl}>{t("checkout.cvv")}</label><input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="***" className={inp} style={inpStyle} /></div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 tracking-[0.3em] uppercase transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
              {t("checkout.placeOrder")} · ${(totalPrice + shipping).toFixed(2)}
            </button>
            <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-faint)" }}>{t("checkout.secure")}</p>
          </form>

          <div className="border p-6 h-fit" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border)" }}>
            <h2 className="tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-gold)" }}>{t("checkout.summary")}</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--ikki-text-sub)" }}>{item.name}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-dim)" }}>{item.size} × {item.quantity}</p>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ikki-gold)" }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2" style={{ borderColor: "var(--ikki-border)" }}>
              {[[t("checkout.subtotal"), `$${totalPrice.toFixed(2)}`], [t("checkout.shippingFee"), shipping === 0 ? t("checkout.shippingFree") : "$15.00"]].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-dim)" }}>{l}</span>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", color: "var(--ikki-text-muted)" }}>{v}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-3 mt-2" style={{ borderColor: "var(--ikki-border)" }}>
                <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text)" }}>{t("checkout.orderTotal")}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--ikki-gold)" }}>${(totalPrice + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
