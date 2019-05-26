//Reducers functions

export function set(type, resName, data) {
	return {
		type,
		[resName]: data,
		isLoading: false,
		isError: false,
		error: [],
	}
}

export function get(state, action, list, actionList) {
	return {
		...state,
		[list]: action[list],
		isLoading: action.isLoading,
		isError: action.isError,
	}
}

export function add(state, action, list, toAdd) {
	return {
		...state,
		[list]: [action[toAdd], ...state[list]],
		isLoading: action.isLoading,
		isError: action.isError,
	}
}

export function edit(state, action, list, toEdit, active) {
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
		isError: action.isError,
		[active]: !active ? undefined : action[toEdit],
	}
}

export function del(state, action, list, toDelete) {
	return {
		...state,
		[list]: state[list].filter((el) => el._id !== action[toDelete]._id),
		isLoading: action.isLoading,
		isError: action.isError,
	}
}
