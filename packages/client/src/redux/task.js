import { set, get, add, edit, del } from './common'
import { actionStarted, actionFailed, actionSuccess } from './currentState'
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
	},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.GET_TASKS:
			return get(state, action, 'tasks')
		case Types.ADD_TASK:
			return add(state, action, 'tasks', 'task')
		case Types.UPDATE_TASK:
			return edit(state, action, 'tasks', 'task')
		case Types.DELETE_TASK:
			return del(state, action, 'tasks', 'task')
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
			dispatch(set(Types.GET_TASKS, 'tasks', tasks))
			dispatch(actionSuccess())
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
	return Axios.post(url, task)
		.then((res) => {
			dispatch(set(Types.ADD_TASK, 'task', res.data.task))
			dispatch(actionSuccess())
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

	return Axios.put(`${url}/${task._id}`, task)
		.then((res) => {
			dispatch(set(Types.UPDATE_TASK, 'task', res.data.task))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteTask = (task) => (dispatch) => {
	dispatch(actionStarted())
	return Axios.delete(`${url}/${task._id}`, task)
		.then((res) => {
			dispatch(set(Types.DELETE_TASK, 'task', task))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
