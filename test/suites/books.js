'use strict'

const { assert } = require('chai')
const { it, describe } = require('mocha')
const { request } = require('../lib/request')

describe('Books', () => {
  it('Does create book', async () => {
    const response = await request.post('/author', {
      body: {
        name: 'a',
        age: 17,
      },
    })
    const result = await request.post('/book', {
      body: {
        title: 'A book',
        pages: 232,
        authorId: response.id,
      }
    })
    assert.hasAllKeys(result, ['id'])
    assert.isNumber(result.id)
  })
  it('Does not create invalid book', async () => {
    const response = await request.post('/author', {
      body: {
        name: 'a',
        age: 17,
      },
    })
    try {
      await request.post('/book', {
        body: {
          title: 'A book',
          pages: -100,
          authorId: response.id,
        }
      })
      assert.fail('expect to throw')
    } catch (e) {
      assert.equal(e.statusCode, 400)
    }
  })
  it('Does not create book with invalid author id', async () => {
    try {
      await request.post('/book', {
        body: {
          title: 'A book',
          pages: 232,
          authorId: 123123123,
        }
      })
      assert.fail('expect to throw')
    } catch (e) {
      assert.equal(e.statusCode, 422)
      assert.equal(e.error, 'errors.books.no-author')
    }
  })
})
