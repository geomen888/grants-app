# Stage 1: Build the frontend
FROM node:20.17-slim AS build-frontend

WORKDIR /usr/src/app

# Copy only package.json and pnpm-lock.yaml to avoid unnecessary files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally and dependencies
RUN npm i -g npm@latest && \
    npm install -g pnpm && \
    pnpm bin -g &&\
    pnpm install

# Copy the rest of the source code, excluding node_modules using .dockerignore
COPY . .

# Build the frontend for production
RUN pnpm run build

# Stage 2: Serve the frontend
FROM nginx:alpine

COPY --from=build-frontend /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
