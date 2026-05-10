import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router";
import { Product } from "../context/CartContext";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden bg-[#111] aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-xs tracking-widest uppercase ${
              product.badge === "Sale"
                ? "bg-red-600 text-white"
                : product.badge === "New"
                ? "bg-[#c9a96e] text-[#0a0a0a]"
                : product.badge === "Luxury"
                ? "bg-[#2a1f0a] text-[#c9a96e] border border-[#c9a96e]/50"
                : "bg-white text-[#0a0a0a]"
            }`}
            style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
          >
            {product.badge}
          </span>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end">
          <button
            onClick={handleAddToCart}
            className={`m-4 py-3 text-center tracking-widest uppercase transition-all ${
              added
                ? "bg-[#c9a96e]/80 text-[#0a0a0a]"
                : "bg-[#0a0a0a]/90 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
            }`}
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingBag size={14} />
              {added ? "Added!" : "Add to Cart"}
            </span>
          </button>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[#0a0a0a]/60 rounded-full transition-colors ${
            liked ? "text-red-400" : "text-white hover:text-red-400"
          }`}
        >
          <Heart size={14} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Info */}
      <div className="pt-3 pb-2">
        <p
          className="text-[#888] tracking-[0.2em] uppercase mb-1"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
        >
          {product.brand}
        </p>
        <h3
          className="text-[#e8e8e8] mb-1 group-hover:text-[#c9a96e] transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? "text-[#c9a96e]" : "text-[#333]"}
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span
            className="text-[#666]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
          >
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[#c9a96e]"
            style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem", fontWeight: 500 }}
          >
            ${product.price}
          </span>
          {product.originalPrice && (
            <span
              className="text-[#555] line-through"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.8rem" }}
            >
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
