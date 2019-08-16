'use strict'

const config = require('./config')

async function controllers ({ queueManager, db }) {
  await queueManager.subscribe(config.queues.createBook, book =>
    db.createBook(book),
  )

  await queueManager.subscribe(config.queues.createAuthor, author =>
    db.createAuthor(author),
  )

  await queueManager.subscribe(config.queues.calculateTop, ({ limit, minBookPages }) =>
    db.calculateTop(limit, minBookPages),
  )

  if (config.allowDev) {
    await queueManager.subscribe(config.queues.devCleanStore, () =>
      db.cleanStore(),
    )
  }
}

module.exports = { controllers }
