import * as actionsTypes from './actionTypes'
import * as status from '../../utils/status'
import Axios from 'axios'

export function actionStarted() {
	return { type: actionsTypes.STARTED, isLoading: true, error: false }
}
export function actionFailed(error) {
	return { type: actionsTypes.FAILED, isLoading: false, error: error.message }
}
export const getTasks = () => (dispatch) => {
	dispatch(actionStarted())

	return Axios.get('/api/tasks')
		.then((res) => {
			const { tasks } = res.data
			dispatch({
				type: actionsTypes.GET_TASKS,
				tasks,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const addTask = (task) => (dispatch) => {
	dispatch(actionStarted())
	const addedIn = new Date()
	task = {
		...task,
		status: status.FAZER,
		addedIn: addedIn.toLocaleString(),
	}
	return Axios.post('/api/tasks', task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.ADD_TASK,
				task: res.data.task,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editTask = (task) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.put('/api/tasks/' + task._id, task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.UPDATE_TASK,
				task: res.data.task,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteTask = (task) => (dispatch) => {
	dispatch(actionStarted())
	return Axios.delete('/api/tasks/' + task._id, task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch({
				type: actionsTypes.DELETE_TASK,
				task,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
