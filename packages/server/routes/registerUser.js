const { register } = require('../schemas/user')
const { duplicateError, pwdRequiredError } = require('../userUtils')

async function routes(fastify) {
	const { db } = fastify.mongo
	fastify.post('/api/register', register, function register(req, reply) {
		function registerUser(err, col) {
			if (err) {
				reply.send(err)
			}

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
							return reply.code(400).send(duplicateError)
						} else {
							return reply.send(error)
						}
					}

					const token = fastify.jwt.sign(
						{
							authId: result.ops[0].username,
						},
						{ expiresIn: '1h' }
					)
					delete result.ops[0].email
					delete result.ops[0].pwd
					delete result.ops[0].salt
					delete result.ops[0].iteration
					delete result.ops[0]._id
					console.log(result.ops[0])
					req.log.info(
						`New user ${result.ops[0].username} registed and logged in.`
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
