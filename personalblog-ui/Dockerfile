# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Accept the build mode (default: production)
ARG VITE_APP_ENV=production

# Set mode as environment variable
ENV VITE_APP_ENV=$VITE_APP_ENV

# Echo to verify what mode is used
RUN echo "🔧 Building with mode: ${VITE_APP_ENV}"

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source
COPY . .

# ⛏️ Build with correct mode
RUN npm run build -- --mode=${VITE_APP_ENV}

# --- Run stage ---
FROM nginx:alpine

# Set environment variable in final image
ENV VITE_APP_ENV=production

# Clean default HTML content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
