import {
	ACTION_STARTED,
	ACTION_FAILED,
	actionStarted,
	actionFailed,
	updateState,
} from './common'
import Axios from 'axios'

export const Types = {
	GET_PROJECTS: 'GET_PROJECTS',
	GET_PROJECT_TASKS: 'GET_PROJECT_TASKS',
	ADD_PROJECT: 'ADD_PROJECT',
	UPDATE_PROJECT: 'UPDATE_PROJECT',
	DELETE_PROJECT: 'DELETE_PROJECT',
}

const initialState = {
	project: {
		projects: [],
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
		case Types.GET_PROJECTS:
			return updateState.get(state, action, 'projects')
		case Types.ADD_PROJECT:
			return updateState.add(state, action, 'projects', 'project')
		case Types.UPDATE_PROJECT:
			return updateState.edit(state, action, 'projects', 'project')
		case Types.DELETE_PROJECT:
			return updateState.del(state, action, 'projects', 'project')
		default:
			return state
	}
}

//Action creators
const url = '/api/projects'

export const getProjects = () => (dispatch) => {
	dispatch(actionStarted())

	return Axios.get(url)
		.then((res) => {
			const { projects } = res.data

			dispatch({
				type: Types.GET_PROJECTS,
				projects,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const addProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.post(url, project)
		.then((res) => {
			dispatch({
				type: Types.ADD_PROJECT,
				project: res.data.project,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.put(`${url}/${project._id}`, project)
		.then((res) => {
			dispatch({
				type: Types.UPDATE_PROJECT,
				project: res.data.project,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.pelete(`${url}/${project._id}`, project)
		.then((res) => {
			dispatch({
				type: Types.DELETE_PROJECT,
				project,
				isLoading: false,
				error: false,
			})
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
