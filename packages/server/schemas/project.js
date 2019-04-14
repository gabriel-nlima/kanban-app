const sharedId = require('./id')
async function sharedProject(fastify) {
	await fastify.addSchema({
		$id: 'project',
		type: 'object',
		properties: {
			_id: { type: 'string' },
			name: { type: 'string' },
			desc: { type: 'string' },
			status: {
				type: 'string',
				enum: ['BEING_DONE', 'FINISHED', 'FILED'],
			},
			conclusionDate: { type: 'string' },
			addedIn: { type: 'string' },
			finishedIn: { type: 'string' },
			tag1: { type: 'string' },
			tag2: { type: 'string' },
		},
		required: ['name', 'status'],
	})
}

const getProjects = {
	schema: {
		querystring: {
			status: {
				type: 'string',
				enum: ['BEING_DONE', 'FINISHED', 'FILED'],
			},
		},
		tags: ['projects'],
		response: {
			200: {
				type: 'object',
				properties: {
					projects: { type: 'array', items: 'project#' },
				},
			},
		},
	},
}
const getProjectTasks = {
	schema: {
		params: 'idParam#',
		tags: ['projects'],
		response: {
			200: {
				type: 'object',
				properties: {
					projects: { type: 'array', items: 'task#' },
				},
			},
		},
	},
}
const addProject = {
	schema: {
		body: 'project#',
		tags: ['projects'],
		response: {
			200: { type: 'object', properties: { project: 'project#' } },
		},
	},
}
const updateProject = {
	schema: {
		params: 'idParam#',
		tags: ['projects'],
		body: 'project#',
		response: {
			200: { type: 'object', properties: { project: 'project#' } },
		},
	},
}

const deleteProject = {
	schema: { params: 'idParam#', tags: ['projects'] },
}

exports.sharedProject = sharedProject
exports.getProjects = getProjects
exports.getProjectTasks = getProjectTasks
exports.addProject = addProject
exports.updateProject = updateProject
exports.deleteProject = deleteProject
