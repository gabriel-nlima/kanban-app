export const Types = {
	ACTION_STARTED: 'ACTION_STARTED',
	ACTION_FAILED: 'ACTION_FAILED',
	ACTION_SUCCESS: 'ACTION_SUCCESS',
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
		default:
			return state
	}
}

//Action Creators

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
