import * as actionsTypes from './actionTypes'
import * as status from '../../containers/status'

export function setTarefas() {
	return {
		type: actionsTypes.SET_TAREFAS,
	}
}

export function addTarefa(tarefa) {
	tarefa = {
		...tarefa,
		id: Math.floor(Math.random() * 1000 + 1),
		status: status.FAZER,
	}
	return {
		type: actionsTypes.ADD_TAREFA,
		tarefa,
	}
}

export function trocaStatus(tarefa, novoStatus) {
	tarefa = {
		...tarefa,
		status: novoStatus,
	}
	return {
		type: actionsTypes.TROCA_STATUS,
		tarefa,
	}
}
