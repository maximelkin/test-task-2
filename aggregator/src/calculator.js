const config = require('./config')
const logger = require('./logger')

function calculator ({ queueManager, feedManager }) {
  setInterval(
    async () => {
      try {
        logger.info('Starting recalculation of top')
        const data = await queueManager.sendWaitResponse(config.queues.calculateTop, config.calculator)
        await feedManager.set(config.feeds.topProductiveAuthors, data || [])
      } catch (e) {
        logger.error(e)
      }
    },
    config.calculator.interval,
  )
}

module.exports = { calculator }
