const Fastify = require('fastify')
const config = require('./config')
const controllers = require('./controllers')
const logger = require('@test-task/logger')
const { connect: rabbitConnect } = require('@test-task/rabbit-rpc')
const { connect: redisConnect } = require('@test-task/redis')

async function main () {
  const rabbit = await rabbitConnect(config.rabbit)
  const redis = await redisConnect(config.redis)
  const fastify = Fastify({
    logger: true,
  })

  fastify.register(controllers, { queueManager: rabbit, feedManager: redis })

  await fastify.ready()
  await fastify.listen(config.http.port, '0.0.0.0')
  logger.info('Api listening port', config.http.port)
  logger.info('routes', fastify.printRoutes())
}

main()
  .catch(error => {
    logger.error(error)
    process.exit(-1)
  })
