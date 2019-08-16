const Redis = require('ioredis')

async function connect (config) {
  const client = new Redis(config, { lazyConnect: true })
  await client.connect()

  return {
    async get (key) {
      const value = await client.get(key)
      return value && JSON.parse(value)
    },
    async set (key, value) {
      await client.set(key, JSON.stringify(value))
    },
  }
}

module.exports = {
  connect,
}
