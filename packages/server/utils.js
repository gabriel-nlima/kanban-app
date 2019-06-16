const crypto = require('crypto')

const queryProjectsTasks = (id) => [
	{
		$match: {
			_id: id,
		},
	},
	{
		$lookup: {
			from: 'tasks',
			localField: '_id',
			foreignField: 'project_id',
			as: 'tasks',
		},
	},
]

const queryProjects = [
	{
		$lookup: {
			from: 'tasks',
			localField: '_id',
			foreignField: 'project_id',
			as: 'tasks',
		},
	},
]

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
 * @param {string} inputPwd hashed password from user input
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

exports.queryProjectsTasks = queryProjectsTasks
exports.queryProjects = queryProjects
exports.hashPassword = hashPassword
exports.validatePassword = validatePassword
