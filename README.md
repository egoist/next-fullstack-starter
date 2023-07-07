# Next FullStack Starter

Next.js + Prisma + TailwindCSS + TRPC

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Features

- Query database with [Prisma](https://prisma.io)
- [Fullstack development with TRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com)
- Login by sending code to email
- More to come..

## Documentation

### Prerequisites

Moving `.env.example` to `.env`.

Use [direnv](https://direnv.net/) to automatically load environment variables.

Then get your database ready, install PostgreSQL and make sure you have a user and database matching the default one we use:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
```

You can also customize it by updating `.env` file.

### Development

```bash
# Install dependencies
pnpm i

# Initial database
pnpm --filter web db-push

# Start Next.js web app
pnpm dev
```

### NPM Scripts

#### `pnpm dev`

Run the development server for web app.

#### `pnpm build`

Build the web app.

### TRPC

[TRPC](https://trpc.io) app router is located at [server/trpc/index.ts](./server/trpc/index.ts).

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
