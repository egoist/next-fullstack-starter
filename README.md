# Next FullStack Starter

Next.js + Prisma + TailwindCSS + (Type-)GraphQL

This project serves as the starting point of some of my SaaS products, so I'm continuously improving it.

## Documentation

### Prerequisites without Docker

Moving `.env.example` to `.env`.

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

Moving `.env.example` to `.env`.

Change `myapp` in `docker-compose.yml` to your custom app name which is used to name containers.

Then install Docker and run following command to start the database container:

```bash
docker-compose up -d
```

It will create a database matching the config in `.env` file, feel free to update it and rerun above command.

### Development

```bash
yarn
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

### Style guide

#### Variable casing

Use snake_case in `schema.prisma` and GraphQL types, otherwise camelCase is preferred.

#### Filename casing

Use PascalCase for React Components, other wise use kebab-case.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
