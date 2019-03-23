async function schemas(fastify) {
	await fastify.addSchema({
		$id: 'task',
		type: 'object',
		properties: {
			_id: { type: 'string' },
			title: { type: 'string' },
			desc: { type: 'string' },
			status: { type: 'string' },
			addedIn: { type: 'string' },
			fineshedIn: { type: 'string' },
			tag1: { type: 'string' },
			tag2: { type: 'string' },
		},
		required: ['title', 'status'],
	})
	await fastify.addSchema({
		$id: 'idParam',
		type: 'object',
		properties: {
			id: { type: 'string' },
		},
		required: ['id'],
	})
}

module.exports = schemas
