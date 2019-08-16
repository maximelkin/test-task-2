'use strict'

const { Book, Author, sequelize, Sequelize } = require('./db')
const Umzug = require('umzug')
const path = require('path')

const { Op } = Sequelize

async function createBook (book) {
  try {
    const result = await Book.create(book)
    return {
      status: 'success',
      body: result,
    }
  } catch (e) {
    if (e instanceof Sequelize.ForeignKeyConstraintError) {
      return {
        status: 'error',
        error: 'errors.books.no-author',
      }
    }
    throw e
  }
}

async function createAuthor (author) {
  return Author.create(author)
}

async function calculateTop (limit, minBookPages) {
  return Author.findAll({
    include: [{
      model: Book,
      attributes: [],
      where: {
        pages: {
          [Op.gt]: minBookPages,
        },
      },
    }],
    order: sequelize.literal('count(*) DESC'),
    group: ['Author.id'],
    limit,
  })
}

async function cleanStore () {
  await Book.destroy({ truncate: true })
  await Author.destroy({ truncate: true, cascade: true })
}

async function runMigrations (sequelize) {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
    migrations: {
      path: path.join(__dirname, 'db', 'migrations'),
      params: [
        sequelize.getQueryInterface(),
        sequelize.constructor,
      ],
    },
  })

  await umzug.up()
}

async function connect () {
  await sequelize.authenticate() // check all ok
  await runMigrations(sequelize)

  return {
    createBook,
    createAuthor,
    calculateTop,
    cleanStore,
  }
}

module.exports = {
  connect,
}
