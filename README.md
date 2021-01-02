# Next FullStack Starter

Next.js + TypeORM + TailwindCSS + (Type-)GraphQL

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Features

- Social auth (via Passport.js)
- Simple team management
- [Type-first approach for writing GraphQL schema](https://typegraphql.com/)
- More to come..

## Documentation

### Prerequisites

Moving `.env.example` to `.env`.

Then get your database ready, install PostgreSQL and make sure you have a user and database matching following config:

```
DB_USER=postgres
DB_PASS=random
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
```

You can also customize it by updating `.env` file.

### Development

```bash
# Install dependencies
yarn

# Apply migrations if you're running for the first time
yarn migrate:deploy

# Start Next.js
yarn dev:server
yarn dev:app
```

### NPM Scripts

#### `yarn dev`

Run the development server.

#### `yarn g:gql`

Generate React (Apollo) hooks for GraphQL queries, powered by [GraphQL Code Generator](https://graphql-code-generator.com/)

#### `yarn g:prism`

Generate Prisma client.

#### `yarn migrate:save`

Save migrate files, tyoically you should run this after making changes to `prisma/schema.prisma`.

#### `yarn migrate:up`

Applying local migrations to the database, run this after `yarn migrate:save`.

#### `yarn migrate:rollback`

Rollback the most recent migration.

### Folder structure

```bash
.
├── README.md
├── graphql-codegen.yml
├── graphql.schema.json       # Auto-generated GraphQL schema
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── prisma
│   └── schema.prisma         # Database schema
├── scripts
│   └── with-env.js           # Run command with `.env` file loaded
├── server
│   ├── auth.ts               # Auth helpers
│   ├── constants.ts
│   ├── db.types.ts           # Types from Prisma
│   ├── decorators            # ES decorators, mainly for Type GraphQL resolvers
│   ├── graphql.types.ts      # Types used by GraphQL resolvers
│   ├── guards                # Authorization
│   ├── passport.ts           # `passport` for social login
│   ├── prisma.ts             # Prisma instance
│   ├── resolvers             # GraphQL resolvers, powered by Type GraphQL
│   └── response.ts           # HTTP response helpers
├── src
│   ├── css                   # CSS, mainly tailwind.css
│   ├── generated             # Generate Apollo React hooks
│   ├── graphql               # .graphql files
│   └── pages                 # Next.js pages
├── tailwind.config.js
├── tsconfig.json
├── types.d.ts
└── yarn.lock
```

We also added two Next.js/TS aliases: `@` for `src` folder and `@server` for `server` folder.

### GraphQL

We create a GraphQL at `/api/graphql` using Apollo Server and Type GraphQL, GraphQL resolvers are populated at `server/resolvers`, consult [Type GraphQL](https://typegraphql.com/docs/custom-decorators.html) docs for more.

Every time you create a new resolver file you need to add it to `src/pages/api/graphql.ts`.

On the client-side we use Apollo Client to execute GraphQL query, you should write GraphQL queries using SDL in `src/graphql` and run `yarn g:gql` to generate corresponding React hooks, and import the generated hooks from `src/generated/graphql` like this:

```ts
import { useCurrentUserQuery } from '@/generated/graphql'

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
