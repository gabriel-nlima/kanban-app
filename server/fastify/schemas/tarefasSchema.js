async function schemas(fastify) {
	await fastify.addSchema({
		$id: 'tarefa',
		type: 'object',
		properties: {
			_id: { type: 'string' },
			titulo: { type: 'string' },
			conteudo: { type: 'string' },
			status: { type: 'string' },
			adicionadoEm: { type: 'string' },
			concluidoEm: { type: 'string' },
			tag1: { type: 'string' },
			tag2: { type: 'string' },
		},
		required: ['titulo', 'status'],
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
