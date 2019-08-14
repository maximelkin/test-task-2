'use strict'

const amqp = require('amqp')
const config = require('./config')

async function connect () {
  const connection = await amqp.connect(config.rabbit.host)

  return {
    async subscribe (channelName, cb) {
      const channel = await connection.createChannel()
      channel.assertQueue(channelName)
      channel.consume(channelName, async msg => {
        const response = await cb(JSON.parse(msg.content))

        channel.sendToQueue(msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          { correlationId: msg.properties.correlationId })

        channel.ack(msg)
      })
    },
    disconnect () {
      connection.close()
    },
  }
}

module.exports = { connect }
