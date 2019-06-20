const { login } = require('../schemas/user')
const { hashPassword, validatePassword } = require('../utils')

const pwdRequiredError = new Error('Senha é obrigatório')

async function routes(fastify) {
	fastify.post('/api/login', login, function insert(req, reply) {
		function addUser(err, col) {
			if (err) reply.send(err)

			if (!req.body.pwd) return reply.code(400).send(pwdRequiredError)

			col.findOne({ email: req.body.email }, (error, user) => {
				if (error) return reply.send(error)

				if (
					user &&
					validatePassword(
						req.body.pwd,
						user.pwd,
						user.salt,
						user.iteration
					)
				) {
					return reply.send({
						user: {
							...user,
							pwd: undefined,
							salt: undefined,
							iteration: undefined,
						},
					})
				} else
					return reply
						.code(400)
						.send(new Error('E-mail ou senha inválido.'))
			})
		}
		const { db } = this.mongo
		db.collection('users', addUser)
	})
}

module.exports = routes
