const { addUser } = require('../schemas/user')

async function routes(fastify) {
	const { db } = fastify.mongo
	fastify.post('/api/register', addUser, function register(req, reply) {
		db.collection('users', (err, col) =>
			fastify.addUser(err, col, fastify, req, reply)
		)
	})
}
module.exports = routes
