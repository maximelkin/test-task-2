'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { database: config } = require('../config')
const db = {}

const sequelize = new Sequelize(config.url, config)

const modelsDir = path.join(__dirname, 'models')

fs
  .readdirSync(modelsDir)
  .filter(file => !file.startsWith('.') && file.endsWith('.js'))
  .forEach(file => {
    const model = sequelize['import'](path.join(modelsDir, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
