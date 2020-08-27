# Next FullStack Starter

Next.js + Prisma + TailwindCSS + (Type-)GraphQL

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Documentation

### Prerequisites without Docker

Moving `.env.example` to `.env`

Then get your database ready, install PostgreSQL and make sure you have a user and database matching following config:

```
DATABASE_USER=postgres
DATABASE_PASS=random
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=mydb
```

You can also customize it by updating `.env` file.

### Prerequisites with Docker

[TODO]

### Development

```bash
yarn dev
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

#### `yarn migrate:rollup`

Rollback the most recent migration.

### Style guide

#### Variable casing

Use snake_case in `schema.prisma` and GraphQL types, otherwise camelCase is preferred.

#### Filename casing

Use PascalCase for React Components, other wise use kebab-case.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
