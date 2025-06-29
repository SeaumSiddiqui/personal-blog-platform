# --- Build stage: install Node deps and build app ---
FROM node:20-alpine AS build
LABEL authors="seaum siddiqui"
WORKDIR /app

# Accept build arg to choose env file (default: dev)
ARG VITE_APP_ENV=dev
ENV VITE_APP_ENV=$VITE_APP_ENV

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the entire app source
COPY . .

# Copy the appropriate .env file based on build arg
RUN cp .env.$VITE_APP_ENV .env

# Build the app
RUN npm run build

# --- Run stage: serve with Nginx ---
FROM nginx:alpine

# Clean default html dir
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
