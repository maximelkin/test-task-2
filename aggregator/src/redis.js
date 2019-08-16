const Redis = require('ioredis')
const config = require('./config')

async function connect () {
  const client = new Redis(config.redis, { lazyConnect: true })
  await client.connect()

  return {
    async set (key, value) {
      await client.set(key, JSON.stringify(value))
    },
  }
}

module.exports = {
  connect,
}
