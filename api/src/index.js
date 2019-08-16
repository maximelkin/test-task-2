const Fastify = require('fastify')
const config = require('./config')
const controllers = require('./controllers')
const logger = require('./logger')
const { connect: rabbitConnect } = require('./rabbit')
const { connect: redisConnect } = require('./redis')

async function main () {
  const rabbit = await rabbitConnect()
  const redis = await redisConnect()
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
