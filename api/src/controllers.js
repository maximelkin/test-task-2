'use strict'

const { bookCreate, authorRead, authorCreate } = require('./schemas')
const { allowDev, queues, feeds } = require('./config')

module.exports = (fastify, { queueManager, feedManager }, done) => {
  fastify.post(
    '/author',
    {
      schema: {
        body: authorCreate,
        response: {
          201: {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'integer' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const result = await queueManager.sendWaitResponse(queues.createAuthor, request.body)
      console.info(result)
      reply
        .code(201)
        .send(result)
    })

  fastify.post(
    '/book',
    {
      schema: {
        body: bookCreate,
        response: {
          201: {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'integer' },
            },
          },
          422: {
            type: 'object',
            required: ['message'],
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const result = await queueManager.sendWaitResponse(queues.createBook, request.body)
      switch (result.status) {
        case 'success':
          reply
            .code(201)
            .send(result.body)
          break
        case 'error':
          reply
            .code(422)
            .send(result.error)
          break
      }
    })

  fastify.get(
    '/top5',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: authorRead,
          },
        },
      },
    },
    async () => feedManager.get(feeds.topProductiveAuthors)
  )

  if (allowDev) {
    fastify.post(
      '/dev/drop',
      async () => queueManager.sendWaitResponse(queues.devCleanStore, null)
    )
  }

  done()
}
