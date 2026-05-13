import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Root() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Jost', sans-serif" }}>
          <ScrollToTop />
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
