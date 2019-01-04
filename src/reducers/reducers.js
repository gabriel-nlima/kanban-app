import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_TAREFAS:
			return Object.assign({}, state, {
				tarefas: action.tarefas,
			})
		default:
			return state
	}
}
