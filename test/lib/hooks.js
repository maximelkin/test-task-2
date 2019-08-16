const { request } = require('./request')
const { beforeEach } = require('mocha')

beforeEach(async () => {
  await request.post('/dev/drop')
})
