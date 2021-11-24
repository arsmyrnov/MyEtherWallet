FROM node:12-buster as build

ENV NODE_OPTIONS --max-old-space-size=8192
RUN npm install npm@6.14 -g
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
