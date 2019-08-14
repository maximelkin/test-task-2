'use strict'

module.exports = {
  rabbit: {
    host: process.env.RABBIT_HOST,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  queues: {
    createBook: process.env.RABBIT_CREATE_BOOK,
    createAuthor: process.env.RABBIT_CREATE_AUTHOR,
    calculateTop: process.env.RABBIT_CALCULATE_TOP,
  },

}
