import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
	tarefasAFazer: [],
	tarefasSendoFeitas: [],
	tarefasConcluidas: [],
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_TAREFAS:
			return {
				...state,
				tarefas: action.tarefas,
				tarefasAFazer: action.tarefasAFazer,
				tarefasSendoFeitas: action.tarefasSendoFeitas,
				tarefasConcluidas: action.tarefasConcluidas,
			}
		case actionTypes.ADD_TAREFA:
			return {
				...state,
				tarefas: [...state.tarefas, action.tarefa],
			}
		case actionTypes.TROCA_STATUS:
			return state.tarefas.map((tarefa) => {
				if (tarefa !== action.tarefa) {
					return tarefa
				}
				return {
					...tarefa,
					...action.tarefa,
				}
			})
		default:
			return state
	}
}
