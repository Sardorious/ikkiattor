import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  const timeline = [
    { year: t("about.year1"), title: t("about.title1"), text: t("about.text1") },
    { year: t("about.year2"), title: t("about.title2"), text: t("about.text2") },
    { year: t("about.year3"), title: t("about.title3"), text: t("about.text3") },
  ];

  const stats = [
    { number: "40+", label: t("about.stat1") },
    { number: "85+", label: t("about.stat2") },
    { number: "50+", label: t("about.stat3") },
    { number: "2M+", label: t("about.stat4") },
  ];

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="relative h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1773527142304-58116364b8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzgxNjkyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About IkkiAttor" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--ikki-overlay)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="tracking-[0.5em] uppercase mb-4" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("about.eyebrow")}</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("about.title")}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="tracking-[0.3em] uppercase mb-6" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>{t("about.since")}</p>
        <p className="leading-relaxed mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, lineHeight: 1.8, fontStyle: "italic", color: "var(--ikki-text-body)" }}>
          {t("about.quote")}
        </p>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em", color: "var(--ikki-text-dim)" }}>{t("about.founder")}</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timeline.map((item) => (
            <div key={item.year} className="text-center p-8 border" style={{ borderColor: "var(--ikki-border)" }}>
              <p className="mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "var(--ikki-gold)" }}>{item.year}</p>
              <h3 className="mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "var(--ikki-text)" }}>{item.title}</h3>
              <p className="leading-relaxed" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8", color: "var(--ikki-text-dim)" }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-y" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ikki-gold)" }}>{stat.number}</p>
              <p className="tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-text-dim)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
