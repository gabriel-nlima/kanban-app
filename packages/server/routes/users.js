const { addUser, getUsers, updateUser, deleteUser } = require('../schemas/user')

const {
	confirmPwdError,
	duplicateError,
	pwdRequiredError,
} = require('../userUtils')

async function routes(fastify) {
	const { ObjectId, db } = fastify.mongo
	fastify.get('/api/users', getUsers, function get(req, reply) {
		async function getUsers(err, col) {
			const users = []
			await col
				.find()
				.project({ _id: 1, name: 1, username: 1 })
				.forEach(function(user) {
					if (user) users.push(user)
					else return false
				})

			reply.send({ users })
		}
		db.collection('users', getUsers)
	})

	fastify.post('/api/users', addUser, function insert(req, reply) {
		db.collection('users', function addUser(err, col) {
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
							return reply.code(400).send(duplicateError)
						} else {
							return reply.send(error)
						}
					}

					reply.send({
						user: {
							...result.ops[0],
							pwd: undefined,
							salt: undefined,
							iteration: undefined,
						},
					})
				})
			}
		})
	})

	fastify.put('/api/users/:id', updateUser, function edit(req, reply) {
		function updateUser(err, col) {
			if (err) return reply.send(err)
			const { id } = req.params
			const { _id, ...userInputs } = req.body

			// user trying to change password
			if (userInputs.pwd) {
				if (!userInputs.pwd2)
					return reply.code(400).send(pwdRequiredError)

				if (!userInputs.oldPwd) {
					return reply
						.code(400)
						.send(new Error('Senha antiga é necessária.'))
				} else if (userInputs.pwd !== userInputs.pwd2) {
					return reply.code(400).send(confirmPwdError)
				} else {
					col.findOne({ _id: new ObjectId(id) }, function(err, user) {
						if (err) return reply.send(err)
						if (
							user &&
							fastify.validatePassword(
								userInputs.oldPwd,
								user.pwd,
								user.salt,
								user.iteration
							)
						) {
							const {
								salt,
								iteration,
								hash,
							} = fastify.hashPassword(userInputs.pwd)
							user = {
								...user,
								name: userInputs.name,
								email: userInputs.email,
								salt,
								iteration,
								pwd: hash,
							}

							col.findOneAndUpdate(
								{ _id: new ObjectId(id) },
								{ $set: user },
								{ returnOriginal: false },
								(error, result) => {
									if (error) {
										if (
											error.code &&
											error.code === 11000
										) {
											return reply
												.code(400)
												.send(duplicateError)
										} else {
											return reply.send(error)
										}
									}
									return reply.send({
										user: {
											...result.value,
											pwd: undefined,
											salt: undefined,
											iteration: undefined,
										},
									})
								}
							)
						} else return reply.code(400).send(new Error('Senha antiga não confere.'))
					})
				}
			} else {
				//Changing only name and e-mail
				col.findOneAndUpdate(
					{ _id: new ObjectId(id) },
					{ $set: userInputs },
					{ returnOriginal: false },
					(error, result) => {
						if (error) {
							if (error.code && error.code === 11000) {
								return reply.code(400).send(duplicateError)
							} else {
								return reply.send(error)
							}
						} else if (result) {
							reply.send({
								user: {
									...result.value,
									pwd: undefined,
									salt: undefined,
									iteration: undefined,
								},
							})
						}
					}
				)
			}
		}
		db.collection('users', updateUser)
	})

	fastify.delete('/api/users/:id', deleteUser, function del(req, reply) {
		function deleteUser(err, col) {
			col.findOneAndDelete({ _id: new ObjectId(req.params.id) })
			reply.send()
		}
		db.collection('users', deleteUser)
	})
}

module.exports = routes
