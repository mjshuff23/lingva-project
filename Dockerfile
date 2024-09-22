# --- Base Image for Dev and Prod ---
FROM node:lts-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat curl

# --- Install dependencies (including dev dependencies for build) ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm install

# --- Development environment ---
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure all files are usable by all users
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
RUN mkdir -p /app/.next && chown -R nextjs:nodejs /app/.next

# Set permissions to be usable by all users
RUN chmod -R 777 /app

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "dev"]

# --- Build app for Production ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Production environment ---
FROM base AS prod
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Ensure permissions for all users in production
RUN chmod -R 777 /app

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
HEALTHCHECK --interval=1m --timeout=3s CMD curl -f http://localhost:3000/ || exit 1
CMD ["npm", "start"]