'use strict'

const { assert } = require('chai')
const { it, describe } = require('mocha')
const { request } = require('../lib/request')

describe('Authors', () => {
  it('Does create author', async () => {
    const response = await request.post('/author', {
      body: {
        name: 'a',
        age: 17,
      },
    })
    assert.hasAllKeys(response, ['id'])
    assert.isNumber(response.id)
  })
  it('Does not create author if invalid params', async () => {
    try {
      await request.post('/author', {
        body: {
          age: 'a',
          f: '123',
        },
      })
      assert.fail('expect to throw')
    } catch (e) {
      assert.equal(e.statusCode, 400)
    }
  })
})
