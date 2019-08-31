const { login } = require('../schemas/user')
const { pwdRequiredError } = require('../userUtils')

async function routes(fastify) {
	fastify.post('/api/login', login, function doLogin(req, reply) {
		const { db } = fastify.mongo
		function loginUser(err, col) {
			if (err) reply.send(err)

			if (!req.body.pwd) return reply.code(400).send(pwdRequiredError)

			col.findOne({ email: req.body.email }, (error, user) => {
				if (error) return reply.send(error)

				if (
					user &&
					fastify.validatePassword(
						req.body.pwd,
						user.pwd,
						user.salt,
						user.iteration
					)
				) {
					const token = fastify.jwt.sign(
						{
							email: user.email,
						},
						{ expiresIn: '1h' }
					)
					req.log.info(`User ${user.email} logged in.`)

					return reply.send({
						token,
					})
				} else
					return reply
						.code(400)
						.send(new Error('E-mail ou senha inválido.'))
			})
		}
		db.collection('users', loginUser)
	})
}

module.exports = routes
