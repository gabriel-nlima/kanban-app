import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tasks: [],
	error: false,
	isLoading: false,
}

function started(state, action) {
	return {
		...state,
		isLoading: action.isLoading,
		error: action.error,
	}
}
function failed(state, action) {
	return {
		...state,
		error: action.error,
		isLoading: action.isLoading,
	}
}

function getTasks(state, action) {
	return {
		...state,
		tasks: action.tasks,
		isLoading: action.isLoading,
		error: action.error,
	}
}

function addTask(state, action) {
	return {
		...state,
		tasks: [action.task, ...state.tasks],
		isLoading: action.isLoading,
		error: action.error,
	}
}

function editTask(state, action) {
	return {
		...state,
		tasks: state.tasks.map((task) => {
			if (task._id !== action.task._id) {
				return task
			}
			return {
				...action.task,
			}
		}),
		isLoading: action.isLoading,
		error: action.error,
	}
}
function deleteTask(state, action) {
	return {
		...state,
		tasks: state.tasks.filter((el) => el._id !== action.task._id),
		isLoading: action.isLoading,
		error: action.error,
	}
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.STARTED:
			return started(state, action)
		case actionTypes.FAILED:
			return failed(state, action)
		case actionTypes.GET_TASKS:
			return getTasks(state, action)
		case actionTypes.ADD_TASK:
			return addTask(state, action)
		case actionTypes.UPDATE_TASK:
			return editTask(state, action)
		case actionTypes.DELETE_TASK:
			return deleteTask(state, action)
		default:
			return state
	}
}
