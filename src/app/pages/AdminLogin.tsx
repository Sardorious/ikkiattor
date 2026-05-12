import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, ArrowRight } from "lucide-react";

export function AdminLogin() {
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
      const response = await fetch("http://localhost:3001/api/auth/login", {
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
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center px-6 pt-24">
      <div className="max-w-md w-full bg-[#0d0d0d] border border-[#c9a96e]/20 p-10">
        <div className="text-center mb-10">
          <p
            className="text-[#c9a96e] tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            IkkiAttor Parfums
          </p>
          <h1
            className="text-white"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300 }}
          >
            Admin Access
          </h1>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              className="block text-[#888] mb-2 tracking-widest uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#111] border border-[#222] text-white px-12 py-3 outline-none focus:border-[#c9a96e]/40 transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-[#888] mb-2 tracking-widest uppercase"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#111] border border-[#222] text-white px-12 py-3 outline-none focus:border-[#c9a96e]/40 transition-colors"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a96e] text-[#0a0a0a] py-4 tracking-[0.2em] uppercase hover:bg-[#b8956a] transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", fontWeight: 500 }}
          >
            {loading ? "Authenticating..." : "Login"} <ArrowRight size={14} />
          </button>
        </form>

        <p className="text-[#444] text-center mt-8 text-[0.65rem] tracking-widest uppercase">
          Authorized Personnel Only
        </p>
      </div>
    </div>
  );
}
