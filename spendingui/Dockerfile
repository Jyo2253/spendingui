# Stage 1: Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the entire application code except files excluded in .dockerignore
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine

# Copy the build output to Nginx's default static directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
