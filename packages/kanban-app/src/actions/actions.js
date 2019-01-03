import * as actionsTypes from './actionTypes'

export const addTarefa = (tarefa) => ({
	type: actionsTypes.ADD_TAREFA,
	tarefa,
})
export const getTarefas = () => ({
	type: actionsTypes.GET_TAREFAS,
})
export const updateTarefa = (tarefa) => ({
	type: actionsTypes.UPDATE_TAREFA,
	tarefa,
})
export const deleteTarefa = (tarefa) => ({
	type: actionsTypes.DELETE_TAREFA,
	tarefa,
})
