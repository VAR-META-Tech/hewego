FROM node:18-alpine AS dist
COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:18-alpine AS node_modules
COPY package.json ./
RUN npm install -g pnpm
RUN pnpm install --prod

FROM node:18-alpine

ARG PORT=3000

ENV NODE_ENV=production

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "pnpm", "start:prod" ]
