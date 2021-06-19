# Next FullStack Starter

Next.js + Prisma + TailwindCSS + (Type-)GraphQL

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Features

- Query database with [Prisma](https://prisma.io)
- [Type-first approach for writing GraphQL schema](https://typegraphql.com/)
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
yarn

# Apply migrations if you're running for the first time
yarn migrate-dev

# Start Next.js
yarn dev
```

### NPM Scripts

#### `yarn dev`

Run the development server.

#### `yarn build`

Build for production.

#### `yarn gql-gen`

Generate React (urql) hooks for GraphQL queries, powered by [GraphQL Code Generator](https://graphql-code-generator.com/)

#### `yarn prisma-client`

Generate Prisma client.

#### `yarn migrate-dev`

**For development only**

Save migrate files, and apply changes to database, typically you should run this after making changes to `prisma/schema.prisma`.

#### `yarn migrate-deploy`

**For production only**

Applying local migrations to the database.

### webpack

#### Aliases

We also added two Next.js/TS aliases: `$src` for `src` folder and `$server` for `server` folder.

### GraphQL

We create a GraphQL at `/api/graphql` using Apollo Server and Type GraphQL, GraphQL resolvers are populated at `server/resolvers`, consult [Type GraphQL](https://typegraphql.com/docs/custom-decorators.html) docs for more.

Every time you create a new resolver file you need to add it to `src/pages/api/graphql.ts`.

On the client-side we use urql to execute GraphQL queries, you should write GraphQL queries using SDL in `src/graphql` and run `yarn gql-gen` to generate corresponding React hooks, and import the generated hooks from `src/generated/graphql` like this:

```ts
import { useCurrentUserQuery } from '$src/generated/graphql'

const currentUser = useCurrentUserQuery()

if (currentUser.loading) {
  return null
}

return <div>{currentUser.data.currentUser.name}</div>
```

### Style guide

#### Variable casing

Use PascalCase for Component name, otherwise camelCase is preferred.

#### Filename casing

Use PascalCase for React component files, other wise use kebab-case.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
