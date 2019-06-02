import { set, fetch, add, edit, remove, get, post, put, del } from './common'
import { actionFailed, actionSuccess, setActiveProject } from './currentState'

export const Types = {
	GET_PROJECTS: 'GET_PROJECTS',
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
			return fetch(state, action, 'activeProject')
		case Types.SET_ACTIVE_PROJECT:
			return {
				...state,
				activeProject: action.activeProject,
				isLoading: false,
				error: false,
			}
		case Types.UNSET_ACTIVE_PROJECT:
			return {
				...state,
				activeProject: { tasks: [] },
				isLoading: false,
				error: false,
			}
		case Types.GET_PROJECTS:
			return fetch(state, action, 'projects')
		case Types.ADD_PROJECT:
			return add(state, action, 'projects', 'project')
		case Types.UPDATE_PROJECT:
			return edit(state, action, 'projects', 'project', 'activeProject')
		case Types.DELETE_PROJECT:
			return remove(state, action, 'projects', 'project')
		default:
			return state
	}
}

//Action creators
const url = '/api/projects'

export const getProjects = () => (dispatch) => {
	return get(url, dispatch)
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
	return post(url, project, dispatch)
		.then((res) => {
			dispatch(set(Types.ADD_PROJECT, 'project', res.data.project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const editProject = (project) => (dispatch) => {
	project = { ...project, tasks: undefined }
	return put(`${url}/${project._id}`, project, dispatch)
		.then((res) => {
			dispatch(set(Types.UPDATE_PROJECT, 'project', res.data.project))
			dispatch(setActiveProject(res.data.project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}

export const deleteProject = (project) => (dispatch) => {
	return del(`${url}/${project._id}`, project, dispatch)
		.then(() => {
			dispatch(set(Types.DELETE_PROJECT, 'project', project))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
