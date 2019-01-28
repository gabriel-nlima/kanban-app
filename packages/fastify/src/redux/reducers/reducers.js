import * as actionTypes from '../actions/actionTypes'
const initialState = {
	tarefas: [],
	error: false,
}

function started(state) {
	return {
		...state,
	}
}
function failed(state, action) {
	return {
		...state,
		error: action.error,
	}
}

function getTarefas(state, action) {
	return {
		...state,
		tarefas: action.tarefas,
	}
}

function addTarefa(state, action) {
	return {
		...state,
		tarefas: [...state.tarefas, action.tarefa],
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
	}
}
function deletaTarefa(state, action) {
	return {
		...state,
		tarefas: state.tarefas.filter((el) => el._id !== action.tarefa._id),
	}
}
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.STARTED:
			return started(state)
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
