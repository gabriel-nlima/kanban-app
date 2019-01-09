import * as actionsTypes from './actionTypes'
import * as status from '../../containers/status'

export function setTarefas() {
	return {
		type: actionsTypes.SET_TAREFAS,
	}
}

export function addTarefa(tarefa) {
	const adicionadoEm = new Date()
	tarefa = {
		...tarefa,
		id: Math.floor(Math.random() * 1000 + 1),
		status: status.FAZER,
		adicionadoEm: adicionadoEm.toLocaleString(),
	}
	return {
		type: actionsTypes.ADD_TAREFA,
		tarefa,
	}
}

export function trocaStatus(tarefa, novoStatus) {
	if (novoStatus === status.CONCLUIDO) {
		const concluidoEm = new Date()
		tarefa = {
			...tarefa,
			status: novoStatus,
			concluidoEm: concluidoEm.toLocaleString(),
		}
	} else {
		tarefa = {
			...tarefa,
			status: novoStatus,
		}
	}

	return {
		type: actionsTypes.TROCA_STATUS,
		tarefa,
	}
}
