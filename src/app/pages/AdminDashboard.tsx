import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Edit2, Trash2, LogOut, Package, Tag, DollarSign, Image as ImageIcon } from "lucide-react";
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

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
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
      if (response.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      else alert("Failed to save product");
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
            <label className="block text-[#666] text-[0.6rem] tracking-widest uppercase mb-2">Image URL</label>
            <div className="flex gap-2">
              <input
                required
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="flex-1 bg-[#111] border border-[#222] text-white px-4 py-3 outline-none focus:border-[#c9a96e]/40"
              />
              <ImageIcon className="text-[#444] self-center" size={20} />
            </div>
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
