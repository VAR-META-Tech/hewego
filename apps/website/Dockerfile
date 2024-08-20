FROM node:18.12.1-alpine AS builder

ENV PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    UV_THREADPOOL_SIZE=64 \
    NODE_ENV=production \
    PORT=3000

RUN corepack enable

WORKDIR /app

# copy all required package.json files for installation
COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install --prod --frozen-lockfile

# copy all built files required to run the app
COPY . .

USER node

EXPOSE 3000

WORKDIR apps/website

CMD ["pnpm", "start"]

