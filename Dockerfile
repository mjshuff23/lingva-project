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
    RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
    RUN chown nextjs:nodejs . && chown -R nextjs:nodejs /app
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
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/public ./public
    USER nextjs
    EXPOSE 3000
    HEALTHCHECK --interval=1m --timeout=3s CMD curl -f http://localhost:3000/ || exit 1
    CMD ["npm", "start"]