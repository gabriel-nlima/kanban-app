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
		message: '',
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
		message: action.message,
		isError: action.isError,
		isLoading: action.isLoading,
	}
}
export function success(state) {
	return {
		...state,
		message: undefined,
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
	return {
		type: Types.ACTION_STARTED,
		isLoading: true,
		isError: false,
		message: undefined,
	}
}
export function actionFailed(error) {
	const { status } = error.response
	let message = undefined
	if (typeof error.response.data === 'object') {
		if (status === 401) {
			message = 'Sessão expirada, clique aqui para fazer login novamente.'
			localStorage.removeItem('kanbanauthtoken')
		} else {
			message = error.response.data.message
		}
	} else if (status === 500) {
		message = 'Problema com o servidor, aguarde ou recarregue a página.'
	}
	return {
		type: Types.ACTION_FAILED,
		isLoading: false,
		message,
		isError: true,
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
