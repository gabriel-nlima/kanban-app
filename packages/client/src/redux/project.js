import { set, get, add, edit, del } from './common'
import { actionStarted, actionFailed, actionSuccess } from './currentState'
import Axios from 'axios'

export const Types = {
	GET_PROJECTS: 'GET_PROJECTS',
	SET_ACTIVE_PROJECT: 'SET_ACTIVE_PROJECT',
	GET_ACTIVE_PROJECT: 'GET_ACTIVE_PROJECT',
	ADD_PROJECT: 'ADD_PROJECT',
	UPDATE_PROJECT: 'UPDATE_PROJECT',
	DELETE_PROJECT: 'DELETE_PROJECT',
}

const initialState = {
	project: {
		projects: [],
		activeProject: { tasks: [] },
	},
}

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.GET_ACTIVE_PROJECT:
			return { ...state }
		case Types.SET_ACTIVE_PROJECT:
			return {
				...state,
				activeProject: action.activeProject,
				isLoading: false,
				error: false,
			}
		case Types.GET_PROJECTS:
			return get(state, action, 'projects')
		case Types.ADD_PROJECT:
			return add(state, action, 'projects', 'project')
		case Types.UPDATE_PROJECT:
			return edit(state, action, 'projects', 'project', 'activeProject')
		case Types.DELETE_PROJECT:
			return del(state, action, 'projects', 'project')
		default:
			return state
	}
}

//Action creators
const url = '/api/projects'

export const setActiveProject = (project) => (dispatch) => {
	dispatch(set(Types.SET_ACTIVE_PROJECT, 'activeProject', project))
}

export const getActiveProject = () => (dispatch) => {
	dispatch({ type: Types.GET_ACTIVE_PROJECT })
}

export const getProjects = () => (dispatch) => {
	dispatch(actionStarted())

	return Axios.get(url)
		.then((res) => {
			const { projects } = res.data

			dispatch(set(Types.GET_PROJECTS, 'projects', projects))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const addProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.post(url, project)
		.then((res) => {
			dispatch(set(Types.ADD_PROJECT, 'project', res.data.project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.put(`${url}/${project._id}`, project)
		.then((res) => {
			dispatch(set(Types.UPDATE_PROJECT, 'project', res.data.project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteProject = (project) => (dispatch) => {
	dispatch(actionStarted())

	return Axios.delete(`${url}/${project._id}`, project)
		.then((res) => {
			dispatch(set(Types.DELETE_PROJECT, 'project', project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
