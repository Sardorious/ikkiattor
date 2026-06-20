import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';

dotenv.config();

// 🔴 Priority Fix #3: Crash on missing JWT_SECRET instead of using hardcoded fallback
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required but not set.');
}

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

// Sit behind nginx/Docker proxy: trust X-Forwarded-* so rate-limit sees real client IPs
app.set('trust proxy', 1);

// 🟡 Priority Fix #5: Restrict CORS to production domain
const allowedOrigins = ['https://ikkiattor.uz', 'http://localhost:3000', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS'));
  }
}));
// Base64 images are stored inline, so allow a larger JSON body
app.use(express.json({ limit: '5mb' }));

// 🔴 Fix #4: Rate limit login to block brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                  // max 10 attempts per IP per window
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper: validate and parse a numeric route param. Returns null if invalid.
const parseId = (raw: string): number | null => {
  const id = Number.parseInt(raw, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// Auth Middleware
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
};

// --- AUTH ENDPOINTS ---

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET as string, { expiresIn: '1d' });
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
    res.json(products.map((p: any) => ({ ...p, notes: p.notes.split(',').map((n: string) => n.trim()) })));
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid product id' });
  try {
    const product = await prisma.product.findUnique({ where: { id } });
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
      data: { name, brand, price: parseFloat(price), originalPrice: originalPrice ? parseFloat(originalPrice) : null, image, category, description, size, rating: parseFloat(rating) || 0, reviews: parseInt(reviews, 10) || 0, badge, notes, stock: parseInt(stock, 10) || 0 }
    });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateToken, async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid product id' });
  const { name, brand, price, originalPrice, image, category, description, size, rating, reviews, badge, notes, stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { name, brand, price: parseFloat(price), originalPrice: originalPrice ? parseFloat(originalPrice) : null, image, category, description, size, rating: parseFloat(rating), reviews: parseInt(reviews, 10), badge, notes, stock: parseInt(stock, 10) }
    });
    res.json(product);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Product not found' });
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid product id' });
  try {
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted' });
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Product not found' });
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
  const { customerName, email, address, city, items } = req.body;

  // 🔴 Fix #3: Validate payload instead of trusting the client
  if (!customerName || !email || !address || !city) {
    return res.status(400).json({ error: 'Missing customer details' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  try {
    // Run everything in a transaction: verify stock, compute the real total
    // from DB prices (never trust client prices), decrement stock atomically.
    const order = await prisma.$transaction(async (tx: any) => {
      let computedTotal = 0;
      const orderItemsData: { productId: number; quantity: number; price: number }[] = [];

      for (const item of items) {
        const productId = Number.parseInt(item.id, 10);
        const quantity = Number.parseInt(item.quantity, 10);
        if (!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity <= 0) {
          throw { status: 400, message: 'Invalid item in order' };
        }

        const product = await tx.product.findUnique({ where: { id: productId } });
        if (!product) {
          throw { status: 404, message: `Product ${productId} not found` };
        }
        if (product.stock < quantity) {
          throw { status: 409, message: `Insufficient stock for "${product.name}"` };
        }

        computedTotal += product.price * quantity;
        orderItemsData.push({ productId, quantity, price: product.price });

        // Decrement stock
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: quantity } },
        });
      }

      return tx.order.create({
        data: {
          customerName, email, address, city,
          total: computedTotal,
          items: { create: orderItemsData },
        },
        include: { items: true },
      });
    });

    res.status(201).json(order);
  } catch (err: any) {
    if (err?.status) return res.status(err.status).json({ error: err.message });
    res.status(500).json({ error: 'Failed to create order' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 🟢 Fix #8: Disconnect Prisma cleanly on shutdown
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  server.close(() => process.exit(0));
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
