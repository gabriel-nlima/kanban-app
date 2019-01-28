import { cleanup } from 'react-testing-library'
import reducers from '../reducers'
import * as actionTypes from '../../actions/actionTypes'
import * as status from '../../../containers/status'

describe('reducers de tarefas', () => {
	const initialState = {
		tarefas: [],
		error: false,
	}
	const tarefas = [
		{
			_id: 1,
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZER,
			adicionadoEm: '28/01',
			concluidoEm: undefined,
		},
		{
			_id: 2,
			titulo: 'fazer algo2',
			conteudo: 'fazer alguma coisa2',
			status: status.FAZENDO,
			adicionadoEm: '28/01',
			concluidoEm: undefined,
		},
		{
			_id: 3,
			titulo: 'fazer algo3',
			conteudo: 'fazer alguma coisa3',
			status: status.CONCLUIDO,
			adicionadoEm: '28/01',
			concluidoEm: undefined,
		},
	]
	const tarefa = {
		_id: 3,
		titulo: 'fazer algo4',
		conteudo: 'fazer alguma coisa4',
		status: status.FAZER,
		adicionadoEm: '28/01',
		concluidoEm: undefined,
	}

	test('deve lidar com action started', () => {
		const expectedState = {
			tarefas: [],
			error: false,
		}

		expect(reducers(initialState, { type: actionTypes.STARTED })).toEqual(
			expectedState
		)
	})
	test('deve lidar com action failed', () => {
		const expectedState = {
			tarefas: [],
			error: true,
		}

		expect(
			reducers(initialState, { type: actionTypes.FAILED, error: true })
		).toEqual(expectedState)
	})
	test('deve lidar com get success', () => {
		const expectedState = {
			tarefas: tarefas,
			error: false,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.GET_TAREFAS,
				tarefas: tarefas,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com add tarefa', () => {
		const expectedState = {
			tarefas: [tarefa],
			error: false,
		}

		expect(
			reducers(initialState, {
				type: actionTypes.ADD_TAREFA,
				tarefa: tarefa,
			})
		).toEqual(expectedState)
	})
	test('deve lidar com update success', () => {
		initialState.tarefas = tarefas
		const tarefaAtualizada = {
			_id: 3,
			titulo: 'fazer qualquer coisa2',
			conteudo: 'fazer alguma coisa4',
			status: status.FAZER,
			adicionadoEm: '28/01',
			concluidoEm: undefined,
		}
		expect(
			reducers(initialState, {
				type: actionTypes.UPDATE_TAREFA,
				tarefa: tarefaAtualizada,
			}).tarefas
		).toContainEqual(tarefaAtualizada)
	})
	test('deve lidar com troca_status', () => {
		initialState.tarefas = tarefas
		const tarefaAtualizada = {
			_id: 1,
			titulo: 'fazer algo1',
			conteudo: 'fazer alguma coisa1',
			status: status.FAZENDO,
			adicionadoEm: '28/01',
			concluidoEm: undefined,
		}
		expect(
			reducers(initialState, {
				type: actionTypes.UPDATE_TAREFA,
				tarefa: tarefaAtualizada,
			}).tarefas
		).toContainEqual(tarefaAtualizada)
	})
	test('deve lidar com delete success', () => {
		initialState.tarefas = [tarefa]
		const expectedState = {
			tarefas: [],
			error: false,
		}
		expect(
			reducers(initialState, {
				type: actionTypes.DELETE_TAREFA,
				tarefa: tarefa,
			})
		).toEqual(expectedState)
	})
})
