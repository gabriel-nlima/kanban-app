const getTasks = {
	schema: {
		tags: ['tasks'],
		response: {
			200: {
				type: 'object',
				properties: {
					tasks: { type: 'array', items: 'task#' },
				},
			},
		},
	},
}
const addTask = {
	schema: {
		body: 'task#',
		tags: ['tasks'],
		response: {
			200: { type: 'object', properties: { task: 'task#' } },
		},
	},
}
const updateTask = {
	schema: {
		params: 'idParam#',
		tags: ['tasks'],
		body: 'task#',
		response: {
			200: { type: 'object', properties: { task: 'task#' } },
		},
	},
}

const deleteTask = {
	schema: { params: 'idParam#', tags: ['tasks'] },
}

exports.getTasks = getTasks
exports.addTask = addTask
exports.updateTask = updateTask
exports.deleteTask = deleteTask
