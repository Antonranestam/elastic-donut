const Hapi = require('hapi')
const Inert = require('inert')
const path = require('path')

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

server.start(() => {
  console.log('Server running at port:', server.info.port)
})
