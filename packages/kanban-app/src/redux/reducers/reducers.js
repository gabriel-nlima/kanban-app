import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
	error: false,
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.STARTED:
			return {
				...state,
			}
		case actionTypes.FAILED:
			return {
				...state,
				error: action.error,
			}
		case actionTypes.SET_TAREFAS:
			return {
				...state,
				tarefas: action.tarefas,
			}
		case actionTypes.GET_TAREFAS:
			return {
				...state,
				tarefas: action.tarefas,
			}
		case actionTypes.ADD_TAREFA:
			return {
				...state,
				tarefas: [...state.tarefas, action.tarefa],
			}
		case actionTypes.TROCA_STATUS:
			return {
				...state,
				tarefas: state.tarefas.map((tarefa) => {
					if (tarefa._id !== action.tarefa._id) {
						return tarefa
					}
					return {
						...tarefa,
						status: action.tarefa.status,
						concluidoEm: action.tarefa.concluidoEm,
					}
				}),
			}
		case actionTypes.DELETE_TAREFA:
			return {
				...state,
				tarefas: state.tarefas.filter(
					(el) => el._id !== action.tarefa._id
				),
			}
		default:
			return state
	}
}
