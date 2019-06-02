import { set, fetch, add, edit, remove, get, post, put, del } from './common'
import { actionFailed, actionSuccess } from './currentState'

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
	},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.GET_TASKS:
			return fetch(state, action, 'tasks')
		case Types.ADD_TASK:
			return add(state, action, 'tasks', 'task')
		case Types.UPDATE_TASK:
			return edit(state, action, 'tasks', 'task')
		case Types.DELETE_TASK:
			return remove(state, action, 'tasks', 'task')
		default:
			return state
	}
}

//Action Creators
const url = '/api/tasks'

export const getTasks = () => (dispatch) => {
	return get(url, dispatch)
		.then((res) => {
			const { tasks } = res.data
			dispatch(set(Types.GET_TASKS, 'tasks', tasks))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const addTask = (task) => (dispatch) => {
	const addedIn = new Date()
	task = {
		...task,
		status: status.TODO,
		addedIn: addedIn.toLocaleString(),
	}
	return post(url, task, dispatch)
		.then((res) => {
			dispatch(set(Types.ADD_TASK, 'task', res.data.task))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editTask = (task) => (dispatch) => {
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

	return put(`${url}/${task._id}`, task, dispatch)
		.then((res) => {
			dispatch(set(Types.UPDATE_TASK, 'task', res.data.task))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteTask = (task) => (dispatch) => {
	return del(`${url}/${task._id}`, task, dispatch)
		.then((res) => {
			dispatch(set(Types.DELETE_TASK, 'task', task))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
