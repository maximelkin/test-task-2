const Redis = require('ioredis')
const config = require('./config')

async function connect () {
  const client = new Redis(config.redis, { lazyConnect: true })
  await client.connect()

  return {
    async get (key) {
      const value = await client.get(key)
      return value && JSON.parse(value)
    },
  }
}

module.exports = {
  connect,
}
