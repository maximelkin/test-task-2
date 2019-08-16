module.exports = {
  allowDev: process.env.ALLOW_DEV === 'true',
  http: {
    port: process.env.PORT,
  },
  rabbit: {
    host: process.env.RABBIT_HOST,
  },
  redis: process.env.REDIS_HOST,
  queues: {
    createBook: process.env.RABBIT_CREATE_BOOK,
    createAuthor: process.env.RABBIT_CREATE_AUTHOR,
    devCleanStore: process.env.RABBIT_DEV_CLEAN_STORE,
  },
  feeds: {
    topProductiveAuthors: process.env.TOP_PRODUCTIVE_AUTHORS,
  },

}
