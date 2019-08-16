const logger = require('@test-task/logger')
const { calculator } = require('./calculator')
const config = require('./config')
const { connect: rabbitConnect } = require('@test-task/rabbit-rpc')
const { connect: redisConnect } = require('@test-task/redis')

async function main () {
  const rabbit = await rabbitConnect(config.rabbit)
  const redis = await redisConnect(config.redis)
  await calculator({ queueManager: rabbit, feedManager: redis })
}

main()
  .catch(error => {
    logger.error(error)
    process.exit(-1)
  })
