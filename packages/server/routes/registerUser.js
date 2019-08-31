const { loginRegister } = require('../schemas/user')
const { duplicateEmailError, pwdRequiredError } = require('../userUtils')

async function routes(fastify) {
	const { db } = fastify.mongo
	fastify.post('/api/register', loginRegister, function register(req, reply) {
		function registerUser(err, col) {
			if (err) reply.send(err)

			let user = req.body

			if (!user.pwd || !user.pwd2)
				return reply.code(400).send(pwdRequiredError)

			if (user.pwd !== user.pwd2) {
				reply.code(400).send(confirmPwdError)
			} else if (user.pwd === user.pwd2) {
				const { salt, iteration, hash } = fastify.hashPassword(user.pwd)
				user = { ...user, salt, iteration, pwd: hash }
				delete user.pwd2

				col.insertOne(user, (error, result) => {
					if (error) {
						if (error.code && error.code === 11000) {
							return reply.code(400).send(duplicateEmailError)
						} else {
							return reply.send(error)
						}
					}

					const token = fastify.jwt.sign(
						{
							email: result.ops[0].email,
						},
						{ expiresIn: '1h' }
					)
					req.log.info(
						`New user ${result.ops[0].email} registed and logged in.`
					)

					return reply.send({
						token,
					})
				})
			}
		}
		db.collection('users', registerUser)
	})
}
module.exports = routes
