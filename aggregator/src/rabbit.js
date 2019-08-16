'use strict'

const amqp = require('amqplib')
const config = require('./config')
const logger = require('./logger')
const uuidGenerator = require('uuid/v1')

async function connect () {
  const connection = await amqp.connect(config.rabbit.host)
  const channel = await connection.createChannel()

  const { queue: responseQueue } = await channel.assertQueue('', {
    exclusive: true,
  })

  const map = new Map() // uuid -> {resolve}

  logger.info('Starting listen response queue', responseQueue)
  channel.consume(responseQueue, msg => {
    const { correlationId } = msg.properties
    if (map.has(correlationId)) {
      map.get(correlationId).resolve(JSON.parse(msg.content))
      map.delete(correlationId)
    } else {
      logger.error('unexpected message:', correlationId)
    }
  }, { noAck: true })

  return {
    async sendWaitResponse (queueName, message) {
      const uuid = uuidGenerator()
      await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message) || 'null'), {
        replyTo: responseQueue,
        correlationId: uuid,
      })
      return new Promise(resolve => {
        map.set(uuid, { resolve })
      })
    },
    disconnect () {
      connection.close()
    },
  }
}

module.exports = { connect }
