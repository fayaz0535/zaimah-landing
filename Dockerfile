# Stage 1 — deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Stage 2 — builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3 — runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

RUN addgroup --system --gid 1001 zaimah && \
    adduser  --system --uid 1001 zaimah

COPY --from=builder --chown=zaimah:zaimah /app/.next/standalone ./
COPY --from=builder --chown=zaimah:zaimah /app/.next/static ./.next/static
COPY --from=builder --chown=zaimah:zaimah /app/public ./public

USER zaimah
EXPOSE 3001

CMD ["node", "server.js"]
