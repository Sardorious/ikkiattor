import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: `${form.firstName} ${form.lastName}`,
          email: form.email,
          address: form.address,
          city: form.city,
          total: totalPrice + (totalPrice >= 150 ? 0 : 15),
          items: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="text-center max-w-md">
          <CheckCircle size={60} className="text-[#c9a96e] mx-auto mb-6" />
          <h1
            className="text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
          >
            Order Confirmed
          </h1>
          <p
            className="text-[#888] mb-8 leading-relaxed"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.9rem", lineHeight: "1.8" }}
          >
            Thank you for your order. Your luxurious fragrances will be carefully packaged and dispatched within 2 business days.
          </p>
          <p
            className="text-[#c9a96e] mb-8 tracking-widest"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
          >
            Confirmation sent to {form.email || "your email"}
          </p>
          <Link
            to="/shop"
            className="bg-[#c9a96e] text-[#0a0a0a] px-10 py-3 tracking-[0.2em] uppercase hover:bg-[#b8956a] transition-colors inline-block"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center pt-24 px-6">
        <div className="text-center">
          <p
            className="text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}
          >
            Your cart is empty
          </p>
          <Link
            to="/shop"
            className="text-[#c9a96e] flex items-center gap-2 justify-center"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#111] border border-[#222] text-white placeholder-[#444] px-4 py-3 outline-none focus:border-[#c9a96e]/40 transition-colors";
  const inputStyle = { fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" };
  const labelStyle = {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          to="/shop"
          className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors mb-8"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
        >
          <ArrowLeft size={12} /> Back to Shop
        </Link>

        <h1
          className="text-white mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300 }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
            {/* Shipping */}
            <div>
              <h2
                className="text-[#c9a96e] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
              >
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Jean" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Dupont" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#888] mb-2" style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean@email.com" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#888] mb-2" style={labelStyle}>Address</label>
                  <input name="address" value={form.address} onChange={handleChange} required placeholder="15 Rue de la Paix" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>City</label>
                  <input name="city" value={form.city} onChange={handleChange} required placeholder="Paris" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} required placeholder="75002" className={inputClass} style={inputStyle} />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#888] mb-2" style={labelStyle}>Country</label>
                  <select name="country" value={form.country} onChange={handleChange} required className={`${inputClass} bg-[#111]`} style={inputStyle}>
                    <option value="">Select country</option>
                    <option>France</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Japan</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2
                className="text-[#c9a96e] tracking-[0.3em] uppercase mb-6"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
              >
                Payment Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[#888] mb-2" style={labelStyle}>Card Number</label>
                  <input name="card" value={form.card} onChange={handleChange} required placeholder="4242 4242 4242 4242" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>Expiry</label>
                  <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM / YY" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-[#888] mb-2" style={labelStyle}>CVV</label>
                  <input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="***" className={inputClass} style={inputStyle} />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#c9a96e] text-[#0a0a0a] py-4 tracking-[0.3em] uppercase hover:bg-[#b8956a] transition-colors"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
            >
              Place Order · ${(totalPrice + (totalPrice >= 150 ? 0 : 15)).toFixed(2)}
            </button>
            <p
              className="text-center text-[#555]"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
            >
              🔒 Secure, encrypted payment processing
            </p>
          </form>

          {/* Order Summary */}
          <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 h-fit">
            <h2
              className="text-[#c9a96e] tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
            >
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#e0e0e0] truncate"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[#666]"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
                    >
                      {item.size} × {item.quantity}
                    </p>
                    <p
                      className="text-[#c9a96e]"
                      style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1a1a1a] pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#666]" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>Subtotal</span>
                <span className="text-[#aaa]" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>Shipping</span>
                <span className="text-[#aaa]" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}>
                  {totalPrice >= 150 ? "Free" : "$15.00"}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#1a1a1a] pt-3 mt-2">
                <span
                  className="text-white tracking-widest uppercase"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
                >
                  Total
                </span>
                <span
                  className="text-[#c9a96e]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}
                >
                  ${(totalPrice + (totalPrice >= 150 ? 0 : 15)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
