const getarefas = {
	schema: {
		tags: ['tarefas'],
		response: {
			200: {
				type: 'object',
				properties: {
					tarefas: { type: 'array', items: 'tarefa#' },
				},
			},
		},
	},
}
const addTarefa = {
	schema: {
		body: 'tarefa#',
		tags: ['tarefas'],
		response: {
			200: { type: 'object', properties: { tarefa: 'tarefa#' } },
		},
	},
}
const updateTarefa = {
	schema: {
		params: 'idParam#',
		tags: ['tarefas'],
		body: 'tarefa#',
		response: {
			200: { type: 'object', properties: { tarefa: 'tarefa#' } },
		},
	},
}

const deleteTarefa = {
	schema: { params: 'idParam#', tags: ['tarefas'] },
}

exports.getTarefas = getarefas
exports.addTarefa = addTarefa
exports.updateTarefa = updateTarefa
exports.deleteTarefa = deleteTarefa
