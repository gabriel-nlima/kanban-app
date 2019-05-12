async function sharedTask(fastify) {
	await fastify.addSchema({
		$id: 'task',
		type: 'object',
		properties: {
			_id: { type: 'string' },
			title: { type: 'string' },
			desc: { type: 'string' },
			project_id: { type: 'string' },
			status: {
				type: 'string',
				enum: ['TODO', 'BEING_DONE', 'FINISHED', 'FILED'],
			},
			addedIn: { type: 'string' },
			finishedIn: { type: 'string' },
			tag1: { type: 'string' },
			tag2: { type: 'string' },
		},
		required: ['title', 'status'],
	})
}

const getTasks = {
	schema: {
		querystring: {
			status: {
				type: 'string',
				enum: ['TODO', 'BEING_DONE', 'FINISHED', 'FILED'],
			},
		},
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

exports.sharedTask = sharedTask
exports.getTasks = getTasks
exports.addTask = addTask
exports.updateTask = updateTask
exports.deleteTask = deleteTask
