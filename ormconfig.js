require('dotenv/config')

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['server-dist/orm/*.entity.js'],
  migrations: ['server-dist/migrations/*.js'],
  logging: process.env.NODE_ENV === 'development',
  cli: {
    migrationsDir: 'server/migrations',
  },
}
