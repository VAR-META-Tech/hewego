FROM node:18-alpine AS base
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN npm install -g turbo
RUN turbo prune website --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm -f
RUN pnpm install
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm turbo build --filter=web...

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/website/package.json /app/apps/website/package.json
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/next.config.js /app/apps/website/next.config.js
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/.next /app/apps/website/.next
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/node_modules /app/apps/website/node_modules
COPY --from=installer --chown=nextjs:nodejs /app/apps/website/public /app/apps/website/public
COPY --from=installer --chown=nextjs:nodejs /app/node_modules /app/node_modules

WORKDIR /app/apps/website
EXPOSE 3000

CMD ["pnpm", "start"]