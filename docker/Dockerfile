# Base
FROM node:lts-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Dev
FROM base as dev
COPY . .
CMD ["npm", "run", "dev"]

# Test
FROM dev as test

# Build stage
FROM base as build-stage
ARG NODE_ENV
ARG VITE_API_URL
ARG VITE_APP_DESCRIPTION
ARG VITE_APP_NAME
ARG VITE_APP_URL
ENV NODE_ENV=$NODE_ENV
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_DESCRIPTION=$VITE_APP_DESCRIPTION
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_URL=$VITE_APP_URL
COPY . .
RUN npm run build

# Build
FROM nginx:alpine as build
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN apk add --no-cache gettext
COPY docker/build/nginx/nginx.conf.template /etc/nginx/templates/nginx.conf.template
CMD envsubst '$API_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'
