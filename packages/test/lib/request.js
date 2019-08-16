'use strict'

const config = require('./config')
const requestLib = require('request-promise-native')

module.exports.request = requestLib.defaults({
  baseUrl: config.api,
  json: true,
})
