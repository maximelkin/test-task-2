'use strict'

const dbModule = require('./db')
const rabbitModule = require('./rabbit')
const config = require('./config')

async function main () {
  const db = await dbModule.connect()
  const rabbit = await rabbitModule.connect()

  rabbit.subscribe(config.queues.createBook, book => {
    return db.createBook(book) // todo validation is author exists
  })

  rabbit.subscribe(config.queues.createAuthor, author => {
    return db.createAuthor(author)
  })

  rabbit.subscribe(config.queues.calculateTop, limit => {
    return db.calculateTop(limit)
  })
}

main()
  .catch(error => {
    console.error(error)
    process.exit(-1)
  })
