'use strict'

const r = require('rethinkdb')

let airport

class Airport {
  constructor (conn) {
    this.conn = conn
  }

  get () {
    const self = this

    return r.table('airports')
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
    path: '/api/airport/get',
    handler: (req, reply) => {
      airport.get()
        .then((result) => reply(result))
    },
    config: {
      pre: [Airport.init]
    }
  }
]
