'use strict'

module.exports = {
  allowDev: process.env.ALLOW_DEV === 'true',
  rabbit: {
    host: process.env.RABBIT_HOST,
  },
  database: {
    url: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
  queues: {
    createBook: process.env.RABBIT_CREATE_BOOK,
    createAuthor: process.env.RABBIT_CREATE_AUTHOR,
    calculateTop: process.env.RABBIT_CALCULATE_TOP,
    devCleanStore: process.env.RABBIT_DEV_CLEAN_STORE,
  },
}
