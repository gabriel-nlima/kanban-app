async function sharedUser(fastify) {
	await fastify.addSchema({
		$id: 'user',
		type: 'object',
		properties: {
			_id: { type: 'string' },
			name: { type: 'string' },
			email: { type: 'string' },
			pwd: { type: 'string' },
			pwd2: { type: 'string' },
			oldPwd: { type: 'string' },
			salt: { type: 'string' },
			iteration: { type: 'number' },
		},
		required: ['email'],
	})
}

const userSchema = {
	$id: 'user',
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		email: { type: 'string' },
		pwd: { type: 'string' },
		pwd2: { type: 'string' },
		oldPwd: { type: 'string' },
		salt: { type: 'string' },
		iteration: { type: 'number' },
	},
	required: ['email'],
}

const getUsers = {
	schema: {
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: {
					users: { type: 'array', items: 'user#' },
				},
			},
		},
	},
}
const setActiveUser = {
	schema: {
		params: 'idParam#',
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: {
					activeUser: 'user#',
				},
			},
		},
	},
}
const addUser = {
	schema: {
		body: 'user#',
		tags: ['users'],
		response: {
			200: { type: 'object', properties: { user: 'user#' } },
		},
	},
}

const loginRegister = {
	schema: {
		body: 'user#',
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: { token: { type: 'string' } },
			},
		},
	},
}
const updateUser = {
	schema: {
		params: 'idParam#',
		tags: ['users'],
		body: 'user#',
		response: {
			200: { type: 'object', properties: { user: 'user#' } },
		},
	},
}

const deleteUser = {
	schema: { params: 'idParam#', tags: ['users'] },
}

exports.sharedUser = sharedUser
exports.userSchema = userSchema
exports.getUsers = getUsers
exports.setActiveUser = setActiveUser
exports.addUser = addUser
exports.loginRegister = loginRegister
exports.updateUser = updateUser
exports.deleteUser = deleteUser
