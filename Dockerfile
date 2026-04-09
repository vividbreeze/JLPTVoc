# ── Stage 1: Build frontend ──────────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ── Stage 2: Build backend ────────────────────────────────────────────────────
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# ── Stage 3: Production image ─────────────────────────────────────────────────
FROM node:20-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

# Copy compiled backend
COPY --from=backend-builder /app/backend/dist ./backend/dist

# Copy compiled frontend into the place backend will serve it
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Persistent data volume
VOLUME ["/app/data"]
ENV DB_PATH=/app/data
ENV NODE_ENV=production
ENV PORT=3001
ENV CORS_ORIGIN=*

EXPOSE 3001

CMD ["node", "backend/dist/index.js"]
