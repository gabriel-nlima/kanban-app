import * as actionsTypes from './actionTypes'
import * as status from '../../containers/status'
import Axios from 'axios'

export function actionStarted() {
	return { type: actionsTypes.STARTED, isLoading: true, error: false }
}
export function actionFailed(error) {
	return { type: actionsTypes.FAILED, isLoading: false, error: error.message }
}
export const getAllTarefas = () => (dispatch) => {
	dispatch(actionStarted())

	return Axios.get('/tarefas')
		.then((res) => {
			const { tarefas } = res.data
			dispatch({
				type: actionsTypes.GET_TAREFAS,
				tarefas,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const addTarefa = (tarefa) => (dispatch) => {
	dispatch(actionStarted())
	const adicionadoEm = new Date()
	tarefa = {
		...tarefa,
		status: status.FAZER,
		adicionadoEm: adicionadoEm.toLocaleString(),
	}
	return Axios.post('/tarefas', tarefa, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.ADD_TAREFA,
				tarefa: res.data.tarefa,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const trocaStatus = (tarefa, novoStatus) => (dispatch) => {
	dispatch(actionStarted())
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
	return Axios.put('/tarefas/' + tarefa._id, tarefa, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.TROCA_STATUS,
				tarefa: res.data.tarefa,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editarTarefa = (tarefa) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.put('/tarefas/' + tarefa._id, tarefa, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.UPDATE_TAREFA,
				tarefa: res.data.tarefa,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deletaTarefa = (tarefa) => (dispatch) => {
	dispatch(actionStarted())
	return Axios.delete('/tarefas/' + tarefa._id, tarefa, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.DELETE_TAREFA,
				tarefa,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
