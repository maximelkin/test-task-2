'use strict'

const amqp = require('amqplib')
const logger = require('@test-task/logger')
const uuidGenerator = require('uuid/v1')

async function connect (config) {
  const connection = await amqp.connect(config.host)
  const channel = await connection.createChannel()

  const map = new Map() // uuid -> {resolve}

  let _responseQueue = undefined

  async function initResponseQueue () {
    if (_responseQueue) {
      return _responseQueue
    }
    const { queue: responseQueue } = await channel.assertQueue('', {
      exclusive: true,
    })
    _responseQueue = responseQueue

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

    return responseQueue
  }

  return {
    async sendWaitResponse (queueName, message) {
      const responseQueue = await initResponseQueue()

      const uuid = uuidGenerator()
      await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message) || ''), {
        replyTo: responseQueue,
        correlationId: uuid,
      })
      return new Promise(resolve => {
        map.set(uuid, { resolve })
      })
    },
    async subscribe (queue, handler) {
      logger.info('starting listen queue', queue)
      channel.assertQueue(queue)
      channel.prefetch(1)
      channel.consume(queue, async msg => {
        try {
          const response = await handler(JSON.parse(msg.content))

          channel.sendToQueue(msg.properties.replyTo,
            Buffer.from(JSON.stringify(response) || 'null'),
            { correlationId: msg.properties.correlationId })

          channel.ack(msg)
        } catch (e) {
          channel.nack(msg)
          logger.error(e)
        }
      })
    },
    disconnect () {
      connection.close()
    },
  }
}

module.exports = { connect }
