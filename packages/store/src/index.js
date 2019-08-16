'use strict'

const { connect: dbConnect } = require('./database')
const { connect: rabbitConnect } = require('@test-task/rabbit-rpc')
const { controllers } = require('./controllers')
const config = require('./config')
const logger = require('@test-task/logger')

async function main () {
  const db = await dbConnect()
  const rabbit = await rabbitConnect(config.rabbit)

  await controllers({ db, queueManager: rabbit })
  logger.info('setup is done')
}

main()
  .catch(error => {
    console.error(error)
    process.exit(-1)
  })
