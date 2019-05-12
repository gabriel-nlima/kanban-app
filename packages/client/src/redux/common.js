//Types
export const ACTION_STARTED = 'STARTED'
export const ACTION_FAILED = 'FAILED'

//Creators
export function actionStarted() {
	return { type: ACTION_STARTED, isLoading: true, error: false }
}
export function actionFailed(error) {
	return { type: ACTION_FAILED, isLoading: false, error: error }
}

export function success(type, resName, data) {
	return {
		type,
		[resName]: data,
		isLoading: false,
		error: false,
	}
}

export const updateState = {
	started,
	failed,
	get,
	add,
	edit,
	del,
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

function get(state, action, list, actionList) {
	return {
		...state,
		[list]: action[list],
		isLoading: action.isLoading,
		error: action.error,
	}
}

function add(state, action, list, toAdd) {
	return {
		...state,
		[list]: [action[toAdd], ...state[list]],
		isLoading: action.isLoading,
		error: action.error,
	}
}

function edit(state, action, list, toEdit, active) {
	return {
		...state,
		[list]: state[list].map((el) => {
			if (el._id !== action[toEdit]._id) {
				return el
			}
			return {
				...action[toEdit],
			}
		}),
		isLoading: action.isLoading,
		error: action.error,
		[active]: !active ? undefined : action[toEdit],
	}
}

function del(state, action, list, toDelete) {
	return {
		...state,
		[list]: state[list].filter((el) => el._id !== action[toDelete]._id),
		isLoading: action.isLoading,
		error: action.error,
	}
}
