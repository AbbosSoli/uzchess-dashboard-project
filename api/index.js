const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

// Export as a serverless function to handle the API request
module.exports = (req, res) => {
	server(req, res)
}
