# backend/Dockerfile (Node.js multi-stage)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production


FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# no build step needed; placeholder for transpilation if required


FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY package*.json ./
EXPOSE 3000
CMD ["node", "src/index.js"]