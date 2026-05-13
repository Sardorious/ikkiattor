import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Lock, Mail, ArrowRight } from "lucide-react";

export function AdminLogin() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.admin.email);
        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24" style={{ background: "var(--ikki-bg)" }}>
      <div className="max-w-md w-full border p-10" style={{ background: "var(--ikki-bg2)", borderColor: "var(--ikki-border-gold)" }}>
        <div className="text-center mb-10">
          <p className="tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", color: "var(--ikki-gold)" }}>IkkiAttor Parfums</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--ikki-text)" }}>{t("admin.title")}</h1>
        </div>

        {error && <div className="border p-3 mb-6 text-sm text-center" style={{ background: "rgba(153,27,27,0.1)", borderColor: "rgba(153,27,27,0.4)", color: "rgb(248,113,113)" }}>{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          {[[t("admin.email"), "email", email, setEmail, Mail], [t("admin.password"), "password", password, setPassword, Lock]].map(([label, type, val, setter, Icon]: any) => (
            <div key={type}>
              <label className="block mb-2 tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-text-muted)" }}>{label}</label>
              <div className="relative">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2" size={16} style={{ color: "var(--ikki-border)" }} />
                <input type={type} value={val} onChange={(e: any) => setter(e.target.value)} required
                  className="w-full border px-12 py-3 outline-none transition-colors"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", background: "var(--ikki-input-bg)", borderColor: "var(--ikki-border)", color: "var(--ikki-text)" }} />
              </div>
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full py-4 tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500, background: "var(--ikki-gold)", color: "var(--ikki-bg)" }}>
            {loading ? t("admin.authenticating") : t("admin.login")} <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-center mt-8 tracking-widest uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", color: "var(--ikki-text-faint)" }}>{t("admin.authorizedOnly")}</p>
      </div>
    </div>
  );
}
