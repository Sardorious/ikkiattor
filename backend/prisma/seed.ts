import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  {
    name: "Rose Éternelle",
    brand: "MAISON ÉLITE",
    price: 189,
    originalPrice: 220,
    image: "https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMHBlcmZ1bWUlMjBmbG9yYWwlMjByb3NlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Women",
    notes: "Rose, Peony, Musk, Sandalwood",
    description: "A timeless floral masterpiece that captures the essence of a blooming rose garden at dawn. Delicate petals unfurl into a warm, musky base that lingers beautifully on the skin.",
    size: "50ml",
    rating: 4.8,
    reviews: 234,
    badge: "Bestseller",
  },
  {
    name: "Noir Absolu",
    brand: "MAISON ÉLITE",
    price: 215,
    image: "https://images.unsplash.com/photo-1736605406021-afd8241d5edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjb2xvZ25lJTIwd29vZHklMjBkYXJrJTIwYm90dGxlfGVufDF8fHx8MTc3ODMzNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Men",
    notes: "Bergamot, Vetiver, Cedar, Black Pepper",
    description: "A bold and sophisticated fragrance for the modern man. Deep woody notes are elevated by spicy pepper and a bright citrus opening, creating an unforgettable signature scent.",
    size: "100ml",
    rating: 4.9,
    reviews: 189,
    badge: "New",
  },
  {
    name: "Oud Royale",
    brand: "MAISON ÉLITE",
    price: 320,
    image: "https://images.unsplash.com/photo-1637645367952-687dca50d655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdWQlMjBhcmFiaWMlMjBwZXJmdW1lJTIwbHV4dXJ5fGVufDF8fHx8MTc3ODMzNzc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Unisex",
    notes: "Oud, Rose, Amber, Saffron",
    description: "A majestic oud fragrance inspired by the ancient spice routes. Rich, smoky oud is blended with precious rose and warm amber to create an opulent, long-lasting experience.",
    size: "50ml",
    rating: 4.7,
    reviews: 156,
    badge: "Luxury",
  },
  {
    name: "Aqua Fresca",
    brand: "MAISON ÉLITE",
    price: 145,
    image: "https://images.unsplash.com/photo-1709828933413-96855c9cfcc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGNpdHJ1cyUyMHBlcmZ1bWUlMjBsaWdodHxlbnwxfHx8fDE3NzgzMzc3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Unisex",
    notes: "Lemon, Neroli, Sea Salt, White Musk",
    description: "A refreshing and invigorating scent that evokes the feeling of a Mediterranean breeze. Bright citrus notes dance with crisp sea salt and a clean, airy musk base.",
    size: "75ml",
    rating: 4.6,
    reviews: 98,
  },
  {
    name: "Velvet Orchid",
    brand: "MAISON ÉLITE",
    price: 175,
    originalPrice: 200,
    image: "https://images.unsplash.com/photo-1773527142304-58116364b8a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzgxNjkyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Women",
    notes: "Orchid, Jasmine, Vanilla, Cashmere Wood",
    description: "A sensual and mysterious fragrance that wraps you in a veil of exotic orchid and warm vanilla. The perfect evening scent for those who dare to be noticed.",
    size: "50ml",
    rating: 4.8,
    reviews: 201,
    badge: "Sale",
  },
  {
    name: "Cedar & Smoke",
    brand: "MAISON ÉLITE",
    price: 195,
    image: "https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzgzMzc3Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Men",
    notes: "Cedar, Smoke, Leather, Tobacco",
    description: "An earthy, smoky composition that draws inspiration from ancient forests and open fires. A statement fragrance that embodies strength and sophistication.",
    size: "100ml",
    rating: 4.5,
    reviews: 87,
  },
];

const categories = [
  { name: "Women", count: 24, description: "Floral, feminine & captivating" },
  { name: "Men", count: 18, description: "Bold, woody & distinguished" },
  { name: "Unisex", count: 15, description: "Versatile & modern" },
  { name: "Luxury", count: 9, description: "Rare & precious ingredients" },
];

async function main() {
  console.log('Start seeding...');

  // Create Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@lumiere.com' },
    update: {},
    create: {
      email: 'admin@lumiere.com',
      password: hashedPassword,
    },
  });
  console.log('Admin created: admin@lumiere.com / admin123');
  
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat,
    });
  }

  for (const p of products) {
    await prisma.product.create({
      data: { ...p, stock: 10 },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
