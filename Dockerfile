# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build:release

# Runtime stage
FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production \
    && npm install -g npm@latest

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]
