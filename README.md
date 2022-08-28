# Next FullStack Starter

Next.js + Prisma + TailwindCSS + (Type-)GraphQL

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Features

- Query database with [Prisma](https://prisma.io)
- [Fullstack development with TRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com)
- More to come..

## Documentation

### Prerequisites

Moving `.env.example` to `.env`.

Then get your database ready, install PostgreSQL and make sure you have a user and database matching the default one we use:

```
DB_URL="postgresql://postgres:pass@localhost:5432/mydb?schema=public"
```

You can also customize it by updating `.env` file.

### Development

```bash
# Install dependencies
pnpm i

# Start Next.js
pnpm dev
```

### NPM Scripts

#### `pnpm dev`

Run the development server.

#### `pnpm build`

Build for production.

#### `pnpm prisma-client`

Generate Prisma client.

#### `pnpm migrate-dev`

**For development only**

Save migrate files, and apply changes to database, typically you should run this after making changes to `prisma/schema.prisma`.

#### `pnpm migrate-deploy`

**For production only**

Applying local migrations to the database.

### TRPC

[TRPC](https://trpc.io) app router is located at [server/trpc/index.ts](./server/trpc/index.ts).

### webpack

#### Aliases

We also added two Next.js/TS aliases: `$src` for `src` folder and `$server` for `server` folder.

### Style guide

#### Variable casing

Use PascalCase for Component name, otherwise camelCase is preferred.

#### Filename casing

Use PascalCase for React component files, other wise use kebab-case.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
