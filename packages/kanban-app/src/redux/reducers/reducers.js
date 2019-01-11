import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_TAREFAS:
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
					if (tarefa.id !== action.tarefa.id) {
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
					(el) => el.id !== action.tarefa.id
				),
			}
		default:
			return state
	}
}
