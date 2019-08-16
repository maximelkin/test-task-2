module.exports = {
  rabbit: {
    host: process.env.RABBIT_HOST,
  },
  redis: process.env.REDIS_HOST,
  queues: {
    calculateTop: process.env.RABBIT_CALCULATE_TOP,
  },
  feeds: {
    topProductiveAuthors: process.env.TOP_PRODUCTIVE_AUTHORS,
  },
  calculator: {
    limitAuthors: parseInt(process.env.AUTHORS_LIMIT, 10),
    minBookPages: parseInt(process.env.MIN_BOOK_PAGES, 10),
    interval: parseInt(process.env.RECALCULATE_INTERVAL, 10),
  },
}
