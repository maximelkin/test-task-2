'use strict'

const { connect: dbConnect } = require('./database')
const { connect: rabbitConnect } = require('./rabbit')
const { controllers } = require('./controllers')
const logger = require('./logger')

async function main () {
  const db = await dbConnect()
  const rabbit = await rabbitConnect()

  await controllers({ db, queueManager: rabbit })
  logger.info('setup is done')
}

main()
  .catch(error => {
    console.error(error)
    process.exit(-1)
  })
