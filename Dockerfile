FROM node:12-buster as build

ENV HOME /home
ENV NODE_OPTIONS --max-old-space-size=8192
RUN npm install npm@6.14 -g
RUN node -v && npm -v
WORKDIR /home
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 8080
