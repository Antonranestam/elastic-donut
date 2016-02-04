'use strict'

const r = require('rethinkdb')
const diacritics = require('diacritics')

let airport

class Airport {
  constructor (conn) {
    this.conn = conn
  }

  get (iata) {
    const self = this

    return r.table('airports')
      .filter(function (airport) {
        if (iata) return airport('iata').eq(iata.toUpperCase())
        return airport
      })
      .run(self.conn)
      .then((cursor) => {
        return cursor.toArray()
      })
  }

  search (term) {
    const self = this

    // Remove accents and lowercase it
    term = diacritics.remove(term.toLowerCase())

    let lastChar = term.slice(-1)
    let termBetween = term.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1)

    return r.table('airports_search')
      .between(term, termBetween, { index: 'term' })
      .limit(10)
      .eqJoin('airportId', r.table('airports'))
      .zip()
      .without(['id', 'term'])
      .distinct()
      .run(self.conn)
      .then((cursor) => {
        return cursor.toArray()
      })
  }

  static init (req, reply) {
    if (!(airport instanceof Airport)) airport = new Airport(req.dbConn)
    reply.continue()
  }
}

exports.routes = [
  {
    method: 'GET',
    path: '/api/airport/get/{iata?}',
    handler: (req, reply) => {
      airport.get(req.params.iata)
        .then((result) => reply(result))
    },
    config: {
      pre: [Airport.init]
    }
  },
  {
    method: 'GET',
    path: '/api/airport/search/{term}',
    handler: (req, reply) => {
      airport.search(req.params.term)
        .then((result) => reply(result))
    },
    config: {
      pre: [Airport.init]
    }
  }
]
