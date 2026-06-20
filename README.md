# IkkiAttor Parfums — Online Store

Premium parfyumeriya onlayn do'koni. React + TypeScript frontend va Express + Prisma backend asosida qurilgan, Telegram orqali buyurtma qabul qiladi, ko'p tilli (uz / ru / en) interfeysga ega.

## Texnologiyalar

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, react-router v7, i18next
- **Backend:** Node.js, Express 5, Prisma ORM, SQLite, JWT, bcrypt
- **Deploy:** Docker, docker-compose, nginx, GitHub Container Registry

## Loyiha tuzilmasi

```
.
├── src/                  # Frontend (React)
│   └── app/
│       ├── components/   # UI komponentlar
│       ├── context/      # CartContext, ThemeContext
│       ├── hooks/        # useProducts va boshqalar
│       ├── pages/        # Home, Shop, Checkout, Admin, ...
│       └── routes.tsx
├── backend/              # Backend (Express + Prisma)
│   ├── prisma/           # schema, migrations, seed
│   ├── server.ts         # API server
│   └── .env.example
├── docker-compose.yml
└── nginx.conf
```

## Talablar

- Node.js 18+ va npm
- (ixtiyoriy) Docker va docker-compose

## Lokal ishga tushirish

### 1. Frontend

```bash
npm install
npm run dev
```

Vite dev-server `http://localhost:5173` da ishga tushadi va `/api` so'rovlarini backendga uzatadi.

### 2. Backend

```bash
cd backend
npm install

# .env faylini yarating
cp .env.example .env
# .env ichidagi JWT_SECRET ni kuchli tasodifiy qiymatga o'zgartiring:
#   openssl rand -base64 48

# Ma'lumotlar bazasini tayyorlash
npx prisma migrate dev

# Boshlang'ich ma'lumotlar (mahsulotlar + admin)
npm run seed

# Dev rejimida ishga tushirish
npm run dev
```

Backend `http://localhost:3001` da ishlaydi.

> **Eslatma:** `JWT_SECRET` o'rnatilmasa server qasddan ishga tushmaydi (xavfsizlik talabi).

## Muhit o'zgaruvchilari (backend/.env)

| O'zgaruvchi    | Tavsif                                  | Misol                          |
|----------------|-----------------------------------------|--------------------------------|
| `DATABASE_URL` | SQLite bazasi manzili                   | `file:./prisma/dev.db`         |
| `JWT_SECRET`   | JWT tokenlarni imzolash uchun maxfiy kalit (majburiy) | `openssl rand -base64 48` |
| `PORT`         | API server porti                        | `3001`                         |

## Docker bilan ishga tushirish

```bash
# JWT_SECRET ni eksport qiling (yoki .env faylida bering)
export JWT_SECRET="<kuchli-tasodifiy-qiymat>"
export GITHUB_REPOSITORY_OWNER="<github-username>"

docker-compose up -d
```

Frontend `http://localhost:3000`, backend ichki tarmoqda `backend:3001` da ishlaydi (nginx `/api` ni proxy qiladi).

## Asosiy API endpointlar

| Metod  | Yo'l                  | Auth | Tavsif                       |
|--------|-----------------------|------|------------------------------|
| POST   | `/api/auth/login`     | —    | Admin login (rate-limited)   |
| GET    | `/api/auth/verify`    | ✓    | Token amal qilishini tekshirish |
| GET    | `/api/products`       | —    | Barcha mahsulotlar           |
| GET    | `/api/products/:id`   | —    | Bitta mahsulot               |
| POST   | `/api/products`       | ✓    | Mahsulot qo'shish            |
| PUT    | `/api/products/:id`   | ✓    | Mahsulotni tahrirlash        |
| DELETE | `/api/products/:id`   | ✓    | Mahsulotni o'chirish         |
| GET    | `/api/categories`     | —    | Kategoriyalar                |
| POST   | `/api/orders`         | —    | Buyurtma yaratish (stockni tekshiradi va kamaytiradi) |

Auth talab qilinadigan endpointlarga `Authorization: Bearer <token>` sarlavhasi bilan murojaat qilinadi.

## Build

```bash
# Frontend
npm run build

# Backend
cd backend && npm run build && npm start
```
