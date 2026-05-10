import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Collections } from "./pages/Collections";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "collections", Component: Collections },
      { path: "about", Component: About },
      { path: "checkout", Component: Checkout },
    ],
  },
]);
