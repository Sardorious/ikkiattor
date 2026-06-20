import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const [status, setStatus] = useState<"checking" | "valid" | "invalid">("checking");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setStatus("invalid");
      return;
    }

    let cancelled = false;
    // 🔴 Fix #1: Verify the token against the backend instead of trusting
    // its mere presence in localStorage (expired/forged tokens are rejected).
    fetch("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setStatus("valid");
        } else {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminEmail");
          setStatus("invalid");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("invalid");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--ikki-bg)", color: "var(--ikki-text-muted)" }}
      >
        Verifying session...
      </div>
    );
  }

  if (status === "invalid") return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
