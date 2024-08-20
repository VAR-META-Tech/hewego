## Description

Hewego frontend repository.

## Environment requirement

> NodeJS: `18.20.3`
>
> pnpm: `8.15.2` or LTS latest

## Installation dependencies

```bash
cp .env.example .env.local
pnpm install
pnpm build
```

## Development (For Developer)

```bash
pnpm dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Poppins, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Build For Production

```bash
pnpm build
```
Copy all content in `.next` for deployment

### or Run Docker

```bash
1. Move to root folder
2. Run chmod +x build-and-run.sh
3. Run ./build-and-run0-fe.sh
```
