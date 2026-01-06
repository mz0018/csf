# Use official Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

EXPOSE 5001

# Start the server0
CMD ["node", "server.js"]