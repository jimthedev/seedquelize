'use strict'

const Promise = require('bluebird')

module.exports = function seed (seeds) {
  return Promise.each(seeds, (seed) => {
    return Promise.each(seed.data, (item) => {
      return seed.model.create(item)
    })
  })
}
