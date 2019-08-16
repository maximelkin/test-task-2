const logger = require('./logger')
const { calculator } = require('./calculator')
const { connect: rabbitConnect } = require('./rabbit')
const { connect: redisConnect } = require('./redis')

async function main () {
  const rabbit = await rabbitConnect()
  const redis = await redisConnect()
  await calculator({ queueManager: rabbit, feedManager: redis })
}

main()
  .catch(error => {
    logger.error(error)
    process.exit(-1)
  })
