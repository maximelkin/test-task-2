FROM node:10-alpine

WORKDIR /app

RUN apk update
RUN apk add bash

RUN npm i -g lerna

COPY package*.json ./
COPY lerna.json ./

COPY packages/ packages/
COPY wait-for-it.sh ./

RUN lerna bootstrap -- --hoist --production
