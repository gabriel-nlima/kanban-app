const { login } = require('../schemas/user')
const { hashPassword, validatePassword } = require('../utils')

const pwdRequiredError = new Error('Senha é obrigatório')

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
					const token = fastify.jwt.sign({
						email: user.email,
						name: user.name,
						_id: user._id,
					})
					req.log.info(
						{ name: user.email },
						`User ${user.email} logged in.`
					)

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
