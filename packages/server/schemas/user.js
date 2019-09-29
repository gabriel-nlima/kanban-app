const userSchema = {
	$id: 'user',
	type: 'object',
	properties: {
		_id: { type: 'string' },
		name: { type: 'string' },
		email: { type: 'string' },
		username: { type: 'string' },
		pwd: { type: 'string' },
		pwd2: { type: 'string' },
		oldPwd: { type: 'string' },
		salt: { type: 'string' },
		iteration: { type: 'number' },
	},
	required: ['username'],
}
const loginUserSchema = {
	$id: 'userLogin',
	type: 'object',
	properties: {
		authId: { type: 'string' },
		pwd: { type: 'string' },
	},
	required: ['authId', 'pwd'],
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
const login = {
	schema: {
		body: 'userLogin#',
		tags: ['users'],
		response: {
			200: {
				type: 'object',
				properties: { token: { type: 'string' } },
			},
		},
	},
}
const register = {
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

exports.userSchema = userSchema
exports.loginUserSchema = loginUserSchema
exports.getUsers = getUsers
exports.setActiveUser = setActiveUser
exports.addUser = addUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.login = login
exports.register = register
