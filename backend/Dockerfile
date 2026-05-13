# Use Node.js 18 alpine as base image
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL deps (including devDeps for tsc)
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy source
COPY . .

# 🔴 Priority Fix #2: Compile TypeScript instead of using ts-node at runtime
RUN npm run build

EXPOSE 3001

# Run compiled JS — fast startup, no TypeScript overhead
CMD ["node", "dist/server.js"]
