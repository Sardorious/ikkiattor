import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Edit2, Trash2, LogOut, Package, Tag, DollarSign, Image as ImageIcon, Upload } from "lucide-react";
import { Product } from "../context/CartContext";

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      // 🔴 Fix #2: surface auth/server failures instead of silently ignoring them
      if (response.status === 401 || response.status === 403) {
        alert("Your session has expired. Please log in again.");
        handleLogout();
        return;
      }
      if (response.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 border-b border-[#c9a96e]/15 pb-8">
          <div>
            <p
              className="text-[#c9a96e] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem" }}
            >
              Management Console
            </p>
            <h1
              className="text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", fontWeight: 300 }}
            >
              Product Inventory
            </h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openAdd}
              className="bg-[#c9a96e] text-[#0a0a0a] px-6 py-3 tracking-widest uppercase hover:bg-[#b8956a] transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", fontWeight: 500 }}
            >
              <Plus size={16} /> Add Product
            </button>
            <button
              onClick={handleLogout}
              className="border border-red-900/30 text-red-400 px-6 py-3 tracking-widest uppercase hover:bg-red-900/10 transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem" }}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#888]">Loading inventory...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[#111] border border-[#1a1a1a] p-4 flex items-center gap-6 hover:border-[#c9a96e]/30 transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover border border-[#222]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[#666] text-[0.6rem] tracking-widest uppercase">{product.brand}</span>
                    {product.badge && (
                      <span className="text-[0.6rem] bg-[#c9a96e]/10 text-[#c9a96e] px-2 py-0.5 tracking-widest uppercase">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h3
                    className="text-white text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={12} className="text-[#c9a96e]" />
                      <span className="text-[#aaa] text-sm">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package size={12} className="text-[#c9a96e]" />
                      <span className="text-[#aaa] text-sm">Stock: {product.stock}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Tag size={12} className="text-[#c9a96e]" />
                      <span className="text-[#aaa] text-sm">{product.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="w-10 h-10 border border-[#222] text-[#888] hover:text-[#c9a96e] hover:border-[#c9a96e]/40 flex items-center justify-center transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="w-10 h-10 border border-[#222] text-[#888] hover:text-red-400 hover:border-red-400/40 flex items-center justify-center transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <AdminProductModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchProducts();
          }}
          token={token!}
        />
      )}
    </div>
  );
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

function AdminProductModal({ product, onClose, onSuccess, token }: any) {
  const [form, setForm] = useState(
    product || {
      name: "",
      brand: "MAISON ÉLITE",
      price: "",
      originalPrice: "",
      image: "",
      category: "Women",
      description: "",
      size: "50ml",
      rating: 4.5,
      reviews: 0,
      badge: "",
      notes: "",
      stock: 0,
    }
  );
  const [imageMode, setImageMode] = useState<"upload" | "url">(
    product && product.image && !product.image.startsWith("data:") ? "url" : "upload"
  );
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image) {
      alert("Please upload an image or provide an image URL.");
      return;
    }
    const url = product
      ? `/api/products/${product.id}`
      : "/api/products";
    const method = product ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          notes: Array.isArray(form.notes) ? form.notes.join(", ") : form.notes
        }),
      });

      if (response.ok) onSuccess();
      else if (response.status === 401 || response.status === 403) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        window.location.href = "/admin/login";
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Failed to save product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#c9a96e]/20 p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <h2
          className="text-white text-2xl mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {product ? "Edit Fragrance" : "Add New Fragrance"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Product Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            />
          </div>

          <div>
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Brand</label>
            <input
              required
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            />
          </div>

          <div>
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            >
              <option>Women</option>
              <option>Men</option>
              <option>Unisex</option>
              <option>Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Price ($)</label>
            <input
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            />
          </div>

          <div>
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Stock Quantity</label>
            <input
              type="number"
              required
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Product Image (Rasm)</label>
            <div className="flex gap-4 mb-4 border-b border-[#222] pb-2">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                className={`pb-2 text-xs tracking-widest uppercase transition-all ${
                  imageMode === "upload"
                    ? "text-[#c9a96e] border-b-2 border-[#c9a96e]"
                    : "text-[#666] hover:text-[#aaa]"
                }`}
              >
                Upload File (Fayl yuklash)
              </button>
              <button
                type="button"
                onClick={() => setImageMode("url")}
                className={`pb-2 text-xs tracking-widest uppercase transition-all ${
                  imageMode === "url"
                    ? "text-[#c9a96e] border-b-2 border-[#c9a96e]"
                    : "text-[#666] hover:text-[#aaa]"
                }`}
              >
                Image URL (Rasm havolasi)
              </button>
            </div>

            {imageMode === "upload" ? (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div
                  className="flex-1 w-full border-2 border-dashed border-[#222] hover:border-[#c9a96e]/30 transition-all p-6 text-center cursor-pointer relative bg-[#111]"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      try {
                        const base64 = await compressImage(file);
                        setForm({ ...form, image: base64 });
                      } catch (err) {
                        console.error(err);
                        alert("Failed to process image");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Upload className="text-[#666]" size={24} />
                    <span className="text-xs text-[#aaa]">
                      {uploading ? "Processing image..." : "Drag & drop or click to upload perfume image"}
                    </span>
                    <span className="text-[0.65rem] text-[#555]">PNG, JPG, WEBP (Auto-compressed)</span>
                  </div>
                </div>
                {form.image && (
                  <div className="relative w-24 h-28 border border-[#222] overflow-hidden bg-[#111] flex-shrink-0">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-red-950 text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.65rem] transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <input
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="flex-1 bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
                />
                {form.image && (
                  <div className="relative w-24 h-28 border border-[#222] overflow-hidden bg-[#111] flex-shrink-0">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
                      (e.target as any).src = "https://placeholder.co/150x200?text=Invalid+URL";
                    }} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Notes (comma separated)</label>
            <input
              required
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Rose, Oud, Vanilla..."
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40 resize-none"
            />
          </div>

          <div className="col-span-2 flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#c9a96e] text-[#0a0a0a] py-4 tracking-widest uppercase hover:bg-[#b8956a] transition-colors font-medium"
            >
              Save Fragrance
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-[#222] text-[#888] py-4 tracking-widest uppercase hover:bg-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
