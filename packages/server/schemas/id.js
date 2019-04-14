async function sharedId(fastify) {
	await fastify.addSchema({
		$id: 'idParam',
		type: 'object',
		properties: {
			id: { type: 'string' },
		},
		required: ['id'],
	})
}

module.exports = sharedId
