import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
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

function getTarefas(state, action) {
	return {
		...state,
		tarefas: action.tarefas,
		isLoading: action.isLoading,
		error: action.error,
	}
}

function addTarefa(state, action) {
	return {
		...state,
		tarefas: [action.tarefa, ...state.tarefas],
		isLoading: action.isLoading,
		error: action.error,
	}
}

function editarTarefa(state, action) {
	return {
		...state,
		tarefas: state.tarefas.map((tarefa) => {
			if (tarefa._id !== action.tarefa._id) {
				return tarefa
			}
			return {
				...action.tarefa,
			}
		}),
		isLoading: action.isLoading,
		error: action.error,
	}
}
function deletaTarefa(state, action) {
	return {
		...state,
		tarefas: state.tarefas.filter((el) => el._id !== action.tarefa._id),
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
		case actionTypes.GET_TAREFAS:
			return getTarefas(state, action)
		case actionTypes.ADD_TAREFA:
			return addTarefa(state, action)
		case actionTypes.TROCA_STATUS:
			return editarTarefa(state, action)
		case actionTypes.UPDATE_TAREFA:
			return editarTarefa(state, action)
		case actionTypes.DELETE_TAREFA:
			return deletaTarefa(state, action)
		default:
			return state
	}
}
