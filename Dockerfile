FROM node:24-alpine AS build

WORKDIR /app
ENV CI=true
ENV PUBLIC_URL=https://carbonorm.miles.systems/

COPY package*.json ./
RUN npm ci --legacy-peer-deps --ignore-scripts

COPY config-overrides.js tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm run build:actions

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
