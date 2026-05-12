export function About() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1773527142304-58116364b8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzgxNjkyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About IkkiAttor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p
            className="text-[#c9a96e] tracking-[0.5em] uppercase mb-4"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            Our Story
          </p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300 }}
          >
            The IkkiAttor Legacy
          </h1>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p
          className="text-[#c9a96e] tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
        >
          Since 1985
        </p>
        <p
          className="text-[#bbb] leading-relaxed mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, lineHeight: 1.8, fontStyle: "italic" }}
        >
          "I wanted to create fragrances that were not merely worn, but experienced. Each bottle should carry a memory, a journey, an emotion."
        </p>
        <p
          className="text-[#777]"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.2em" }}
        >
          — Jean-Paul IkkiAttor, Founder
        </p>
      </div>

      {/* Story Sections */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              year: "1985",
              title: "The Beginning",
              text: "Jean-Paul IkkiAttor opened his first atelier on the Rue de la Paix in Paris, with a vision to create fragrances that transcend the ordinary.",
            },
            {
              year: "1998",
              title: "Global Recognition",
              text: "After winning the prestigious Prix de la Parfumerie award, IkkiAttor Parfums expanded to boutiques across London, New York, and Tokyo.",
            },
            {
              year: "2026",
              title: "A New Chapter",
              text: "We continue our founder's legacy while embracing sustainability and innovation, creating masterpieces for the next generation of fragrance lovers.",
            },
          ].map((item) => (
            <div key={item.year} className="text-center p-8 border border-[#1a1a1a]">
              <p
                className="text-[#c9a96e] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}
              >
                {item.year}
              </p>
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
              >
                {item.title}
              </h3>
              <p
                className="text-[#666] leading-relaxed"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", lineHeight: "1.8" }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#0d0d0d] border-y border-[#c9a96e]/15">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "40+", label: "Years of Craft" },
            { number: "85+", label: "Unique Fragrances" },
            { number: "50+", label: "Countries Worldwide" },
            { number: "2M+", label: "Happy Customers" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-[#c9a96e] mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300 }}
              >
                {stat.number}
              </p>
              <p
                className="text-[#666] tracking-widest uppercase"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
