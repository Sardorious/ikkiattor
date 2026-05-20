import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Send } from "lucide-react";
import { useCart } from "../context/CartContext";

const getTelegramOrderUrl = (items: any[], totalPrice: number, lang: string) => {
  const base = "https://t.me/numan_abdukarim";
  if (items.length === 0) return base;

  let text = "";
  if (lang === "uz") {
    text = "Assalomu alaykum! Men IkkiAttor saytidan quyidagi mahsulotlarni sotib olmoqchiman:\n\n";
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.brand}) - ${item.size} x ${item.quantity} dona ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    text += `\nJami: $${totalPrice.toFixed(2)}`;
  } else if (lang === "ru") {
    text = "Здравствуйте! Я бы хотел приобрести следующие товары на сайте IkkiAttor:\n\n";
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.brand}) - ${item.size} x ${item.quantity} шт. ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    text += `\nИтого: $${totalPrice.toFixed(2)}`;
  } else {
    text = "Hello! I would like to purchase the following products from the IkkiAttor store:\n\n";
    items.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.brand}) - ${item.size} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    text += `\nTotal: $${totalPrice.toFixed(2)}`;
  }

  return `${base}?text=${encodeURIComponent(text)}`;
};

export function Checkout() {
  const { t, i18n } = useTranslation();
  const { items, totalPrice } = useCart();

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

  const getLocalizedInstruction = () => {
    if (i18n.language === "uz") {
      return {
        title: "Telegram Orqali Buyurtma Berish",
        description: "IkkiAttor do'konidan xarid qilayotganingiz uchun tashakkur! Biz buyurtmalarni tezkor qayta ishlash va sifatli yetkazib berish maqsadida, barcha rasmiylashtirish jarayonlarini Telegram orqali amalga oshiramiz. Quyidagi tugmani bosish orqali buyurtmangizni to'g'ridan-to'g'ri bizning menejerimizga yuborishingiz mumkin.",
        button: "Menejer bilan bog'lanish va buyurtma berish",
        subtext: "Tugmani bosganingizdan so'ng, Telegram chatida 'Yuborish' (Send) tugmasini bosing.",
      };
    } else if (i18n.language === "ru") {
      return {
        title: "Оформление Заказа Через Telegram",
        description: "Благодарим вас за выбор IkkiAttor! Для быстрого обслуживания и бережной доставки мы принимаем и подтверждаем все заказы через Telegram. Нажмите на кнопку ниже, чтобы отправить список покупок нашему менеджеру.",
        button: "Связаться с менеджером для заказа",
        subtext: "После перехода в Telegram, просто отправьте предзаполненное сообщение в чат.",
      };
    } else {
      return {
        title: "Place Order via Telegram",
        description: "Thank you for shopping at IkkiAttor! To ensure fast order processing and premium delivery, we handle all order details directly via Telegram. Click the button below to send your shopping bag details to our manager.",
        button: "Connect to Manager & Place Order",
        subtext: "After clicking, simply press 'Send' in the Telegram chat to submit your order.",
      };
    }
  };

  const instructions = getLocalizedInstruction();

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link to="/shop" className="flex items-center gap-2 mb-8 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text-muted)" }}>
          <ArrowLeft size={12} /> {t("checkout.backToShop")}
        </Link>
        <h1 className="mb-10" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("checkout.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 border p-8 flex flex-col justify-between" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border)" }}>
            <div>
              <h2 className="tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", fontWeight: 500, color: "var(--ikki-gold)" }}>{instructions.title}</h2>
              <p className="leading-relaxed mb-8 text-[#aaa]" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", lineHeight: "1.8" }}>
                {instructions.description}
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <a 
                href={getTelegramOrderUrl(items, totalPrice, i18n.language)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-3 font-medium hover:scale-[1.01]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", background: "var(--ikki-gold)", color: "var(--ikki-bg)", boxShadow: "0 4px 20px rgba(201, 169, 110, 0.15)" }}
              >
                <Send size={16} /> {instructions.button}
              </a>
              <p className="text-center text-[0.7rem] text-[#666]" style={{ fontFamily: "'Jost', sans-serif" }}>
                {instructions.subtext}
              </p>
            </div>
          </div>

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
              <div className="flex justify-between border-t pt-3 mt-2" style={{ borderColor: "var(--ikki-border)" }}>
                <span className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "var(--ikki-text)" }}>{t("checkout.orderTotal")}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", color: "var(--ikki-gold)" }}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
