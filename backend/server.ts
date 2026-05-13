import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

// 🔴 Priority Fix #3: Crash on missing JWT_SECRET instead of using hardcoded fallback
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required but not set.');
}

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// 🟡 Priority Fix #5: Restrict CORS to production domain
const allowedOrigins = ['https://ikkiattor.uz', 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

// Auth Middleware
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Token verify endpoint (for ProtectedRoute client-side guard)
app.get('/api/auth/verify', authenticateToken, (req: any, res) => {
  res.json({ valid: true, user: req.user });
});

// --- PRODUCT ENDPOINTS ---

app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products.map(p => ({ ...p, notes: p.notes.split(',').map((n: string) => n.trim()) })));
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    if (product) res.json({ ...product, notes: product.notes.split(',').map((n: string) => n.trim()) });
    else res.status(404).json({ error: 'Product not found' });
  } catch {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', authenticateToken, async (req, res) => {
  const { name, brand, price, originalPrice, image, category, description, size, rating, reviews, badge, notes, stock } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, brand, price: parseFloat(price), originalPrice: originalPrice ? parseFloat(originalPrice) : null, image, category, description, size, rating: parseFloat(rating) || 0, reviews: parseInt(reviews) || 0, badge, notes, stock: parseInt(stock) || 0 }
    });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const { name, brand, price, originalPrice, image, category, description, size, rating, reviews, badge, notes, stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { name, brand, price: parseFloat(price), originalPrice: originalPrice ? parseFloat(originalPrice) : null, image, category, description, size, rating: parseFloat(rating), reviews: parseInt(reviews), badge, notes, stock: parseInt(stock) }
    });
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Product deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// --- CATEGORY ENDPOINTS ---

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// --- ORDER ENDPOINTS ---

app.post('/api/orders', async (req, res) => {
  const { customerName, email, address, city, items, total } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        customerName, email, address, city, total,
        items: { create: items.map((item: any) => ({ productId: item.id, quantity: item.quantity, price: item.price })) }
      },
      include: { items: true }
    });
    res.status(201).json(order);
  } catch {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
