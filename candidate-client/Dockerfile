FROM node:18-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm build

FROM node:18-alpine AS deploy-node

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "server.js"]
