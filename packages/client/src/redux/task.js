import {
	ACTION_STARTED,
	ACTION_FAILED,
	actionStarted,
	actionFailed,
	success,
	updateState,
} from './common'
import Axios from 'axios'

import * as status from '../utils/status'

export const Types = {
	GET_TASKS: 'GET_TASKS',
	ADD_TASK: 'ADD_TASK',
	UPDATE_TASK: 'UPDATE_TASK',
	DELETE_TASK: 'DELETE_TASK',
}

const initialState = {
	task: {
		tasks: [],
		error: false,
		isLoading: false,
	},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_STARTED:
			return updateState.started(state, action)
		case ACTION_FAILED:
			return updateState.failed(state, action)
		case Types.GET_TASKS:
			return updateState.get(state, action, 'tasks')
		case Types.ADD_TASK:
			return updateState.add(state, action, 'tasks', 'task')
		case Types.UPDATE_TASK:
			return updateState.edit(state, action, 'tasks', 'task')
		case Types.DELETE_TASK:
			return updateState.del(state, action, 'tasks', 'task')
		default:
			return state
	}
}

//Action Creators
const url = '/api/tasks'

export const getTasks = () => (dispatch) => {
	dispatch(actionStarted())

	return Axios.get(url)
		.then((res) => {
			const { tasks } = res.data
			dispatch(success(Types.GET_TASKS, 'tasks', tasks))
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
		status: status.TODO,
		addedIn: addedIn.toLocaleString(),
	}
	return Axios.post(url, task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch(success(Types.ADD_TASK, 'task', res.data.task))
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editTask = (task) => (dispatch) => {
	dispatch(actionStarted())
	if (task.status === status.FINISHED) {
		const finishedIn = new Date()
		task = {
			...task,
			finishedIn: finishedIn.toLocaleString(),
		}
	} else if (task.status === status.FILED) {
		task = { ...task }
	} else {
		task = {
			...task,
			finishedIn: '',
		}
	}

	return Axios.put(`${url}/${task._id}`, task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch(success(Types.UPDATE_TASK, 'task', res.data.task))
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteTask = (task) => (dispatch) => {
	dispatch(actionStarted())
	return Axios.delete(`${url}/${task._id}`, task, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			dispatch(success(Types.DELETE_TASK, 'task', task))
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
