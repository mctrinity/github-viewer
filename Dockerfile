# Use the official Bun 1.2.9 image
FROM oven/bun:1.2.9

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Run build
RUN bun run clean:build

# Serve static site
CMD ["bunx", "serve", "dist"]
