const crypto = require('crypto')

const pwdRequiredError = new Error('Senha é obrigatório')
const confirmPwdError = new Error('Senhas diferentes')
const duplicateEmailError = new Error('E-mail já cadastrado.')

function addUser(err, col, fastify, req, reply) {
	if (err) reply.send(err)

	let user = req.body

	if (!user.pwd || !user.pwd2) return reply.code(400).send(pwdRequiredError)

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
}

const verifyToken = async (request, reply) => {
	try {
		await request.jwtVerify()
		request.log.info(
			{ name: request.user.email },
			`Token verified. User e-mail: ${request.user.email} was validated.`
		)
	} catch (err) {
		request.log.warn(
			`Attempt to request route ${request.req.method}${request.req.url} failed.`
		)
		reply.send(err)
	}
}

/**
 * generate hashed password, salt and iteration from user's input
 * @param {string} inputPwd
 * @returns {object} salt , iteration, hashed password to store
 */
const hashPassword = (inputPwd) => {
	const salt = crypto.randomBytes(64).toString('hex')
	const iteration = Math.floor(Math.random() * (15000 - 10000 + 1)) + 10000
	const hash = crypto
		.pbkdf2Sync(inputPwd, salt, iteration, 64, 'sha512')
		.toString('hex')

	return { salt, iteration, hash }
}

/**
 * Checks if a hashed input's password is equal to hashed password from db
 * @param {string} inputPwd password from user input
 * @param {string} storedPwd hashed user password stored on db
 * @param {string} salt user's salt stored on db
 * @param {number} iteration user's iteration stored on db
 */
const validatePassword = (inputPwd, storedPwd, salt, iteration) => {
	const hash = crypto
		.pbkdf2Sync(inputPwd, salt, iteration, 64, 'sha512')
		.toString('hex')
	return storedPwd === hash
}

exports.hashPassword = hashPassword
exports.validatePassword = validatePassword
exports.addUser = addUser
exports.verifyToken = verifyToken
exports.pwdRequiredError = pwdRequiredError
exports.confirmPwdError = confirmPwdError
exports.duplicateEmailError = duplicateEmailError
