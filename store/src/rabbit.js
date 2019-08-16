'use strict'

const amqp = require('amqplib')
const config = require('./config')
const logger = require('./logger')

async function connect () {
  const connection = await amqp.connect(config.rabbit.host)
  const channel = await connection.createChannel()

  return {
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
