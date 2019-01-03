import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
	error: false,
}
const tarefasReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TAREFA:
			return {
				...state,
				tarefas: [action.tarefas, ...state.tarefas],
			}
		case actionTypes.GET_TAREFAS:
			return {
				...state,
				tarefas: action.tarefas,
			}
		default:
			return state
	}
}

export default tarefasReducer
