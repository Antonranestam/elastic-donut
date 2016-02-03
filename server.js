'use strict'

require('dotenv').config()

const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')
const r = require('rethinkdb')

const airport = require('./api/Airport')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, './public')
      }
    }
  }
})

server.connection({ port: 3000 })

server.register(Inert, () => {})

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: '.',
      index: true,
      redirectToSlash: true
    }
  }
})

const APIRoutes = [].concat(airport.routes)
server.route(APIRoutes)

function startServer (conn) {
  server.decorate('request', 'dbConn', conn)

  server.start(() => {
    console.log('Server running at port:', server.info.port)
  })
}

// Connect to db
r.connect({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  db: process.env.DB_NAME,
  authKey: process.env.DB_AUTH
}).then((conn) => startServer(conn))
