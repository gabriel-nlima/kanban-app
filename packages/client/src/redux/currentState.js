import { set, fetch, get } from './common'
import { getProjectTasks } from './task'

export const Types = {
	ACTION_STARTED: 'ACTION_STARTED',
	ACTION_FAILED: 'ACTION_FAILED',
	ACTION_SUCCESS: 'ACTION_SUCCESS',
	SET_ACTIVE_PROJECT: 'SET_ACTIVE_PROJECT',
	UNSET_ACTIVE_PROJECT: 'UNSET_ACTIVE_PROJECT',
	GET_ACTIVE_PROJECT: 'GET_ACTIVE_PROJECT',
}

const initialState = {
	currentState: {
		isError: false,
		error: [],
		isLoading: false,
	},
}
//Reducer functions
export function started(state, action) {
	return {
		...state,
		isLoading: action.isLoading,
		isError: action.isError,
	}
}
export function failed(state, action) {
	return {
		...state,
		error: action.error,
		isError: action.isError,
		isLoading: action.isLoading,
	}
}
export function success(state) {
	return {
		...state,
		error: [],
		isError: false,
		isLoading: false,
	}
}

//Reducer
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case Types.ACTION_STARTED:
			return started(state, action)
		case Types.ACTION_FAILED:
			return failed(state, action)
		case Types.ACTION_SUCCESS:
			return success(state)
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
		default:
			return state
	}
}

//Action Creators
const url = '/api/projects'

export function actionStarted() {
	return { type: Types.ACTION_STARTED, isLoading: true, isError: false }
}
export function actionFailed(error) {
	return {
		type: Types.ACTION_FAILED,
		isLoading: false,
		error,
		isError: false,
	}
}

export function actionSuccess() {
	return {
		type: Types.ACTION_SUCCESS,
	}
}

export const setActiveProject = (project) => (dispatch) => {
	localStorage.setItem('projectId', project._id)
	dispatch(set(Types.SET_ACTIVE_PROJECT, 'activeProject', project))
	dispatch(getProjectTasks(project._id))
}

export const unsetActiveProject = () => (dispatch) => {
	localStorage.removeItem('projectId')
	dispatch({ type: Types.UNSET_ACTIVE_PROJECT })
}

export const getActiveProject = (project) => (dispatch) => {
	const projectId = project ? project._id : localStorage.getItem('projectId')
	return get(`${url}/${projectId}`, dispatch)
		.then((res) => {
			dispatch({
				type: Types.GET_ACTIVE_PROJECT,
				activeProject: res.data.activeProject,
			})
			dispatch(getProjectTasks(projectId))
			dispatch(actionSuccess())
		})
		.catch((error) => {
			dispatch(actionFailed(error))
		})
}
