# Use Node.js 18 alpine as base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript code (if needed)
# RUN npm run build

# Expose the port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
